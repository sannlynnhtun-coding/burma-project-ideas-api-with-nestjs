import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { apiReference } from '@scalar/nestjs-api-reference';
import type { NextFunction, Request, Response } from 'express';

type ScalarModule = {
  apiReference: typeof apiReference;
};

type ScalarMiddleware = (req: Request, res: Response) => void;

const importEsm = new Function('specifier', 'return import(specifier)') as <
  TModule,
>(
  specifier: string,
) => Promise<TModule>;

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

  const scalarMiddlewarePromise = importEsm<ScalarModule>(
    '@scalar/nestjs-api-reference',
  ).then(
    ({ apiReference }) =>
      apiReference({
        spec: {
          content: document,
        },
      }) as ScalarMiddleware,
  );

  app.use(
    '/scalar',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const scalarMiddleware = await scalarMiddlewarePromise;
        scalarMiddleware(req, res);
      } catch (error) {
        next(error);
      }
    },
  );
}
