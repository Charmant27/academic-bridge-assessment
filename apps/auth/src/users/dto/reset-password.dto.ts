import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    token: string;

    @IsStrongPassword()
    @IsNotEmpty()
    newPassword: string
}
