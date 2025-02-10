import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

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
    listItem: { list: string }[];

    @ApiProperty({
        description: "Image of the page"
    })
    @IsNumber()
    image: number

}
