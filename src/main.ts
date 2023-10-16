import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ErrorFilter } from 'src/shared/filters/error.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(1);
  const app = await NestFactory.create(AppModule);
  console.log(2);
  app.useGlobalPipes(new ValidationPipe());
  console.log(3);
  app.useGlobalFilters(new ErrorFilter());
  console.log(4);
  const port = process.env.port || 4200;
  console.log(5);
  await app.listen(port);
  console.log(6);
}
bootstrap();
