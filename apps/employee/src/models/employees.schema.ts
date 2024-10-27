import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({versionKey: false})
export class EmployeeDocument extends AbstractDocument {
    @Prop({unique: true})
    email: string;

    @Prop()
    name: string;

    @Prop()
    employeeIdentifier: string;

    @Prop()
    phoneNumber: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(EmployeeDocument)

