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
    .addTag(
      'Adhihtan',
      'Read-only static content for the Adhihtan prayer-counting flow. Start with `GET /adhihtan/categories`, choose a category, read its guidance, then request all schedules or one level. The client tracks dates, counts, completion, and custom category 5 locally. Use `GET /adhihtan/data.json` when an offline client needs the complete payload in one request; use the REST endpoints when it needs only part of the data.\n\n' +
        '<span lang="my">အဓိဋ္ဌာန်ပုတီးရေတွက်ခြင်း flow အတွက် read-only static content ဖြစ်သည်။ `GET /adhihtan/categories` ဖြင့် စတင်ပြီး အမျိုးအစားရွေးပါ၊ လမ်းညွှန်ကိုဖတ်ပါ၊ ထို့နောက် schedule အားလုံး သို့မဟုတ် အဆင့်တစ်ခုကို ရယူပါ။ ရက်စွဲ၊ ရေတွက်မှု၊ ပြီးစီးမှုနှင့် စိတ်ကြိုက် category ၅ ကို client က local တွင် ထိန်းသိမ်းရမည်။ Offline client က data အပြည့်အစုံကို request တစ်ကြိမ်တည်းဖြင့် လိုအပ်လျှင် `GET /adhihtan/data.json` ကိုသုံးပြီး အပိုင်းလိုက်သာလိုအပ်လျှင် REST endpoints များကိုသုံးပါ။</span>',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSwaggerUiPath: join(process.cwd(), 'public'),
    customCss: swaggerThemeCss,
    customfavIcon: '/assets/landing-icons.svg',
    customSiteTitle: 'Burma Project Ideas API Docs | မြန်မာ API စာရွက်စာတမ်း',
  });

  app.use('/scalar', (_req: Request, res: Response) => {
    res.type('html').send(renderScalarReferenceHtml());
  });
}

