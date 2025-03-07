import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class HeroButtonDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    route: string;
}

export class CreateHeroDto {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsOptional()
    buttons?: HeroButtonDto[] = [];

    @IsNumber()
    @IsOptional()
    imageId?: number | null;
}
