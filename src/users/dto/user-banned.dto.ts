import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType } from "sequelize-typescript";
import { Role } from "../../roles/roles.model";
import { UserRoles } from "../../roles/user-roles.model";

export class UserBannedDto {
  @ApiProperty({
    example: "4",
    description: "Уникальный идентификатор DMINC ID",
  })
  id: number;

  @ApiProperty({
    example: "kentithun1",
    description: "Уникальное имя DMINC ID",
  })
  username: string;

  @ApiProperty({
    example: "kentithun1@dminc.ru",
    description: "Адрес электронного ящика DMINC ID",
  })
  email: string;

  @ApiProperty({ example: "qwerty12345", description: "Пароль DMINC ID" })
  password: string;

  @ApiProperty({
    example: "false",
    description: "Наличие активации DMINC ID",
  })
  isActivated: boolean;

  @ApiProperty({
    example:
      "https://id.dminc.ru/api/auth/activate/abcdef-fedcba-abcfed-cbadef",
    description: "Ссылка для активации DMINC ID",
  })
  activationLink: string;

  @ApiProperty({
    example: "true",
    description: "Наличие блокировки DMINC ID",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({
    example: "Нарушение пользовательского соглашения",
    description: "Причина блокировки DMINC ID (при её наличии)",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
