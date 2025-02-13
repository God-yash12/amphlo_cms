import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile, IsFiles, MemoryStoredFile } from 'nestjs-form-data';

export class CreateFileUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsFiles()
  @HasMimeType(['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'], { each: true })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one file is required' })
  files: FileSystemStoredFile[]
}
