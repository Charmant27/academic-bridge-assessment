import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({versionKey: false, timestamps: true})

export class AttendanceDocument extends AbstractDocument {
    @Prop({required: true})
    employeeId: string;

    @Prop({default: Date.now()})
    checkInTime: Date;

    @Prop()
    checkOutTime: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(AttendanceDocument)
