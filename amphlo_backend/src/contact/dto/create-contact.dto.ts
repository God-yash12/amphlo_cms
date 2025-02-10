import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsOptional()
    agency: string;

    @IsString() 
    @IsOptional()
    message: string;

}
