import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ButtonDto } from "src/home/home-transform/dto/create-home-transform.dto";

export class CreateHeroDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsOptional()
    image: number;

    @IsArray()
    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => ButtonDto)
    buttons: ButtonDto[]

}
