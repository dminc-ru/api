import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "kentithun1", description: "Имя" })
  @IsString({ message: "Должно быть строкой" })
  @Length(3, 32, { message: "Не меньше 3 и не больше 32 символов" })
  readonly username: string;

  @ApiProperty({ example: "user@example.com", description: "Почта" })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;

  @ApiProperty({ example: "123456789", description: "Пароль" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 16, { message: "Не меньше 4 и не больше 16" })
  readonly password: string;

  @ApiProperty({
    example:
      "https://example.com/auth/activate/324jjsd-sdfsdf-cbcvb-zzxxz-zxgfhdfh",
  })
  @IsString({ message: "Должно быть строкой" })
  readonly activationLink: string;
}
