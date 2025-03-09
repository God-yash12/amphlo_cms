import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";

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
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
    title?: string;

    @IsString()
    @IsOptional()
    @MinLength(10, { message: 'Description must be at least 10 characters long' })
    @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
    description?: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => HeroButtonDto)
    buttons: HeroButtonDto[] = [];

    @IsNumber()
    @IsOptional()
    imageId?: number | null;
}
