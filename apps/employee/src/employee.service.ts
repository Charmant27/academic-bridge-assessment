import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmployeeDto } from './dto/employee-dto.dto';
import { EmployeesRepository } from './employees.repository';

@Injectable()
export class EmployeeService {
  constructor (private readonly employeesRepository: EmployeesRepository) {}

  async createEmployee(employeeDto: EmployeeDto) {
    try {
      const employee = await this.employeesRepository.create({
        ...employeeDto,
        date_created: undefined
      })
      return employee
    } catch (error) {
      if(error.code===11000) {
        throw new ConflictException(`employee with ${employeeDto.email} already exists`)
    }
    throw new InternalServerErrorException('Something went wrong')
    }
  }
}
