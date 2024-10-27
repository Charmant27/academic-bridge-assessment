import { Body, Controller, Get, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/check-in')
  async checkIn(@Body('employeeId') employeeId: string){
    return this.attendanceService.checkIn(employeeId)
  }

}
