import { IsNumber, IsString } from "class-validator";

export class CreateHeroDto {
    @IsString()
    title?: string;

    @IsString()
    subTitle?: string;
     
    @IsNumber()
    image: number;              
}
