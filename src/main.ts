import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { get } from 'http';
import { createWriteStream } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Burma Project Ideas')
    .setDescription('A collection of Myanmar cultural and educational data APIs')
    .setVersion('1.0')
    .addTag('burma-project-idea')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use(
    '/scalar',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();

