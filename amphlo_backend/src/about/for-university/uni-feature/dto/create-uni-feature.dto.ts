import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUniFeatureDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsOptional()
    image: number | null;
}
