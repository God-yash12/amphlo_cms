import { IsArray, IsInt, ArrayMinSize, Min } from "class-validator";

export class CreateGalleryDto {
    @IsArray()
    @IsInt({ each: true })
    @ArrayMinSize(1)
    @Min(1, { each: true })
    galleryIds: number[];
}
