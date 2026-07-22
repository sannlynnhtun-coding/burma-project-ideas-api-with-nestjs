import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { join } from 'path';

export function setupApiDocumentation(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Burma Project Ideas API | မြန်မာပရောဂျက်အကြံဉာဏ်များ API')
    .setDescription(
      'A collection of Myanmar cultural and educational data APIs. မြန်မာ့ယဉ်ကျေးမှုနှင့် ပညာရေးဒေတာ API များ စုစည်းမှု။',
    )
    .setVersion('1.0')
    .addTag('burma-project-idea')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSwaggerUiPath: join(process.cwd(), 'public'),
    customfavIcon: '/assets/landing-icons.svg',
  });

  app.use('/scalar', (_req: Request, res: Response) => {
    res.type('html').send(renderScalarReferenceHtml());
  });
}

function renderScalarReferenceHtml(): string {
  const scalarConfig = JSON.stringify({
    pageTitle: 'Burma Project Ideas API Reference | မြန်မာ API ကိုးကားချက်',
    url: '/swagger-json',
  });

  return `<!doctype html>
<html lang="en">
  <head>
    <title>Scalar API Reference | Burma Project Ideas | မြန်မာ API ကိုးကားချက်</title>
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
