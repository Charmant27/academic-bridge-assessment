import { Model } from "mongoose";
import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { EmployeeDocument } from "./models/employees.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class EmployeesRepository extends AbstractRepository<EmployeeDocument> {
    protected readonly logger = new Logger(EmployeesRepository.name)

    constructor(
        @InjectModel(EmployeeDocument.name)
        employeeModel: Model<EmployeeDocument>
    ) {
        super(employeeModel)
    }
}