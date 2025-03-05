import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnerBenefitsService } from './partner-benefits.service';
import { CreatePartnerBenefitDto } from './dto/create-partner-benefit.dto';
import { UpdatePartnerBenefitDto } from './dto/update-partner-benefit.dto';

@Controller('partner-benefits')
export class PartnerBenefitsController {
  constructor(private readonly partnerBenefitsService: PartnerBenefitsService) { }

  @Post()
  create(@Body() createPartnerBenefitDto: CreatePartnerBenefitDto) {
    return this.partnerBenefitsService.create(createPartnerBenefitDto);
  }

  @Get()
  findAll() {
    return this.partnerBenefitsService.findAll();
  }

  @Delete(':id')
  async removeItem(@Param('id') id: number) {
    return await this.partnerBenefitsService.removeItem(+id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePartnerBenefitDto) {
    return this.partnerBenefitsService.updateItem(+id, dto);
  }
}
