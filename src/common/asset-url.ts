import type { Request } from 'express';

type HeaderValue = string | string[] | undefined;

function firstHeaderValue(value: HeaderValue): string | undefined {
  const headerValue = Array.isArray(value) ? value[0] : value;
  return headerValue?.split(',')[0]?.trim();
}

function getRequestOrigin(request: Request): string {
  const protocol =
    firstHeaderValue(request.headers['x-forwarded-proto']) ??
    request.protocol ??
    'http';
  const host =
    firstHeaderValue(request.headers['x-forwarded-host']) ??
    request.get('host') ??
    'localhost';

  return `${protocol}://${host}`;
}

function encodeAssetPath(assetPath: string): string {
  return assetPath.split('/').map(encodeURIComponent).join('/');
}

export function normalizeAssetPath(assetPath: string): string {
  return assetPath
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/^img\/birds\/img\//i, 'birds/img/')
    .replace(/^img\/art-gallery\//i, 'art-gallery/');
}

export function buildAssetUrl(request: Request, assetPath: string): string {
  const normalizedPath = normalizeAssetPath(assetPath);
  return `${getRequestOrigin(request)}/${encodeAssetPath(normalizedPath)}`;
}

export function buildFeatureAssetUrl(
  request: Request,
  featureRoot: string,
  assetPath: string,
): string {
  const normalizedRoot = normalizeAssetPath(featureRoot).replace(/\/+$/, '');
  const normalizedPath = normalizeAssetPath(assetPath);

  return buildAssetUrl(request, `${normalizedRoot}/${normalizedPath}`);
}
