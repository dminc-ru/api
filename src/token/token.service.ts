import { JwtService } from "@nestjs/jwt";
import { Token } from "./token.model";
import { InjectModel } from "@nestjs/sequelize";
import { UserDto } from "../users/dto/user.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private jwtService: JwtService,
    private jwtServiceRefresh: JwtService,
  ) {}

  async generateTokens(user: UserDto) {
    const payloadAccess = { email: user.email, id: user.id, roles: user.roles };
    const accessToken = this.jwtService.sign(payloadAccess, {
      secret: process.env.PRIVATE_KEY,
    });
    const payloadRefresh = { email: user.email, id: user.id };
    const refreshToken = this.jwtServiceRefresh.sign(payloadRefresh, {
      secret: process.env.REFRESH_PRIVATE_KEY,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(user: UserDto) {
    const payloadAccess = { email: user.email, id: user.id, roles: user.roles };
    return this.jwtService.sign(payloadAccess, {
      secret: process.env.PRIVATE_KEY,
    });
  }

  async validateAccessToken(token) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.PRIVATE_KEY,
      });
    } catch (e) {
      return null;
    }
  }
  async validateRefreshToken(token) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.REFRESH_PRIVATE_KEY,
      });
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await this.tokenRepository.findOne({
      where: { user: userId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await this.tokenRepository.create({
      user: userId,
      refreshToken,
    });
  }

  async removeToken(refreshToken) {
    await this.tokenRepository.destroy({
      where: { refreshToken },
    });
  }

  async findToken(refreshToken) {
    return await this.tokenRepository.findOne({
      where: { refreshToken },
    });
  }
}
