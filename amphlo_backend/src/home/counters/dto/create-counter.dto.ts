import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCounterDto {
  @ApiProperty({
    description: "Title of the counter section",
    example: "Global Reach"
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "Description of the counter section",
    example: "This section highlights our global presence."
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Number of countries",
    example: 50
  })
  @IsNumber()
  countryCount: number;

  @ApiProperty({
    description: "Subtitle for country count",
    example: "Countries we operate in"
  })
  @IsString()
  countryCountSubTitle: string;

  @ApiProperty({
    description: "Number of sub-agents",
    example: 200
  })
  @IsNumber()
  agentCount: number;

  @ApiProperty({
    description: "Subtitle for agent count",
    example: "Our dedicated agents"
  })
  @IsString()
  agentCountSubTitle: string;

  @ApiProperty({
    description: "Number of students enrolled",
    example: 10000
  })
  @IsNumber()
  studentsCount: number;

  @ApiProperty({
    description: "Subtitle for students enrolled",
    example: "Students enrolled worldwide"
  })
  @IsString()
  studentsCountSubTitle: string;

  @ApiProperty({
    description: "Average partner rating",
    example: 4.5
  })
  @IsNumber()
  partnerRatingCount: number;

  @ApiProperty({
    description: "Subtitle for partner rating",
    example: "Our partners' satisfaction"
  })
  @IsString()
  partnerRatingSubTitle: string;
}
