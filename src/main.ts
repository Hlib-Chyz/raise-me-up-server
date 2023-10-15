import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from 'src/shared/filters/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    '/static',
    express.static(join(__dirname, '..', 'react-app', 'build')),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(4200);
}
bootstrap();
