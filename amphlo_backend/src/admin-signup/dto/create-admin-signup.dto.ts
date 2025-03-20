import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateAdminSignupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4, {message: "Password Must be minimum 4 character Long"})
    @MaxLength(15, {message: "Password must be maximum 10 character Long"})
    password: string;
}
