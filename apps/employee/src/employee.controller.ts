import { Controller, Get, Post, Body} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee-dto.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/add-employee')
  async createEmployee(@Body() employeeDto: EmployeeDto) {
    return this.employeeService.createEmployee(employeeDto)
  }
}
