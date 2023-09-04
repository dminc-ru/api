import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/users.model";
import { UserBills } from "../user-bills.model";

interface BillCreationAttrs {
  uid: number;
  title: string;
  receiverId: number;
  senderId: number;
  totalAmount: number;
}

@Table({ tableName: "bills" })
export class Bill extends Model<Bill, BillCreationAttrs> {
  @ApiProperty({
    example: "1",
    description: "Уникальный идентификатор платежа",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  uid: number;

  @ApiProperty({
    example: "Оплата подписки Premium",
    description: "Назначение платежа",
  })
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @ApiProperty({
    example: "123",
    description: "Уникальный идентификатор получателя платежа",
  })
  @Column({
    type: DataType.INTEGER,
  })
  receiverId: number;

  @ApiProperty({
    example: "456",
    description: "Уникальный идентификатор отправителя платежа",
  })
  @Column({
    type: DataType.INTEGER,
  })
  senderId: number;

  @ApiProperty({
    example: "999",
    description: "Сумма платежа",
  })
  @Column({
    type: DataType.INTEGER,
  })
  totalAmount: number;

  @BelongsToMany(() => User, () => UserBills)
  users: User[];
}
