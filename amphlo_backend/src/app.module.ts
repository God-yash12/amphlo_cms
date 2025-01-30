import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MulterConfigModule } from './config/multer.config.module';
import { HomeAboutModule } from './home/home-about/home-about.module';

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
