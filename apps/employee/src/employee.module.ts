import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { DatabaseModule } from '@app/common';
import { EmployeeDocument, EmployeeSchema } from './models/employees.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EmployeesRepository } from './employees.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {name: EmployeeDocument.name, schema: EmployeeSchema}
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/employee/.env',
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      })
    })
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeesRepository],
})
export class EmployeeModule {}
