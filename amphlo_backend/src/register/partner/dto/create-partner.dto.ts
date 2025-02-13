import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePartnerDto {
    @IsString()
    @IsNotEmpty()
    personName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    whatsAppNumber: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString() 
    @IsOptional()
    city: string;

}
