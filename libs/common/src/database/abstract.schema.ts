import { Schema, Prop } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class AbstractDocument {
    @Prop({type: SchemaTypes.ObjectId})
    _id: Types.ObjectId

    @Prop({type: Date, default: Date.now})
    date_created: Date
}
