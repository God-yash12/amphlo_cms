import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateWhyamphloCardDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsOptional()
    image: number;
}
