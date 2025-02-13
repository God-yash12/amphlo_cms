import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreatePortalHeroDto {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    subTitle?: string;

    @IsNumber()
    imageId: number;
}
