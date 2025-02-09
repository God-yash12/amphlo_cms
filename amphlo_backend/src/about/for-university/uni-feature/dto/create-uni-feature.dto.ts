import { IsNotEmpty, IsString } from "class-validator";

export class CreateUniFeatureDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
