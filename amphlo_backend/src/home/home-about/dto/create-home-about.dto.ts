import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateHomeAboutDto {
    @ApiProperty({
        description: "Title of the Home-about page",
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
    listItem: string

    @ApiProperty({
        description: "Image of the page"
    })
    @IsNumber()
    image: number

}
