import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { join } from 'path';

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
  SwaggerModule.setup('swagger', app, document, {
    customSwaggerUiPath: join(process.cwd(), 'public'),
    customfavIcon: '/assets/landing-icons.svg',
  });

  app.use(
    '/scalar',
    (_req: Request, res: Response) => {
      res.type('html').send(renderScalarReferenceHtml());
    },
  );
}

function renderScalarReferenceHtml(): string {
  const scalarConfig = JSON.stringify({
    pageTitle: 'Burma Project Ideas API Reference',
    url: '/swagger-json',
  });

  return `<!doctype html>
<html lang="en">
  <head>
    <title>Scalar API Reference | Burma Project Ideas</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="app"></div>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
    <script>
      Scalar.createApiReference('#app', ${scalarConfig})
    </script>
  </body>
</html>`;
}
