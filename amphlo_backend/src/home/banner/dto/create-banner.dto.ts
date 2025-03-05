import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class ButtonDto {
    @ApiProperty({ 
        description: 'The name of the button', 
        example: 'Learn More'
    })
    @IsString()
    name: string;

    @ApiProperty({ 
        description: 'The route the button points to', 
        example: '/learn-more'
    })
    @IsString()
    route: string;
}

export class CreateBannerDto {
    @ApiProperty({ 
        description: 'The title of the banner', 
        example: 'Welcome to Our Website'
    })
    @IsString()
    title: string;

    @ApiProperty({ 
        description: 'A brief description of the banner', 
        example: 'This is a brief description of the banner.'
    })
    @IsString()
    description: string;

    @ApiProperty({ 
        description: 'The ID of the image associated with the banner', 
        example: 123
    })
    @IsOptional()
    @IsNumber()
    imageId: number;

    @ApiProperty({ 
        type: [ButtonDto], 
        description: 'An array of buttons associated with the banner', 
        example: [{ name: 'Learn More', route: '/learn-more' }]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ButtonDto)
    buttons: ButtonDto[];
}

