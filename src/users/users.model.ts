import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор DMINC ID",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "kentithun1",
    description: "Уникальное имя DMINC ID",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: "kentithun1@dminc.ru",
    description: "Адрес электронного ящика DMINC ID",
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "qwerty12345", description: "Пароль DMINC ID" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: "false",
    description: "Наличие активации DMINC ID",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActivated: boolean;

  @ApiProperty({
    example:
      "https://id.dminc.ru/api/auth/activate/abcdef-fedcba-abcfed-cbadef",
    description: "Ссылка для активации DMINC ID",
  })
  @Column({ type: DataType.STRING })
  activationLink: string;

  @ApiProperty({
    example: "false",
    description: "Наличие блокировки DMINC ID",
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({
    example: "",
    description: "Причина блокировки DMINC ID (при её наличии)",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
