import { Controller, Get, Body, Patch} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';

@ApiTags('hero')
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Patch()
  @ApiOperation({ summary: 'Create a new hero' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Hero data',
    type: CreateHeroDto,
  })
  @ApiResponse({ status: 201, description: 'The hero has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() dto: CreateHeroDto) {
    console.log(dto, "hero dto")
    return this.heroService.set(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all heroes' })
  @ApiResponse({ status: 200, description: 'Return all heroes.' })
  findAll() {
    return this.heroService.get();
  }
}
