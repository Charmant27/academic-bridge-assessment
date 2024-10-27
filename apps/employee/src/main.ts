import { NestFactory } from '@nestjs/core';
import { EmployeeModule } from './employee.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(EmployeeModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  const configService = app.get(ConfigService)

  await app.listen(configService.get('PORT'));
}
bootstrap();
