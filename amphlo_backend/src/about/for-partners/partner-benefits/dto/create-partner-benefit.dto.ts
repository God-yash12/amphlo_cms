import { IsString, IsNumber, IsOptional } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";
export class CreatePartnerBenefitDto {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsOptional()
    image: number | null;
}
