import { HttpException, Injectable } from "@nestjs/common";
import { TransactionType } from "@prisma/client";
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
    return this.prisma.transaction
      .findMany({
        where: {
          user: {
            id: userInfo.id,
          },
          ...filter,
        },
      })
      .then((transactions) => {
        return {
          success: true,
          data: transactions,
        };
      })
      .catch((err) => {
        throw err;
      });
  }

  async createTransaction(data: CreateTransactionDto, userInfo: IUserInfo) {
    if (data.type === TransactionType.OUTCOME && data.value > 0) {
      data.value = data.value * -1;
    }
    return this.prisma.transaction
      .create({
        data: {
          ...data,
          user: {
            connect: {
              id: userInfo.id,
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
              id: userInfo.id,
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
