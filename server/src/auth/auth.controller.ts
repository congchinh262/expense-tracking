import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "./auth.service";
import { LoginDto, CreateUserDto } from "src/dtos";
import { ValidationPipe } from "src/pipe/validation";
import { Response } from "express";
import { STAGE } from "src/constants";

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post("/register")
  async register(@Body(new ValidationPipe()) data: CreateUserDto) {
    return this.service.createUser(data).catch((err) => {
      throw err;
    });
  }

  @Post("/login")
  async login(
    @Body(new ValidationPipe()) data: LoginDto,
    @Res() res: Response
  ) {
    try {
      const { access_token } = await this.service.login(data);
      res.cookie("access_token", access_token, {
        httpOnly: true,
        path: "/",
        secure: STAGE === "production" ? true : false,
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
      });
      res.status(HttpStatus.OK).send({ access_token });
    } catch (error) {
      throw error;
    }
  }
}
