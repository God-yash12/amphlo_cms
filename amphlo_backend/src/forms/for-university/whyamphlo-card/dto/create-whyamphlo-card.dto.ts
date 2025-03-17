import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateWhyamphloCardDto {
    @IsString({ message: "Title must be a string" })
    @IsNotEmpty({ message: "Title is required" })
    title: string;

    @IsString({ message: "Description must be a string" })
    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @IsNumber({}, { message: "Image ID must be a number" })
    @IsNotEmpty({ message: "Image ID is required" })
    image: number;
}
