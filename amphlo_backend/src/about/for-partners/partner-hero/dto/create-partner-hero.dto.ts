import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class HeroButtonDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    route: string;
}

export class CreatePartnerHeroDto {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(()=> HeroButtonDto)
    buttons?: HeroButtonDto[];

    @IsNumber()
    @IsOptional()
    image: number | null;

}
