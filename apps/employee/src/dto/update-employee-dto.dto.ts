import { IsEmail, IsString, IsOptional } from "class-validator";

export class UpdateEmployeeDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    employeeIdentifier: string;

    @IsString()
    @IsOptional()
    phoneNumber: string;
}