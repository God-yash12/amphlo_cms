import { IsNotEmpty, IsString, IsOptional, IsNumber, ValidateNested } from "class-validator";
import { ButtonDto } from "src/countries/australia/dto/create-australia.dto";


export class CreateUkDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @ValidateNested({ each: true })
    buttons?: ButtonDto[];

    @IsNumber()
    image?: number;

}