import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class listDto {
    @IsString()
    list: string
}

export class CreatePortalFeatureDto {
    @ApiProperty({
        description: "Title of the Portal Feature section",
        example: "Welcome to AMPHLO"
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: "Main title of the portal Feature section",
        example: "Amphlo is b2b"
    })
    @IsString()
    mainTitle: string;

    @ApiProperty({
        description: "description of the page",
    })
    @IsString()
    description: string

    @ApiProperty({
        description: "List Title"
    })
    @IsString()
    listTitle: string

    @ApiProperty({
        description: "Lists of the About AMPHLO"
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => listDto)
    listItem: listDto[];

    @ApiProperty({
        description: "Image of the page"
    })
    @IsNumber()
    @IsOptional()
    imageId: number | null;

}
