import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee-dto.dto';
import { UpdateEmployeeDto } from './dto/update-employee-dto.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/add-employee')
  async createEmployee(@Body() employeeDto: EmployeeDto) {
    return this.employeeService.createEmployee(employeeDto)
  }

  @Get()
  async getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Patch('/update-employee/:id')
  async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.updateEmployee(id, updateEmployeeDto)
  }

  @Delete('/delete-employee/:id')
  async deleteEmployee(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id)
  }
}
