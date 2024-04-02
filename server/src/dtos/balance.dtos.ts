import { IsDateString } from "class-validator";

export class GetMonthlyBalanceDto {
  @IsDateString()
  fromDate: Date;

  @IsDateString()
  toDate: Date;
}
