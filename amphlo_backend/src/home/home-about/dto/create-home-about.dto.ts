import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, Length, ValidateNested } from "class-validator";

class ListItemDto {
    @IsString()
    list: string;
}

export class CreateHomeAboutDto {
    @ApiProperty({
        description: "Title of the Home-about page",
        example: "Welcome to AMPHLO"
    })
    @IsString()
    @Length(3, 100)
    @IsOptional()
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
    @Type(() => ListItemDto)
    listItem: ListItemDto[];

    @ApiProperty({
        description: "Image of the page"
    })
    @IsOptional()
    @IsNumber()
    image: number | null;

}
