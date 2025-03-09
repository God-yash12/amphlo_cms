import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class OverviewData{
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsOptional()
    image: number | null;
}

export class CreateOverviewDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => OverviewData)
    overview: OverviewData[];
}
