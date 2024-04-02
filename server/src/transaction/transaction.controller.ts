import {
  Body,
  Controller,
  HttpException,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Delete,
  Query,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import {
  CreateTransactionDto,
  GetMonthlyBalanceDto,
  UpdateTransactionDto,
} from "src/dtos";
import { AuthGuard } from "src/guards/auth.guard";
import { userInfo } from "os";

@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get("/")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  getTransactions(@Req() req: any) {
    return this.transactionService
      .getTransactions(req.query, req.user)
      .catch((err) => {
        throw new HttpException(err.message, 500);
      });
  }

  @Post("/create")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  createTransaction(
    @Body() createTransactionData: CreateTransactionDto,
    @Req() req: any
  ) {
    return this.transactionService
      .createTransaction(createTransactionData, req.user)
      .catch((err) => {
        throw new HttpException(err, 500);
      });
  }

  @Post("/update")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateTransaction(
    @Body() updateTransactionData: UpdateTransactionDto,
    @Req() req: any
  ) {
    return this.transactionService
      .updateTransaction(updateTransactionData, req.user)
      .catch((err) => {
        throw new HttpException(err.message, 500);
      });
  }

  @Delete("/delete/:id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  deleteTransaction(@Req() req: any) {
    return this.transactionService
      .removeTransaction(req.params.id, req.user)
      .catch((err) => {
        throw new HttpException(err.message, 500);
      });
  }
}
