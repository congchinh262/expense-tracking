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
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto, UpdateTransactionDto } from "src/dtos";
import { AuthGuard } from "src/guards/auth.guard";

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
        throw new HttpException(err.message, 500);
      });
  }

  @Post("/update")
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
}
