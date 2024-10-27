import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EmployeeDto } from './dto/employee-dto.dto';
import { UpdateEmployeeDto } from './dto/update-employee-dto.dto';
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

  async getEmployees() {
    try {
      const employees = await this.employeesRepository.find({})

      if (!employees) {
        throw new NotFoundException('No employees found')
      }
      return employees
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async updateEmployee(_id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesRepository.findOneAndUpdate(
      {_id},
      {$set: updateEmployeeDto}
    )
  }

  async deleteEmployee(_id: string) {
    return this.employeesRepository.delete({_id})
  }

}
