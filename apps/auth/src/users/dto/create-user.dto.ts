import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsNumber, IsDate } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    position: string;

    @IsString()
    @IsNotEmpty()
    isActive: boolean;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    dateJoined: string
}