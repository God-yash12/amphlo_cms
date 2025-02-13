import "reflect-metadata"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ForbiddenException, ValidationPipe } from "@nestjs/common";
import { log } from "console";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);


  app.enableCors({
    // origin: 'http://localhost:3000',
    origin: function (origin: undefined | string, callback: (e: Error, b: boolean) => {}) {
      if (origin === undefined && configService.get("NODE_ENV") === 'production') throw new ForbiddenException("Not Allowed By CORs")

      if (origin === configService.get(`CLIENT_URL`) || configService.get("NODE_ENV") === 'development') {
        return callback(null, true)
      } else {
        return callback(new ForbiddenException("Error"), false)
      }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('cms')
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
