import { IsString } from "class-validator";

export class CreateCoreFeatureDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    mainTitle: string;
}
