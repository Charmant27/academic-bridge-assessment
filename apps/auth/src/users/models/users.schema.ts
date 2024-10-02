import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";

@Schema({versionKey: false})
export class UserDocument extends AbstractDocument {
    @Prop()
    email: string;

    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop()
    phone: string;

    @Prop()
    age: number;

    @Prop()
    dateJoined: string
}

export const UserSchema = SchemaFactory.createForClass(UserDocument)
