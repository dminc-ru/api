import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: "admin", description: "Идентификатор роли" })
  @IsString({ message: "Должно быть строкой" })
  readonly value: string;
  @ApiProperty({
    example: "4",
    description: "Уникальный идентификатор DMINC ID",
  })
  @IsNumber({}, { message: "Должно быть числом" })
  readonly userId: number;
}
