import { IsString, IsOptional } from 'class-validator';

export class CreateFileUploadDto {
  @IsString()
  @IsOptional()
  filename?: string;

  @IsString()
  @IsOptional()
  mimeType?: string;

  @IsString()
  path: string;
}
