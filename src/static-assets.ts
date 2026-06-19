import type { INestApplication } from '@nestjs/common';
import express from 'express';
import { join } from 'path';

export function getPublicRoot(): string {
  return join(process.cwd(), 'public');
}

export function usePublicStaticAssets(app: INestApplication): void {
  app.use(express.static(getPublicRoot(), { redirect: false }));
}
