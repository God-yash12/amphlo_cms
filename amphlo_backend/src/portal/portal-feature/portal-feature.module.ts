import { Module } from '@nestjs/common';
import { PortalFeatureService } from './portal-feature.service';
import { PortalFeatureController } from './portal-feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalFeature } from './entities/portal-feature.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortalFeature, FileUpload])],
  controllers: [PortalFeatureController],
  providers: [PortalFeatureService],
})
export class PortalFeatureModule {}
