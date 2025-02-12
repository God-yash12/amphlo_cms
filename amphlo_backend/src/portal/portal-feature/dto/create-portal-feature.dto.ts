import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

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
    imageId: number

}
