import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ErrorFilter } from 'src/shared/filters/error.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(8080);
}
bootstrap();
