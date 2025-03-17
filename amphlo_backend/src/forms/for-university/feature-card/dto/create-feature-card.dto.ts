import { IsString, IsNumber, IsOptional, IsNotEmpty } from "class-validator";

export class CreateFeatureCardDto {
    @IsString({ message: "Title must be a string" })
    @IsNotEmpty({ message: "Title is required" })
    title: string;

    @IsString({ message: "Description must be a string" })
    @IsNotEmpty({ message: "Description is required" })
    description: string;
}
