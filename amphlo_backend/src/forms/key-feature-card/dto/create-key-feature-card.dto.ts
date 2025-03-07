import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateKeyFeatureCardDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsOptional()
    image: number;
    
}
