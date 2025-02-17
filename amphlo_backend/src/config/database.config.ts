import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
require('dotenv').config();

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    // url: configService.get<string>('DB_URl'),
    url: process.env.DB_URL,
    autoLoadEntities: true,
    synchronize: false,
   
});
