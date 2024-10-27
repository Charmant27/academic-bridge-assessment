import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AttendanceModule } from './attendance.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AttendanceModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  const configService = app.get(ConfigService)
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('MICROSERVICES_PORT'),
    }
  })
  await app.startAllMicroservices();
  const port = configService.get('PORT')
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`)
}
bootstrap();
