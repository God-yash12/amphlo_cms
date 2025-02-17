import "reflect-metadata"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common";
import cookieParser from 'cookie-parser'
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      logger: ["warn", "error", "debug", "verbose"]
    }
  );
  const configService = app.get(ConfigService);

  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('AMPHLO.COM')
    .setDescription('api for cms')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.setGlobalPrefix('api')

  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const PORT = configService.get<number>('PORT');
  app.listen(process.env.PORT ?? 5001);
  console.log(`server is running on http://localhost:${PORT}`);
}
bootstrap();
