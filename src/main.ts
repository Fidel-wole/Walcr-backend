/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line prettier/prettier
const port = process.env.PORT 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port || 3000);
}
bootstrap();
