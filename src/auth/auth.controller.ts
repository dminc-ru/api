import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { TokensDto } from "./dto/tokens.dto";
import { UserAuthDto } from "./dto/user-auth.dto";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Вход в аккаунт DMINC ID" })
  @ApiResponse({ status: 200, type: TokensDto })
  @Post("/login")
  async login(
    @Body() userDto: UserAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userData = await this.authService.login(userDto);
    response.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    response.status(200);
    return {
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    };
  }

  @ApiOperation({ summary: "Выход из аккаунта DMINC ID" })
  @ApiResponse({ status: 200 })
  @Get("/logout")
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies;
    response.clearCookie("refreshToken");
    return this.authService.logout(refreshToken);
  }

  @ApiOperation({ summary: "Регистрация аккаунта DMINC ID" })
  @ApiResponse({ status: 200, type: TokensDto })
  @Post("/register")
  async register(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userData = await this.authService.register(userDto);
    response.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    };
  }

  @ApiOperation({ summary: "Обновление Access Token" })
  @ApiResponse({ status: 200, type: TokensDto })
  @Get("/refresh")
  async refresh(@Req() request: Request) {
    const { refreshToken } = request.cookies;
    const userData = await this.authService.refresh(refreshToken);
    return {
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    };
  }

  @ApiOperation({ summary: "Активация DMINC ID" })
  @ApiResponse({ status: 200 })
  @Get("/activate/:link")
  async activate(
    @Param("link") link: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.activate(link);
    response.redirect("http://localhost:3000");
    return;
  }
}
