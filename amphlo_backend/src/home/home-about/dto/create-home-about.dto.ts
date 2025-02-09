import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateHomeAboutDto {
    @ApiProperty({
        description: "Title of the Home-about page",
        example: "Welcome to AMPHLO"
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: "Main title of the Home about section",
        example: "Empowering Global Education Management"
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
    listItem: { list: string }[];

    @ApiProperty({
        description: "Image of the page"
    })
    @IsNumber()
    image: number

}
