import { IsString, IsNumber } from "class-validator";

export class CreateFeatureCardDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    image: number;
}
