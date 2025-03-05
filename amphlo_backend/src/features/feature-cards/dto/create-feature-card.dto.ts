import { IsNumber, IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateFeatureCardDto {
  @IsString()
  @IsNotEmpty({ message: 'Title must not be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description must not be empty' })
  description: string;

  @IsNumber()
  @IsOptional()
  image: number;
}
