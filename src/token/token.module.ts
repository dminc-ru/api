import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TokenService } from "./token.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Token } from "./token.model";

@Module({
  providers: [TokenService],
  imports: [
    SequelizeModule.forFeature([Token]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "Secret",
      signOptions: { expiresIn: "24h" },
    }),
    JwtModule.register({
      secretOrPrivateKey: process.env.REFRESH_PRIVATE_KEY || "Refresh_Secret",
      signOptions: { expiresIn: "30d" },
    }),
  ],
  exports: [TokenService],
})
export class TokenModule {}
