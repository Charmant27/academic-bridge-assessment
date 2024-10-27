import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class EmployeeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    employeeIdentifier: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
}