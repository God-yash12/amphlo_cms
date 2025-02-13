import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateUniversityDto {
    @IsString()
    @IsNotEmpty()
    universityName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    contactPersonName: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsNotEmpty()
    country: string;

}
