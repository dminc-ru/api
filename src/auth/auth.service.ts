import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import * as uuid from "uuid";
import { MailService } from "../mail/mail.service";
import { TokenService } from "../token/token.service";
import { UserDto } from "../users/dto/user.dto";
import { UserAuthDto } from "./dto/user-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private mailService: MailService,
  ) {}
  async login(@Body() userDto: UserAuthDto) {
    const user = await this.validateUser(userDto);
    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    return await this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    const userData = await this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }
    const user = await this.userService.getUserById(userData.id);
    const newUserDto = new UserDto(user);
    const accessToken = await this.tokenService.refreshAccessToken({
      ...newUserDto,
    });
    return {
      accessToken,
      refreshToken,
      user: newUserDto,
    };
  }

  async activate(activationLink) {
    const user = await this.userService.getUserByActivation(activationLink);
    if (!user) {
      throw new Error("Некорректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
    return undefined;
  }

  async register(@Body() userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email существует",
        HttpStatus.BAD_REQUEST,
      );
    }
    const activationCode = uuid.v4();
    const activationLink = `http://localhost:5000/activate/${activationCode}`;
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    user.activationLink = activationCode;
    await user.save();
    await this.mailService.sendActivationMail(user.email, activationLink);

    const newUserDto = new UserDto(user);
    const tokens = await this.tokenService.generateTokens({ ...newUserDto });
    await this.tokenService.saveToken(newUserDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: newUserDto,
    };
  }

  private async validateUser(userDto: UserAuthDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: "Некорректный email или пароль",
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: "Некорректный email или пароль",
    });
  }
}
