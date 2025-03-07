import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class AboutMoreData {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  year: Date;

  @IsNumber()
  @IsOptional()
  image: number | null;
}

export class CreateAboutMoreDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AboutMoreData)
  aboutMore: AboutMoreData[];
}
