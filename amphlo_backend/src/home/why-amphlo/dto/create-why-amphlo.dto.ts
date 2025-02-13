import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class listDto{
    @IsString()
    listTitle: string;

    @IsString()
    listDescription: string;
}

export class CreateWhyAmphloDto {
    @IsString()
    title: string;

    @IsString()
    mainTitle: string;

    @IsString()
    @IsOptional()

    description: string;

    @IsNumber()
    imageId: number;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => listDto)
    lists: listDto[];

}
