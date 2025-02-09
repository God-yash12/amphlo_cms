import { IsString, IsNumber } from "class-validator";

export class CreatePartnerBenefitDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    image: number;
}
