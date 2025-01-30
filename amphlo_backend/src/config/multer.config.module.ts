import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { storageConfig } from '../config/storage.config';
import { fileFilterConfig } from '../config/file-filter.config';

@Module({
  imports: [
    MulterModule.register({
      storage: storageConfig,
      fileFilter: fileFilterConfig,
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  ],
  exports: [MulterModule],
})
export class MulterConfigModule {}
