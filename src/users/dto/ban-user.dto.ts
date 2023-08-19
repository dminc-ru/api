import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({
    example: "4",
    description: "Уникальный идентификатор DMINC ID",
  })
  readonly userId: number;
  @ApiProperty({
    example: "Нарушение пользовательского соглашения",
    description: "Причина блокировки DMINC ID",
  })
  readonly banReason: string;
}
