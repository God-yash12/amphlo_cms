import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class ProcessDto {

    @IsNumber()
    processNumber: number;

    @IsString()
    processTitle: string;

    @IsString()
    processDescription: string;
}

export class CreateAgentDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProcessDto)
    process: ProcessDto[];
}
