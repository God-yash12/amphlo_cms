import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class CardDto {
    @IsNumber()
    @IsNotEmpty()
    count: number;

    @IsString()
    @IsNotEmpty()
    cardTitle: string;

    @IsString()
    @IsNotEmpty()
    cardDescription: string;
}

export class CreateJourneyDto {
    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CardDto)
    cardDetail?: {
        count?: number;
        cardTitle?: string;
        cardDescription?: string;
    }[];
}
