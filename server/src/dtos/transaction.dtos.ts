import {
  Recurrence,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from "class-validator";

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: TransactionType;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  recurrence: Recurrence;

  @IsString()
  category?: TransactionCategory;

  @IsNumber()
  @IsNotEmpty()
  recurrence_interval: number;
}

export class GetTransactionDto {
  @IsString()
  type?: TransactionType;

  @IsString()
  name?: string;

  @IsString()
  recurrence?: Recurrence;

  @IsString()
  category?: TransactionCategory;

  @IsDate()
  created_at?: Date;

  @IsNumber()
  value?: number;

  @IsNumber()
  offset: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  minValue: number;

  @IsNumber()
  maxValue: number;
}

export class UpdateTransactionDto {
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsString()
  @Length(1, 255)
  name?: string;

  description: string;

  @IsString()
  type?: TransactionType;

  @IsNumber()
  value?: number;

  @IsString()
  category?: TransactionCategory;

  @IsString()
  recurrence?: Recurrence;

  @IsNumber()
  recurrence_interval?: number;
}
