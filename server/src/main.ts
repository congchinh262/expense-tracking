import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { Initialize } from "./initialize";
import { otelSDK } from "./tracing";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8080;
  app.use(cookieParser());
  // new Initialize();
  await otelSDK.start();
  await app.listen(port, () => {
    console.log("Server is running on port ", port);
  });
}
bootstrap();
