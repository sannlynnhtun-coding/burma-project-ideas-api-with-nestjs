import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupApiDocumentation(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Burma Project Ideas')
    .setDescription(
      'A collection of Myanmar cultural and educational data APIs',
    )
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
}
