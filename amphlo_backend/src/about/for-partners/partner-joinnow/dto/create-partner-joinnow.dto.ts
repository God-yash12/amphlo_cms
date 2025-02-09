import { IsNotEmpty, IsString, IsOptional, IsArray } from "class-validator";

export class ButtonDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    route: string;
}


export class CreatePartnerJoinnowDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsOptional()
    buttons?: ButtonDto[];
}
