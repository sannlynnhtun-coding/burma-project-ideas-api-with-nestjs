import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { join } from 'path';

interface ApiTagDefinition {
  name: string;
  english: string;
  myanmar: string;
  sourceUrl: string;
}

const apiTagDefinitions: ApiTagDefinition[] = [
  {
    name: 'adhihtan | အဓိဋ္ဌာန်',
    english:
      'Build a read-only adhihtan counting flow: get the categories, show the selected category’s guidance, load every schedule level or one level, then track dates, counts, and completion in the client. Category 5 is custom and has no server schedule. Use `GET /adhihtan/data.json` to cache all static content in one request.',
    myanmar:
      'Read-only အဓိဋ္ဌာန်ပုတီးရေတွက်ခြင်း flow ကို တည်ဆောက်ရန် အမျိုးအစားများကို ရယူပါ၊ ရွေးထားသောအမျိုးအစား၏ လမ်းညွှန်ကိုပြပါ၊ schedule level အားလုံး သို့မဟုတ် level တစ်ခုကို ရယူပါ၊ ထို့နောက် ရက်စွဲ၊ ရေတွက်မှုနှင့် ပြီးစီးမှုကို client တွင် သိမ်းပါ။ Category ၅ သည် စိတ်ကြိုက်ဖြစ်ပြီး server schedule မရှိပါ။ Static content အားလုံးကို request တစ်ကြိမ်တည်းဖြင့် cache လုပ်ရန် `GET /adhihtan/data.json` ကိုသုံးပါ။',
    sourceUrl: 'https://github.com/sannlynnhtun-coding/Adhihtan',
  },
  {
    name: 'quotlets | အဆိုအမိန့်များ',
    english:
      'Browse image-and-quote posts with `GET /quotlets`, then load one post by ID with `GET /quotlets/:id`.',
    myanmar:
      'ပုံနှင့် စာစု post များကို `GET /quotlets` ဖြင့် ကြည့်ရှုပြီး post တစ်ခုကို ID အသုံးပြု၍ `GET /quotlets/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/quotlets',
  },
  {
    name: 'burmese-recipes | မြန်မာဟင်းချက်နည်းများ',
    english:
      'Browse Myanmar recipes with `GET /burmese-recipes`, then load the ingredients and cooking instructions for one recipe with `GET /burmese-recipes/:id`.',
    myanmar:
      'မြန်မာဟင်းချက်နည်းများကို `GET /burmese-recipes` ဖြင့် ကြည့်ရှုပြီး ဟင်းတစ်မျိုး၏ ပါဝင်ပစ္စည်းနှင့် ချက်ပြုတ်နည်းကို `GET /burmese-recipes/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/burmese-recipes',
  },
  {
    name: 'burmese-agriculture | မြန်မာ့စိုက်ပျိုးရေး',
    english:
      'Browse Myanmar agriculture articles with `GET /burmese-agriculture`, then load one article’s title, author, date, and content with `GET /burmese-agriculture/:id`.',
    myanmar:
      'မြန်မာ့စိုက်ပျိုးရေးဆောင်းပါးများကို `GET /burmese-agriculture` ဖြင့် ကြည့်ရှုပြီး ဆောင်းပါးတစ်ပုဒ်၏ ခေါင်းစဉ်၊ စာရေးသူ၊ ရက်စွဲနှင့် အကြောင်းအရာကို `GET /burmese-agriculture/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/burmese-agriculture',
  },
  {
    name: 'phayar-sar | ဘုရားစာ',
    english:
      'List Buddhist prayer groups with `GET /phayar-sar`, then load one prayer entry with `GET /phayar-sar/:groupId/:detailId`.',
    myanmar:
      'ဘုရားစာအုပ်စုများကို `GET /phayar-sar` ဖြင့် ရယူပြီး ဘုရားစာတစ်ပုဒ်ကို `GET /phayar-sar/:groupId/:detailId` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/phayar-sar',
  },
  {
    name: 'nat-myat-si | နတ်မျက်စိ',
    english:
      'List or search questions, choose one of the 16 symbols, then get the matching reading with `GET /nat-myat-si/readings/:questionId/:symbolId`.',
    myanmar:
      'မေးခွန်းများကို စာရင်းကြည့်ပါ သို့မဟုတ် ရှာဖွေပါ၊ သင်္ကေတ ၁၆ ခုထဲမှ တစ်ခုကိုရွေးပါ၊ ထို့နောက် သက်ဆိုင်ရာအဖြေကို `GET /nat-myat-si/readings/:questionId/:symbolId` ဖြင့် ရယူပါ။',
    sourceUrl:
      'https://github.com/sannlynnhtun-coding/burma-project-ideas/tree/main/nat-myat-si',
  },
  {
    name: 'lat-htauk-bay-din | လက်ထောက်ဗေဒင်',
    english:
      'Load the questions and number choices, then combine a question number and answer number to get a divination answer from `GET /lat-htauk-bay-din/Answer/:questionNo/:answerNo`.',
    myanmar:
      'မေးခွန်းများနှင့် နံပါတ်ရွေးချယ်စရာများကို ရယူပြီး မေးခွန်းနံပါတ်နှင့် အဖြေနံပါတ်ကို တွဲ၍ `GET /lat-htauk-bay-din/Answer/:questionNo/:answerNo` မှ ဗေဒင်အဖြေကို ရယူပါ။',
    sourceUrl:
      'https://github.com/burma-project-ideas/min-thein-kha-lat-htauk-bay-din',
  },
  {
    name: 'dream-dictionary | အိပ်မက်အဘိဓာန်',
    english:
      'List the alphabetic dream groups with `GET /dream-dictionary`, then load the interpretations in one group with `GET /dream-dictionary/:id`.',
    myanmar:
      'အက္ခရာအလိုက် အိပ်မက်အုပ်စုများကို `GET /dream-dictionary` ဖြင့် ရယူပြီး အုပ်စုတစ်ခု၏ နိမိတ်အဓိပ္ပာယ်များကို `GET /dream-dictionary/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/dream-dictionary',
  },
  {
    name: 'movie-ticket-online-booking | ရုပ်ရှင်လက်မှတ် အွန်လိုင်းကြိုတင်မှာယူခြင်း',
    english:
      'This source app demonstrates browsing movies, choosing a cinema and showtime, selecting seats, and storing bookings in the browser. This NestJS API does not currently expose movie-ticket endpoints.',
    myanmar:
      'ဤမူရင်း app တွင် ရုပ်ရှင်များကြည့်ရှုခြင်း၊ ရုပ်ရှင်ရုံနှင့် ပြသချိန်ရွေးခြင်း၊ ထိုင်ခုံရွေးခြင်းနှင့် booking များကို browser တွင် သိမ်းခြင်း flow ကို လေ့လာနိုင်သည်။ လက်ရှိ NestJS API တွင် movie-ticket endpoint မရှိသေးပါ။',
    sourceUrl:
      'https://github.com/sannlynnhtun-coding/Movie-Ticket-Online-Booking-System',
  },
  {
    name: 'pick-a-pile | ကတ်တစ်ပုံရွေး',
    english:
      'List the fortune-telling questions with `GET /pick-a-pile`, then use a question ID to get its card answers from `GET /pick-a-pile/:id`.',
    myanmar:
      'ဗေဒင်မေးခွန်းများကို `GET /pick-a-pile` ဖြင့် ရယူပြီး မေးခွန်း ID ကိုသုံး၍ သက်ဆိုင်ရာကတ်အဖြေများကို `GET /pick-a-pile/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/pick-a-pile',
  },
  {
    name: 'myanmar-proverbs | မြန်မာစကားပုံများ',
    english:
      'Browse Myanmar proverbs and their meanings with `GET /myanmar-proverbs`, then load one record with `GET /myanmar-proverbs/:id`.',
    myanmar:
      'မြန်မာစကားပုံများနှင့် အဓိပ္ပာယ်များကို `GET /myanmar-proverbs` ဖြင့် ကြည့်ရှုပြီး စကားပုံတစ်ခုကို `GET /myanmar-proverbs/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/myanmar-proverbs',
  },
  {
    name: 'zodiac | ရာသီခွင်',
    english:
      'Browse zodiac signs with `GET /zodiac`, then load one sign by ID to view its dates, element, traits, and character with `GET /zodiac/:id`.',
    myanmar:
      'ရာသီခွင်များကို `GET /zodiac` ဖြင့် ကြည့်ရှုပြီး ရာသီခွင်တစ်ခု၏ ရက်စွဲ၊ ဓာတ်သဘော၊ လက္ခဏာနှင့် စရိုက်ကို `GET /zodiac/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/zodiac',
  },
  {
    name: 'bagan-map | ပုဂံမြေပုံ',
    english:
      'List Bagan travel route IDs, load a route and its pagodas with `GET /bagan-map/:id`, then request one pagoda history record with `GET /bagan-map/detail/:id`.',
    myanmar:
      'ပုဂံခရီးစဉ် ID များကို ရယူပါ၊ ခရီးစဉ်နှင့် သက်ဆိုင်ရာဘုရားများကို `GET /bagan-map/:id` ဖြင့် ရယူပါ၊ ထို့နောက် ဘုရားတစ်ဆူ၏ သမိုင်းအချက်အလက်ကို `GET /bagan-map/detail/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/bagan-map',
  },
  {
    name: 'birds | ငှက်များ',
    english:
      'Browse Myanmar birds with `GET /birds`, then load one bird by ID for its Myanmar and English names, description, and image with `GET /birds/:id`.',
    myanmar:
      'မြန်မာနိုင်ငံရှိ ငှက်များကို `GET /birds` ဖြင့် ကြည့်ရှုပြီး ငှက်တစ်မျိုး၏ မြန်မာအမည်၊ အင်္ဂလိပ်အမည်၊ ဖော်ပြချက်နှင့် ပုံကို `GET /birds/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/birds',
  },
  {
    name: 'myanmar-months | မြန်မာလများ',
    english:
      'Browse Myanmar calendar months with `GET /myanmar-months`, then load one month by ID for its festivals, description, and details with `GET /myanmar-months/:id`.',
    myanmar:
      'မြန်မာပြက္ခဒိန်လများကို `GET /myanmar-months` ဖြင့် ကြည့်ရှုပြီး လတစ်လ၏ ပွဲတော်၊ ဖော်ပြချက်နှင့် အသေးစိတ်အချက်အလက်ကို `GET /myanmar-months/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/myanmar-months',
  },
  {
    name: 'snakes | မြွေများ',
    english:
      'Browse Myanmar snakes with `GET /snakes`, then load one snake by ID for its Myanmar and English names, description, image, and poison and danger indicators with `GET /snakes/:id`.',
    myanmar:
      'မြန်မာနိုင်ငံရှိ မြွေများကို `GET /snakes` ဖြင့် ကြည့်ရှုပြီး မြွေတစ်မျိုး၏ မြန်မာအမည်၊ အင်္ဂလိပ်အမည်၊ ဖော်ပြချက်၊ ပုံနှင့် အဆိပ်ရှိမှု၊ အန္တရာယ်ရှိမှုအချက်အလက်ကို `GET /snakes/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/snakes',
  },
  {
    name: 'art-gallery | အနုပညာပြခန်း',
    english:
      'Browse Myanmar artworks with `GET /art-gallery`, then use an artwork ID to load its artist profile and the artist’s related works from `GET /art-gallery/:id`.',
    myanmar:
      'မြန်မာအနုပညာလက်ရာများကို `GET /art-gallery` ဖြင့် ကြည့်ရှုပြီး လက်ရာ ID ကိုသုံး၍ ပန်းချီဆရာ၏ profile နှင့် ဆက်စပ်လက်ရာများကို `GET /art-gallery/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/art-gallery',
  },
  {
    name: 'incompatible-food | အတည့်မဖြစ်သော အစားအစာများ',
    english:
      'Browse traditional food-pairing records with `GET /incompatible-food`, then load one record by ID to view the two foods and its description with `GET /incompatible-food/:id`.',
    myanmar:
      'ရိုးရာအစားအစာတွဲဖက်မှုမှတ်တမ်းများကို `GET /incompatible-food` ဖြင့် ကြည့်ရှုပြီး အစားအစာနှစ်မျိုးနှင့် ဖော်ပြချက်ကို `GET /incompatible-food/:id` ဖြင့် ရယူပါ။',
    sourceUrl: 'https://github.com/burma-project-ideas/incompatible-food',
  },
  {
    name: 'missing-historical-records | ပျောက်ဆုံးသမိုင်းမှတ်တမ်းများ',
    english:
      'Browse historical books with `GET /missing-historical-records`, load one book’s metadata by ID, or read its stored pages with `GET /missing-historical-records/:id/pages`.',
    myanmar:
      'သမိုင်းစာအုပ်များကို `GET /missing-historical-records` ဖြင့် ကြည့်ရှုပါ၊ စာအုပ် ID ဖြင့် metadata ကို ရယူပါ သို့မဟုတ် သိမ်းဆည်းထားသော စာမျက်နှာများကို `GET /missing-historical-records/:id/pages` ဖြင့် ဖတ်ရှုပါ။',
    sourceUrl:
      'https://github.com/burma-project-ideas/missing-historical-records',
  },
];

