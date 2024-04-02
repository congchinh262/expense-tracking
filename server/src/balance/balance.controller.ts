import {
  Controller,
  Get,
  HttpException,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { BalanceService } from "./balance.service";
import { GetMonthlyBalanceDto } from "src/dtos";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("balance")
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get("/monthly-balances")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  getMonthlyBalance(@Query() filter: GetMonthlyBalanceDto, @Req() req: any) {
    return this.balanceService
      .getMonthlyBalance(filter, req.user)
      .catch((err) => {
        throw new HttpException(err.message, 500);
      });
  }

  @Get("/")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  getBalance(@Req() req: any) {
    return this.balanceService.getBalance(req.user).catch((err) => {
      throw new HttpException(err.message, err.status || 500);
    });
  }
}
