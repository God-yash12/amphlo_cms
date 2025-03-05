import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class FeatureDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
}

export class CreatePartnerFeatureDto {

    @IsString()
    featureTitle: string;

    @IsString()
    featureDescription: string;

    @IsNumber()
    @IsOptional()
    image: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FeatureDto)
    feature: FeatureDto[]
}
