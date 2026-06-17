import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { apiReference } from '@scalar/nestjs-api-reference';
import type { NextFunction, Request, Response } from 'express';
import { join } from 'path';

type ScalarModule = {
  apiReference: typeof apiReference;
};

type ScalarMiddleware = (req: Request, res: Response) => void;

const importEsm = new Function('specifier', 'return import(specifier)') as <
  TModule,
>(
  specifier: string,
) => Promise<TModule>;

let scalarMiddlewarePromise: Promise<ScalarMiddleware> | undefined;

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
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!scalarMiddlewarePromise) {
          scalarMiddlewarePromise = importEsm<ScalarModule>(
            '@scalar/nestjs-api-reference',
          ).then(
            ({ apiReference }) =>
              apiReference({
                spec: {
                  content: document,
                },
              }) as ScalarMiddleware,
          );
        }

        const scalarMiddleware = await scalarMiddlewarePromise;
        scalarMiddleware(req, res);
      } catch (error) {
        scalarMiddlewarePromise = undefined;
        console.error('Scalar API Reference failed to load', error);

        if (!res.headersSent) {
          res.redirect(302, '/swagger');
          return;
        }

        next(error);
      }
    },
  );
}
