import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Bill } from "./models/bill.model";

@Table({ tableName: "user_bills", createdAt: false, updatedAt: false })
export class UserBills extends Model<UserBills> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Bill)
  @ApiProperty({ example: "1", description: "Уникальный идентификатор счёта" })
  @Column({ type: DataType.INTEGER })
  billId: number;

  @ForeignKey(() => User)
  @ApiProperty({
    example: "4",
    description: "Уникальный идентификатор пользователя",
  })
  @Column({ type: DataType.INTEGER })
  userId: number;
}
