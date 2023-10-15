import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ErrorFilter } from 'src/shared/filters/error.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter());
  const port = process.env.port || 4200;
  await app.listen(port);
}
bootstrap();
