import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

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
    description: string;

    @IsNumber()
    image: number;

    @IsArray()
    @ValidateNested({each: true})
    lists: listDto[];

}
