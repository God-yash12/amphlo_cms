import { Module } from '@nestjs/common';
import { PortalFeatureService } from './portal-feature.service';
import { PortalFeatureController } from './portal-feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalFeature } from './entities/portal-feature.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([PortalFeature]), FileUploadModule],
  controllers: [PortalFeatureController],
  providers: [PortalFeatureService],
})
export class PortalFeatureModule {}
