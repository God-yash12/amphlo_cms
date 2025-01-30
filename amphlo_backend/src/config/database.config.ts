import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    url: configService.get<string>('DB_URl'),
    autoLoadEntities: true,
    synchronize: true,
   
});
