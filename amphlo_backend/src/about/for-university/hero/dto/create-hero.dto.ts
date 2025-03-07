import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHeroDto {
    @IsString()
    title?: string;

    @IsString()
    subTitle?: string;
     
    @IsNumber()
    @IsOptional()
    image: number | null;              
}
