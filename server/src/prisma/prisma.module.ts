import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AppService } from "src/app.service";

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRoot() {
    return {
      module: PrismaModule,
      providers: [PrismaService],
      exports: [PrismaService],
    };
  }
}
