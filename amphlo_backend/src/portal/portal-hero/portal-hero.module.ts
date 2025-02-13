import { Module } from '@nestjs/common';
import { PortalHeroService } from './portal-hero.service';
import { PortalHeroController } from './portal-hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalHero } from './entities/portal-hero.entity';
import { FileUpload } from 'src/file-upload/entities/file-upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PortalHero, FileUpload])],
  controllers: [PortalHeroController],
  providers: [PortalHeroService],
})
export class PortalHeroModule {}
