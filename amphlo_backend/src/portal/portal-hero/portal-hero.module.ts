import { Module } from '@nestjs/common';
import { PortalHeroService } from './portal-hero.service';
import { PortalHeroController } from './portal-hero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalHero } from './entities/portal-hero.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([PortalHero]), FileUploadModule],
  controllers: [PortalHeroController],
  providers: [PortalHeroService],
})
export class PortalHeroModule {}
