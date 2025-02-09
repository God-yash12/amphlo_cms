import { IsString, IsNumber } from "class-validator";

export class CreateWhyamphloCardDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    image: number;
}
