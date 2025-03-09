import { IsArray, IsString, ValidateNested } from "class-validator";

export class CreateJourneyDto {
    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    cardDetail?: {
        count?: number;
        cardTitle?: string;
        cardDescription?: string;
    }[];
}
