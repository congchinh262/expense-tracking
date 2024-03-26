import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { CreateUserDto, LoginDto } from "src/dtos";
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "src/constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async createUser(
    data: CreateUserDto
  ): Promise<{ id; name; email; created_at }> {
    const hashedPwd = await this.hashPassword(data.password);
    return this.prisma.user
      .create({
        data: { ...data, password: hashedPwd },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
        },
      })
      .catch((err) => {
        throw new HttpException(err, 500);
      });
  }

  async login(data: LoginDto): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        name: data.username,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    if (!user) throw new HttpException("User not found", 404);
    const isPwdMatch = await this.comparePassword(data.password, user.password);
    if (!isPwdMatch) throw new UnauthorizedException();
    const payload = { userId: user.id, username: user.name, email: user.email };
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: JWT_SECRET,
      });
      return {
        access_token: accessToken,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hashSync(password, 10);
    return hash;
  }

  private async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    const match = await bcrypt.compareSync(password, hash);
    return match;
  }
}
