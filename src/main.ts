import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { get } from 'http';
import { createWriteStream } from 'fs';
import { CorsMiddleware } from './cores.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false, // Disable logging 
  });

  const config = new DocumentBuilder()
    .setTitle('Burma Project Ideas')
    .setDescription('')
    .setVersion('1.0')
    // .addTag('burma-project-idea')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  
  app.use(CorsMiddleware);
  await app.listen(3000);
}
bootstrap();
