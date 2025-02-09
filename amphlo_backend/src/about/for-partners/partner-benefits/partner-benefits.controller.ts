import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerBenefitsService } from './partner-benefits.service';
import { CreatePartnerBenefitDto } from './dto/create-partner-benefit.dto';
import { UpdatePartnerBenefitDto } from './dto/update-partner-benefit.dto';

@Controller('partner-benefits')
export class PartnerBenefitsController {
  constructor(private readonly partnerBenefitsService: PartnerBenefitsService) {}

  @Post()
  create(@Body() createPartnerBenefitDto: CreatePartnerBenefitDto) {
    return this.partnerBenefitsService.create(createPartnerBenefitDto);
  }

  @Get()
  findAll() {
    return this.partnerBenefitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerBenefitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerBenefitDto: UpdatePartnerBenefitDto) {
    return this.partnerBenefitsService.update(+id, updatePartnerBenefitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerBenefitsService.remove(+id);
  }
}
