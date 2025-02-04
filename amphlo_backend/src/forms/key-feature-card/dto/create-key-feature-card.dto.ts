import { IsNumber, IsString } from "class-validator";

export class CreateKeyFeatureCardDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    image: number;
    
}
