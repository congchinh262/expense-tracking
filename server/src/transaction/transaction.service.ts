import { HttpException, Injectable, Logger } from "@nestjs/common";
import { TransactionType } from "@prisma/client";
import { max } from "class-validator";
import { min } from "rxjs";
import {
  CreateTransactionDto,
  GetTransactionDto,
  UpdateTransactionDto,
} from "src/dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { IUserInfo } from "src/types";

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransactions(filter: GetTransactionDto, userInfo: IUserInfo) {
    const { offset = 0, limit = 10, maxValue, minValue } = filter;
    delete filter.offset;
    delete filter.limit;
    delete filter.maxValue;
    delete filter.minValue;
    return this.prisma.transaction
      .findMany({
        where: {
          user: {
            id: userInfo.userId,
          },
          ...filter,
          value: {
            gte: minValue ? Number(minValue) : undefined,
            lte: maxValue ? Number(maxValue) : undefined,
          },
        },
        skip: +offset,
        take: +limit,
      })
      .then((transactions) => {
        return {
          success: true,
          data: {
            total: transactions.length,
            transactions: transactions.map((t) => {
              if (t.type === TransactionType.OUTCOME) {
                t.value = t.value * -1;
              }
              return t;
            }),
          },
        };
      })
      .catch((err) => {
        Logger.log(err);
        throw "Could not get transactions.";
      });
  }

  async createTransaction(data: CreateTransactionDto, userInfo: IUserInfo) {
    console.log(userInfo);
    return this.prisma.transaction
      .create({
        data: {
          ...data,
          user_id: userInfo.userId,
        },
      })
      .then((transaction) => {
        return {
          success: true,
          data: {
            ...transaction,
            value:
              transaction.type === TransactionType.OUTCOME
                ? transaction.value * -1
                : transaction.value,
          },
        };
      })
      .catch((err) => {
        Logger.log(err);
        throw "Could not create transaction.";
      });
  }

  async updateTransaction(data: UpdateTransactionDto, userInfo: IUserInfo) {
    if (data.type === TransactionType.OUTCOME && data.value > 0) {
      data.value = data.value * -1;
    }
    return this.prisma.transaction
      .update({
        where: {
          id: data.transactionId,
        },
        data: {
          ...data,
          user: {
            connect: {
              id: userInfo.userId,
            },
          },
        },
      })
      .then((transaction) => {
        return {
          success: true,
          data: transaction,
        };
      })
      .catch((err) => {
        throw err;
      });
  }

  async removeTransaction(transactionId: string, userInfo: IUserInfo) {
    return this.prisma.transaction
      .delete({
        where: {
          id: transactionId,
        },
      })
      .then((deletedTransaction) => {
        return {
          success: true,
        };
      })
      .catch((err) => {
        throw err;
      });
  }
}
