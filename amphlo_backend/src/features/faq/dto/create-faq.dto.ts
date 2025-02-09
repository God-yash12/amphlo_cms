import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateFaqDto {

    @IsString()
    @Length(10, 200, { message: "Title should be 10-200 characters" })
    @Transform(({ value }) => value?.trim())
    question: string;

    @IsString()
    @Length(10, 200, { message: "Title should be 10-200 characters" })
    @Transform(({ value }) => value?.trim())
    answer: string;
}
