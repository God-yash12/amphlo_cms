import { IsString } from "class-validator";

export class CreateUniWhyamphloDto {
    @IsString()
    title?: string;

    @IsString()
    description?: string;
}
