import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import type { Express } from 'express';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { AppModule } from '../src/app.module';
import { setupApiDocumentation } from '../src/docs';
import { usePublicStaticAssets } from '../src/static-assets';

const server = express();
let bootstrapPromise: Promise<Express> | undefined;

async function bootstrap(): Promise<Express> {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(server),
      );
      usePublicStaticAssets(app);
      setupApiDocumentation(app);
      await app.init();
      return server;
    })();
  }

  return bootstrapPromise;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const app = await bootstrap();
  app(req, res);
}