function renderScalarReferenceHtml(): string {
  const scalarConfig = JSON.stringify({
    pageTitle: 'Burma Project Ideas API Reference | မြန်မာ API ကိုးကားချက်',
    url: '/swagger-json',
    theme: 'none',
    layout: 'modern',
    forceDarkModeState: 'dark',
    hideDarkModeToggle: true,
    withDefaultFonts: false,
    customCss: scalarThemeCss,
  });

  return `<!doctype html>
<html lang="en">
  <head>
    <title>Scalar API Reference | Burma Project Ideas | မြန်မာ API ကိုးကားချက်</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
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

const swaggerThemeCss = `
:root {
  color-scheme: dark;
  --docs-bg: #08101f;
  --docs-surface: #0d182b;
  --docs-surface-muted: #12213a;
  --docs-ink: #f3f7ff;
  --docs-text: #d5deed;
  --docs-muted: #a9b6cb;
  --docs-line: #223454;
  --docs-line-strong: #385276;
  --docs-accent: #43d3ff;
  --docs-focus: #ffd166;
  --font-sans: "SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI Variable Text", "Segoe UI", Arial, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", monospace;
}

html,
body,
.swagger-ui {
  background: var(--docs-bg) !important;
}

body {
  min-width: 320px;
}

.swagger-ui {
  color: var(--docs-text);
}

.swagger-ui,
.swagger-ui * {
  font-family: var(--font-sans) !important;
}

.swagger-ui code,
.swagger-ui pre,
.swagger-ui kbd,
.swagger-ui samp,
.swagger-ui .code,
.swagger-ui .microlight,
.swagger-ui .model,
.swagger-ui .prop-type,
.swagger-ui .parameter__in {
  font-family: var(--font-mono) !important;
}

.swagger-ui .wrapper {
  max-width: 1220px;
  padding-inline: 32px;
}

.swagger-ui .topbar {
  padding: 16px 0;
  border-bottom: 1px solid var(--docs-line);
  background: var(--docs-bg);
}

.swagger-ui .topbar a {
  max-width: none;
}

.swagger-ui .topbar svg {
  filter: hue-rotate(100deg) saturate(1.1);
}

.swagger-ui .topbar a span,
.swagger-ui .info .title,
.swagger-ui .info h1,
.swagger-ui .info h2,
.swagger-ui .info h3,
.swagger-ui .opblock-tag,
.swagger-ui .opblock .opblock-section-header h4,
.swagger-ui section.models h4,
.swagger-ui .model-title,
.swagger-ui .dialog-ux .modal-ux-header h3 {
  color: var(--docs-ink);
}

.swagger-ui .topbar .download-url-wrapper input[type="text"],
.swagger-ui input[type="email"],
.swagger-ui input[type="file"],
.swagger-ui input[type="password"],
.swagger-ui input[type="search"],
.swagger-ui input[type="text"],
.swagger-ui textarea,
.swagger-ui select {
  border-color: var(--docs-line-strong);
  background: var(--docs-surface);
  color: var(--docs-ink);
}

.swagger-ui .topbar .download-url-wrapper .select-label select {
  border-color: var(--docs-line-strong);
}

.swagger-ui .info {
  margin-block: 44px;
}

.swagger-ui .info .title {
  font-size: clamp(32px, 4vw, 48px);
  line-height: 1.35;
  letter-spacing: -0.035em;
}

.swagger-ui .info .title small,
.swagger-ui .info .title small pre {
  background: var(--docs-accent);
  color: #07111f;
}

.swagger-ui .info .description,
.swagger-ui .info .description p,
.swagger-ui .info li,
.swagger-ui .info table,
.swagger-ui .info .base-url,
.swagger-ui .opblock-tag small,
.swagger-ui .opblock .opblock-summary-description,
.swagger-ui .opblock-description-wrapper,
.swagger-ui .opblock-description-wrapper p,
.swagger-ui .opblock-external-docs-wrapper,
.swagger-ui .opblock-title_normal,
.swagger-ui .parameter__name,
.swagger-ui .parameter__type,
.swagger-ui .response-col_status,
.swagger-ui .response-col_description,
.swagger-ui .responses-inner h4,
.swagger-ui .responses-inner h5,
.swagger-ui .model,
.swagger-ui .model-box,
.swagger-ui .model-example,
.swagger-ui .renderedMarkdown p,
.swagger-ui .markdown p,
.swagger-ui table thead tr td,
.swagger-ui table thead tr th {
  color: var(--docs-text);
}

.swagger-ui a,
.swagger-ui .prop-type,
.swagger-ui .model-toggle::after {
  color: var(--docs-accent);
}

.swagger-ui .scheme-container,
.swagger-ui .opblock .opblock-section-header,
.swagger-ui section.models,
.swagger-ui .model-container,
.swagger-ui .model-box,
.swagger-ui .dialog-ux .modal-ux,
.swagger-ui .dialog-ux .modal-ux-header,
.swagger-ui .auth-container {
  border-color: var(--docs-line);
  background: var(--docs-surface);
  box-shadow: none;
}

.swagger-ui .scheme-container {
  margin-block: 0 36px;
  padding: 24px 0;
}

.swagger-ui .opblock-tag {
  border-bottom-color: var(--docs-line);
}

.swagger-ui .opblock {
  border-radius: 14px;
  background: var(--docs-surface);
  box-shadow: none;
}

.swagger-ui .opblock .opblock-summary {
  border-bottom-color: var(--docs-line);
}

.swagger-ui .opblock .opblock-summary-method {
  border-radius: 8px;
  color: #07111f;
  text-shadow: none;
}

.swagger-ui .opblock .opblock-summary-path,
.swagger-ui .opblock .opblock-summary-path__deprecated {
  color: var(--docs-ink);
}

.swagger-ui .opblock.opblock-get {
  border-color: #43d3ff;
  background: var(--docs-surface);
}

.swagger-ui .opblock.opblock-get .opblock-summary-method {
  background: #43d3ff;
}

.swagger-ui .opblock.opblock-post {
  border-color: #5ee4ba;
  background: var(--docs-surface);
}

.swagger-ui .opblock.opblock-post .opblock-summary-method {
  background: #5ee4ba;
}

.swagger-ui .opblock.opblock-put,
.swagger-ui .opblock.opblock-patch {
  border-color: #ffd166;
  background: var(--docs-surface);
}

.swagger-ui .opblock.opblock-put .opblock-summary-method,
.swagger-ui .opblock.opblock-patch .opblock-summary-method {
  background: #ffd166;
}

.swagger-ui .opblock.opblock-delete {
  border-color: #ff8b9d;
  background: var(--docs-surface);
}

.swagger-ui .opblock.opblock-delete .opblock-summary-method {
  background: #ff8b9d;
}

.swagger-ui table tbody tr td {
  border-bottom-color: var(--docs-line);
  color: var(--docs-text);
}

.swagger-ui .highlight-code,
.swagger-ui .microlight,
.swagger-ui .example,
.swagger-ui pre,
.swagger-ui code {
  background: #071120 !important;
  color: #d7e2f5 !important;
}

.swagger-ui .btn {
  border-color: var(--docs-line-strong);
  border-radius: 999px;
  background: var(--docs-surface-muted);
  color: var(--docs-ink);
  box-shadow: none;
}

.swagger-ui .btn.authorize,
.swagger-ui .btn.execute {
  border-color: var(--docs-accent);
  background: var(--docs-accent);
  color: #07111f;
}

.swagger-ui .btn.authorize svg {
  fill: #07111f;
}

.swagger-ui svg:not(:root) {
  fill: var(--docs-muted);
}

.swagger-ui :focus-visible {
  outline: 3px solid var(--docs-focus);
  outline-offset: 3px;
}

@media (max-width: 800px) {
  .swagger-ui .wrapper {
    padding-inline: 18px;
  }

  .swagger-ui .info {
    margin-block: 32px;
  }

  .swagger-ui .opblock .opblock-summary {
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .swagger-ui *,
  .swagger-ui *::before,
  .swagger-ui *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;

const scalarThemeCss = `
:root,
.dark-mode {
  color-scheme: dark;
  --scalar-font: "SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI Variable Text", "Segoe UI", Arial, sans-serif;
  --scalar-font-code: ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  --scalar-color-1: #f3f7ff;
  --scalar-color-2: #a9b6cb;
  --scalar-color-3: #7f8da5;
  --scalar-color-accent: #43d3ff;
  --scalar-background-1: #08101f;
  --scalar-background-2: #0d182b;
  --scalar-background-3: #12213a;
  --scalar-background-accent: #102c42;
  --scalar-border-color: #223454;
}

html,
body {
  min-width: 320px;
  background: #08101f;
}

:focus-visible {
  outline: 3px solid #ffd166 !important;
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;
