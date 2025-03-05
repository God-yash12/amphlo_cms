import { IsNotEmpty, IsString, IsOptional, IsArray, IsNumber, ValidateNested } from "class-validator";

export class ButtonDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    route: string;
}

export class CreateAustraliaDto {
    @IsString()
    countryName: string;
    
    @IsString()
    title: string;


    @IsString()
    description: string;
    
    @IsOptional()
    @ValidateNested({each: true})
    buttons?: ButtonDto[];


    @IsNumber()
    @IsOptional()
    image?: number;

}
