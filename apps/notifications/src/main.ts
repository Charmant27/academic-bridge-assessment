import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule)
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'));
}
bootstrap();
