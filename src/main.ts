import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter)); //filtrar o erro que não foi tratado no service, usando prisma 
  app.useGlobalPipes(new ValidationPipe()); //validação pelo class-validator
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
