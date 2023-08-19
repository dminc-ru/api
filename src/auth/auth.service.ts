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

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private mailService: MailService,
  ) {}
  async login(@Body() userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.tokenService.generateTokens(user);
  }

  async logout(@Body() userDto: CreateUserDto, refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh() {
    // TODO: Implement refresh tokens
    return undefined;
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
      activationLink: activationCode,
    });
    await this.mailService.sendActivationMail(user.email, activationLink);

    const newUserDto = new UserDto(user);
    const tokens = await this.tokenService.generateTokens({ ...newUserDto });
    await this.tokenService.saveToken(newUserDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: newUserDto,
    };
  }

  private async validateUser(userDto: CreateUserDto) {
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
