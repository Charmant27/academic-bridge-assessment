import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { EmployeesRepository } from 'apps/employee/src/employees.repository';
import { NOTIFICATIONS_SERVICE } from '@app/common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly employeeRepository: EmployeesRepository,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy
  ) {}

  async checkIn(employeeId: string) {
    try {
      if (!isValidObjectId(employeeId)) {
        throw new NotFoundException(`Invalid employee ID: ${employeeId}`);
      }
      const employee = await this.employeeRepository.findOne({_id: employeeId})

    if(!employee) {
      throw new NotFoundException(`Employee ${employeeId} does not exist`)
    }

    await this.notificationsService.emit('notify_email', {
      to: employee.email,
      subject: 'Attendance Record',
      text: `${employee.name} this to let you know that your attendance was recorded`,
      html: `<p>Hello <strong>${employee.name}</strong>,</p>
             <p>this to let you know that your attendance was recorded</p>`
    })

    return await this.attendanceRepository.createCheckIn(employeeId) 
    } catch (error) {
      throw new InternalServerErrorException(`Something went wrong: ${error.message}`)
    }
  }
}
