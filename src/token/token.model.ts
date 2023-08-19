import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TokenCreationAtrs {
  user: number;
  refreshToken: string;
}
@Table({ tableName: "tokens" })
export class Token extends Model<Token, TokenCreationAtrs> {
  @Column(DataType.INTEGER)
  user: number;
  @Column(DataType.TEXT)
  refreshToken: string;
}
