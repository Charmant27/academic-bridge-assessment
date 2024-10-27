import { Model } from "mongoose";
import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { AttendanceDocument } from "./models/attendance.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AttendanceRepository extends AbstractRepository<AttendanceDocument> {
    protected readonly logger = new Logger(AttendanceRepository.name);

    constructor(
        @InjectModel(AttendanceDocument.name)
        private readonly attendanceModel: Model<AttendanceDocument>
    ) {
        super(attendanceModel);
    }

    async createCheckIn(employeeId: string) {
        const attendance = new this.attendanceModel({
            employeeId,
            checkInTime: new Date(),
          })
          return await attendance.save()
    }

    async updateCheckOut(employeeId: string) {
        const attendance = await this.attendanceModel.findOne({employeeId, checkOutTime: {$exists: false}}).sort({checkInTime: -1})

        if(!attendance) {
            throw new Error('Already checked in')
        }

        attendance.checkOutTime = new Date()
        await attendance.save()
        return attendance
    }

    async getAttendanceReport (date: Date) {
        const startOfDay = new Date(date.setHours(0, 0, 0, 0))
        const endOfDay = new Date(date.setHours(23, 59, 59, 999))

        return this.attendanceModel.find({
            checkInTime: {$gte: startOfDay, $lte: endOfDay}
        })
    }

    async getEmployeeRecords(employeeId: string) {
        return this.attendanceModel.find({ employeeId });
      }
}
