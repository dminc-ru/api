import { ApiProperty } from "@nestjs/swagger";

export class UserAuthDto {
  @ApiProperty({
    example: "kentithun1@dminc.ru",
    description: "Электронный ящик DMINC ID",
  })
  readonly email: string;

  @ApiProperty({
    example: "qwerty12345",
    description: "Пароль DMINC ID",
  })
  readonly password: string;
}
