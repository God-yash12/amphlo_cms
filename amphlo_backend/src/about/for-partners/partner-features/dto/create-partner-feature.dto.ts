import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreatePartnerFeatureDto {

    @IsString()
    featureTitle: string;

    @IsString()
    featureDescription: string;

    @IsNumber()
    image: number;

    @IsArray()
    @ValidateNested({ each: true })
    feature: [{ title: string, description: string }]
}
