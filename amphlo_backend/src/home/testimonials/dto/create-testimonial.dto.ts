import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateTestimonialDto {
    @IsNotEmpty()
    @IsString()
    personName: string;

    @IsNotEmpty()
    @IsString()
    workPlace: string;

    @IsNotEmpty()
    @IsString()
    feedback: string;

    @IsNumber()
    @IsOptional()
    imageId: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    ratings: number

    @IsOptional()
    @IsString()
    createdAt?: Date;
}
