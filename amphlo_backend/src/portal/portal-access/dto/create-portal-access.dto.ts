import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class listDto {

    @IsNumber()
    processCount: number;

    @IsString()
    processTitle: string;

    @IsString()
    processDescription: string;
}

export class CreatePortalAccessDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => listDto)
    process: listDto[];

}
