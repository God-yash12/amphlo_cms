import "reflect-metadata"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from "path";
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  });

  const config = new DocumentBuilder()
    .setTitle('cms')
    .setDescription('api for cms')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.setGlobalPrefix('api')

  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  app.listen(process.env.PORT ?? 5001);
  console.log(`server is running on http://localhost:${PORT}`);
}
bootstrap();
