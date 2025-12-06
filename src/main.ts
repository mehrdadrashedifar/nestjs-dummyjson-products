import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // auto transform and validate incoming requests
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('API for DummyJSON products')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  console.log(`Swagger docs available at http://localhost:${process.env.PORT || 3000}/api`);
}
bootstrap();
