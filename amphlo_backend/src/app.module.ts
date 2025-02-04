import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MulterConfigModule } from './config/multer.config.module';
import { HomeAboutModule } from './home/home-about/home-about.module';
import { HeroModule } from './home/hero/hero.module';
import { KeyFeaturesModule } from './home/key-features/key-features.module';
import { WhyAmphloModule } from './home/why-amphlo/why-amphlo.module';
import { CountersModule } from './home/counters/counters.module';
import { BannerModule } from './home/banner/banner.module';
import { HomeTransformModule } from './home/home-transform/home-transform.module';
import { KeyFeatureCardModule } from './forms/key-feature-card/key-feature-card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,  
    }),

    // TypeORM Configuration
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig, 
      inject: [ConfigService],  
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    
    MulterConfigModule,
    FileUploadModule,
    HomeAboutModule,
    HeroModule,
    KeyFeaturesModule,
    WhyAmphloModule,
    CountersModule,
    BannerModule,
    HomeTransformModule,
    KeyFeatureCardModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService){}
  async onModuleInit() {
    try {
      console.log("Database Connected ")
    } catch (error) {
      console.log("Error connecting database", error.message)
    }
  }
}
