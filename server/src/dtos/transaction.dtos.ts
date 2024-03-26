import { Recurrence, TransactionType } from "@prisma/client";
import {
  IsDate,
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

  @IsNumber()
  @IsNotEmpty()
  interval: number;
}

export class GetTransactionDto {
  @IsString()
  type?: TransactionType;

  @IsString()
  name?: string;

  @IsString()
  recurrence?: Recurrence;

  @IsDate()
  created_at?: Date;

  @IsNumber()
  value?: number;
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
  recurrence?: Recurrence;

  @IsNumber()
  interval?: number;
}
