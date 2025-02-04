import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Patch()
  create(@Body() createCounterDto: CreateCounterDto) {
    return this.countersService.set(createCounterDto);
  }

  @Get()
  findAll() {
    return this.countersService.get();
  }
}
