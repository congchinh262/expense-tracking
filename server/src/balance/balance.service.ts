import { HttpException, Injectable, Logger } from "@nestjs/common";
import { TransactionType } from "@prisma/client";
import * as moment from "moment";
import { GetMonthlyBalanceDto } from "src/dtos/balance.dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { IUserInfo } from "src/types";

@Injectable()
export class BalanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getMonthlyBalance(filter: GetMonthlyBalanceDto, userInfo: IUserInfo) {
    const { fromDate, toDate } = filter;
    try {
      const transactions = await this.prisma.transaction.findMany({
        where: {
          user_id: userInfo.userId,
          created_at: {
            gte: moment(fromDate).startOf("month").toDate(),
            lte: moment(toDate).endOf("month").toDate(),
          },
        },
        select: {
          value: true,
          type: true,
          created_at: true,
        },
      });
      const balanceDict: { [month: string]: number } = {};
      transactions.forEach((t) => {
        const month = moment(t.created_at).format("YYYY-MM");
        if (t.type === TransactionType.OUTCOME) {
          t.value = t.value * -1;
        }
        balanceDict[month] = balanceDict[month]
          ? balanceDict[month] + t.value
          : t.value;
      });
      const balances = Object.entries(balanceDict).map(([month, balance]) => ({
        date: month,
        balance,
      }));
      return {
        success: true,
        data: {
          balances,
        },
      };
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  async getBalance(userInfo: IUserInfo) {
    return this.prisma.user
      .findFirst({
        where: {
          id: userInfo.userId,
        },
        select: {
          id: true,
          balance: true,
        },
      })
      .then((user) => {
        if (!user) {
          throw new HttpException("User not found", 404);
        }
        return user;
      })
      .catch((err) => {
        throw err;
      });
  }
}
