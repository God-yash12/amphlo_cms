import { IsNumber, IsString } from "class-validator";

export class CreateWhyAmphloDto {
    @IsString()
    title: string;

    @IsString()
    mainTitle: string;

    @IsString()
    description: string;

    @IsNumber()
    image: number;
}
