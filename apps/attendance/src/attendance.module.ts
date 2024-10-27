import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import * as Joi from 'joi'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AttendanceRepository } from './attendance.repository';
import { DatabaseModule } from '@app/common';
import { AttendanceDocument, AttendanceSchema } from './models/attendance.schema';
import { EmployeeModule } from 'apps/employee/src/employee.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATIONS_SERVICE } from '@app/common/constants';

@Module({
  imports: [
    EmployeeModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {name: AttendanceDocument.name, schema: AttendanceSchema}
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/attendance/.env',
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        NOTIFICATIONS_HOST: Joi.string().required(),
        NOTIFICATIONS_PORT: Joi.number().required(),
        PORT: Joi.number().required(),
      })
    }),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('NOTIFICATIONS_HOST'),
            port: configService.get('NOTIFICATIONS_PORT')
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRepository],
})
export class AttendanceModule {}
