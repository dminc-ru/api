import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post } from "@nestjs/common";
import { PayService } from "./pay.service";
import { BalanceDto } from "./dto/balance.dto";
import { Bill } from "./models/bill.model";
import { ChargeDto } from "./dto/charge.dto";
import { ReplenishDto } from "./dto/replenish.dto";

@ApiTags("Платежи")
@Controller("pay")
export class PayController {
  constructor(private payService: PayService) {}

  @ApiOperation({ summary: "Получить платёжный профиль" })
  @ApiResponse({ status: 200, type: BalanceDto })
  @Get("/profile")
  async profile() {}

  @ApiOperation({ summary: "Пополнить баланс" })
  @ApiResponse({ status: 200, type: ReplenishDto })
  @Post("/replenish")
  async replenish() {}

  @ApiOperation({ summary: "Изменить баланс" })
  @ApiResponse({ status: 200, type: ChargeDto })
  @Post("/charge")
  async charge() {}

  @ApiOperation({ summary: "Получить информацию о счёте" })
  @ApiResponse({ status: 200, type: Bill })
  @Get("/bills")
  async getBill() {}

  @ApiOperation({ summary: "Создать счёт" })
  @ApiResponse({ status: 201, type: Bill })
  @Post("/bills")
  async createBill() {}

  @ApiOperation({ summary: "Редактировать счёт" })
  @ApiResponse({ status: 200, type: Bill })
  async patchBill() {}
}
