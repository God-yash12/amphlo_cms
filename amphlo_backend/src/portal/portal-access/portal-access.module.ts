import { Module } from '@nestjs/common';
import { PortalAccessService } from './portal-access.service';
import { PortalAccessController } from './portal-access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalAccess } from './entities/portal-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortalAccess])],
  controllers: [PortalAccessController],
  providers: [PortalAccessService],
})
export class PortalAccessModule {}
