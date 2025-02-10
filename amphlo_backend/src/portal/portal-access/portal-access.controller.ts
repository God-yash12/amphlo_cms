import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortalAccessService } from './portal-access.service';
import { CreatePortalAccessDto } from './dto/create-portal-access.dto';
import { UpdatePortalAccessDto } from './dto/update-portal-access.dto';

@Controller('portal-access')
export class PortalAccessController {
  constructor(private readonly portalAccessService: PortalAccessService) {}

  @Patch()
  create(@Body() createPortalAccessDto: CreatePortalAccessDto) {
    return this.portalAccessService.set(createPortalAccessDto);
  }

  @Get()
  findAll() {
    return this.portalAccessService.get();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.portalAccessService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePortalAccessDto: UpdatePortalAccessDto) {
  //   return this.portalAccessService.update(+id, updatePortalAccessDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.portalAccessService.remove(+id);
  // }
}