function buildApiTagDescription(definition: ApiTagDefinition): string {
  return (
    `${definition.english}\n\n` +
    `<span lang="my">${definition.myanmar}</span>\n\n` +
    `Source project / <span lang="my">မူရင်း project</span>: [GitHub](${definition.sourceUrl})`
  );
}

export function setupApiDocumentation(app: INestApplication): void {
  const configBuilder = new DocumentBuilder()
    .setTitle('Burma Project Ideas API | မြန်မာပရောဂျက်အကြံဉာဏ်များ API')
    .setDescription(
      'Browse documented REST endpoints for Myanmar culture, education, travel, food, calendars, and reference data. ' +
        '<span lang="my">မြန်မာ့ယဉ်ကျေးမှု၊ ပညာရေး၊ ခရီးသွား၊ အစားအစာ၊ ပြက္ခဒိန်နှင့် ကိုးကားဒေတာများအတွက် စာရွက်စာတမ်းပါသော REST endpoint များကို ကြည့်ရှုပါ။</span>',
    )
    .setVersion('1.0');

  for (const definition of apiTagDefinitions) {
    configBuilder.addTag(definition.name, buildApiTagDescription(definition));
  }

  const config = configBuilder.build();

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
.swagger-ui .info .title small.version-stamp {
  background: var(--docs-accent);
  color: #07111f;
}

.swagger-ui .info .title small pre {
  background: transparent !important;
  color: #07111f !important;
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
