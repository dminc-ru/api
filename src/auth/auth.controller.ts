import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/login")
  async login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userData = await this.authService.login(userDto);
    response.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    };
  }

  @Post("/logout")
  logout(
    @Body() userDto: CreateUserDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies;
    response.clearCookie("refreshToken");
    return this.authService.logout(userDto, refreshToken);
  }
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

  @Get("/refresh")
  refresh() {
    // TODO: Ensure that refresh tokens are implemented
    return undefined;
  }

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
