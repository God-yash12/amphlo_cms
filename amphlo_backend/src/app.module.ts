import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileUploadModule } from './file-upload/file-upload.module';
import { HomeAboutModule } from './home/home-about/home-about.module';
import { HeroModule } from './home/hero/hero.module';
import { KeyFeaturesModule } from './home/key-features/key-features.module';
import { WhyAmphloModule } from './home/why-amphlo/why-amphlo.module';
import { CountersModule } from './home/counters/counters.module';
import { BannerModule } from './home/banner/banner.module';
import { HomeTransformModule } from './home/home-transform/home-transform.module';
import { KeyFeatureCardModule } from './forms/key-feature-card/key-feature-card.module';
import { FeatureHeroModule } from './features/hero/hero.module';
import { CoreFeatureModule } from './features/core-feature/core-feature.module';
import { AgentModule } from './features/agent/agent.module';
import { FeatureCardsModule } from './features/feature-cards/feature-cards.module';
import { OverviewModule } from './features/overview/overview.module';
import { FaqModule } from './features/faq/faq.module';
import { TestimonialsModule } from './home/testimonials/testimonials.module';
import { UniversityHeroModule } from './about/for-university/hero/hero.module';
import { UniWhyamphloModule } from './about/for-university/uni-whyamphlo/uni-whyamphlo.module';
import { JourneyModule } from './about/for-university/journey/journey.module';
import { UniFeatureModule } from './about/for-university/uni-feature/uni-feature.module';
import { WhyamphloCardModule } from './forms/for-university/whyamphlo-card/whyamphlo-card.module';
import { FeatureCardModule } from './forms/for-university/feature-card/feature-card.module';
import { JoinNowModule } from './about/for-university/join-now/join-now.module';
import { PartnerHeroModule } from './about/for-partners/partner-hero/partner-hero.module';
import { PartnerBenefitsModule } from './about/for-partners/partner-benefits/partner-benefits.module';
import { PartnerJoinnowModule } from './about/for-partners/partner-joinnow/partner-joinnow.module';
import { PartnerFeaturesModule } from './about/for-partners/partner-features/partner-features.module';
import { GalleryModule } from './about/for-partners/gallery/gallery.module';
import { CountryModule } from './countries/australia/country.module';
import { AboutMoreModule } from './about-more/about-more/about-more.module';
import { ContactModule } from './contact/contact.module';
import { PortalHeroModule } from './portal/portal-hero/portal-hero.module';
import { PortalAccessModule } from './portal/portal-access/portal-access.module';
import { PortalFeatureModule } from './portal/portal-feature/portal-feature.module';
import { UniversityModule } from './register/university/university.module';
import { PartnerModule } from './register/partner/partner.module';
import { AgentRegisterfiModule } from './register/agent/agent.module';
import { NestjsFormDataModule, FileSystemStoredFile } from 'nestjs-form-data';
import { AuthModule } from './auth/auth.module';
import { AdminSignupModule } from './admin-signup/admin-signup.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';


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
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'uploads',
      isGlobal: true,
      autoDeleteFile: false,
      limits: {
        files: 10,
        fileSize: 1024 * 1024 * 5,
      },
      cleanupAfterSuccessHandle: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    FileUploadModule,
    HomeAboutModule,
    HeroModule,
    KeyFeaturesModule,
    WhyAmphloModule,
    CountersModule,
    BannerModule,
    HomeTransformModule,
    KeyFeatureCardModule,
    CoreFeatureModule,
    AgentModule,
    FeatureHeroModule,
    FeatureCardsModule,
    OverviewModule,
    FaqModule,
    TestimonialsModule,
    UniversityHeroModule,
    UniWhyamphloModule,
    JourneyModule,
    UniFeatureModule,
    WhyamphloCardModule,
    FeatureCardModule,
    JoinNowModule,
    PartnerHeroModule,
    PartnerBenefitsModule,
    PartnerJoinnowModule,
    PartnerFeaturesModule,
    GalleryModule,
    CountryModule,
    AboutMoreModule,
    ContactModule,
    PortalHeroModule,
    PortalAccessModule,
    PortalFeatureModule,
    UniversityModule,
    PartnerModule,
    AgentRegisterfiModule,
    AuthModule,
    AdminSignupModule,
    ResetPasswordModule,

  ],
})

export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService) { }
  async onModuleInit() {
    try {
      console.log("Database Connected ")
    } catch (error) {
      console.log("Error connecting database", error)
    }
  }
}
