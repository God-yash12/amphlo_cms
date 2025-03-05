import "reflect-metadata"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common";
import cookieParser from 'cookie-parser'

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
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
      const allowOrigins: string[] = ['https://amphlo.com', 'https://cms.amphlo.com', 'http://192.168.1.86:5173', 'http://localhost:5173',]
      if (allowOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Requet Blocked by Cors"))
      }
    },
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
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
  const PORT = configService.get<number>('PORT') ?? 8080;
  app.listen(PORT);
  console.log(`server is running on http://localhost:${PORT}`);
}
bootstrap();
