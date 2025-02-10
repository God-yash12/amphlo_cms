import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class listDto {

    @IsNumber()
    processCount: number;

    @IsString()
    processTitle: string;

    @IsString()
    listDescription: string;
}

export class CreatePortalAccessDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    @ValidateNested({ each: true })
    process: listDto[];

}
