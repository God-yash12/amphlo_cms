import { IsArray, IsString } from "class-validator";

export class CreateJourneyDto {
    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsArray()
    cardDetail?: {
        count?: number;
        cardTitle?: string;
        cardDescription?: string;
    }[];
}
