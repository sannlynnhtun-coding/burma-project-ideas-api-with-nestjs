import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApiDocumentation } from './../src/docs';
import { usePublicStaticAssets } from './../src/static-assets';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    usePublicStaticAssets(app);
    setupApiDocumentation(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET) should serve the bilingual accessible landing page', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(res.text).toContain('<html lang="en" data-language="en">');
        expect(res.text).toContain('href="#main"');
        expect(res.text).toContain('<main id="main">');
        expect(res.text).toContain('data-language-choice="en"');
        expect(res.text).toContain('data-language-choice="my"');
        expect(res.text).toContain('data-copy lang="my"');
        expect(res.text).toContain('burma-project-ideas-language');
        expect(res.text).toContain('<dl class="hero-facts">');
        expect(res.text).toContain('<figure class="payload">');
        expect(res.text).toContain('<pre><code lang="en">');
        expect(res.text).toContain('/assets/brand-logo.svg');
        expect(res.text).toContain('/assets/social-card.png');
        expect(res.text).toContain('application/ld+json');
        expect(res.text).toContain('rel="canonical"');
        expect(res.text).toContain('rel="apple-touch-icon"');
        const structuredDataMatch = res.text.match(
          /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
        );
        expect(structuredDataMatch).not.toBeNull();
        const structuredData = JSON.parse(structuredDataMatch?.[1] ?? '{}');
        expect(structuredData).toMatchObject({
          '@type': 'WebSite',
          name: 'Burma Project Ideas API',
          logo: '/assets/icon-512.png',
          inLanguage: ['en', 'my'],
          publisher: {
            '@type': 'Organization',
            logo: {
              '@type': 'ImageObject',
              width: 512,
              height: 512,
            },
          },
        });
        expect(res.text).toContain('<dd lang="en">18</dd>');
        expect(res.text).toContain('/adhihtan/categories');
        expect(res.text).toContain('Open API docs');
        expect(res.text).toContain('Browse Myanmar datasets by topic.');
        expect(res.text).toContain(
          'Built for apps that need clear, documented data.',
        );
        expect(res.text).not.toContain('Live route map');
        expect(res.text).not.toContain('operational data product');
        expect(res.text).toContain(
          '<span data-copy lang="my">အဓိဋ္ဌာန်</span>',
        );
        expect(res.text).toContain('@media (prefers-reduced-motion: reduce)');
      });
  });

  it('/missing-historical-records (GET) should return records', () => {
    return request(app.getHttpServer())
      .get('/missing-historical-records')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveLength(43);
        expect(res.body[0]).toHaveProperty('BookId', 1);
      });
  });

  it('/nat-myat-si should serve the static divination workflow', async () => {
    await request(app.getHttpServer())
      .get('/nat-myat-si/questions')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(100);
        expect(res.body[0]).toEqual({
          id: 1,
          text: 'ဒီနှစ်အတွင်း အိမ်ထောင်ကျမှာလား။',
        });
      });

    await request(app.getHttpServer())
      .get('/nat-myat-si/questions')
      .query({ search: 'အိမ်ထောင်' })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBeGreaterThan(0);
        expect(
          res.body.every((question: { text: string }) =>
            question.text.includes('အိမ်ထောင်'),
          ),
        ).toBe(true);
      });

    await request(app.getHttpServer())
      .get('/nat-myat-si/symbols')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(16);
      });

    await request(app.getHttpServer())
      .get('/nat-myat-si/readings/1/pisces')
      .expect(200)
      .expect((res) => {
        expect(res.body.symbol.id).toBe('pisces');
        expect(res.body.answer.text).toBe(
          'အဝေးတစ်နေရာ (သို့) ခရီးသွားရင်း ဖူးစာဆုံ၍ အိမ်ထောင်ကျမည်။',
        );
      });
  });

  it('/nat-myat-si should validate reading identifiers', async () => {
    await request(app.getHttpServer())
      .get('/nat-myat-si/questions/not-a-number')
      .expect(400);

    await request(app.getHttpServer())
      .get('/nat-myat-si/readings/999/pisces')
      .expect(404);

    await request(app.getHttpServer())
      .get('/nat-myat-si/readings/1/unknown')
      .expect(404);
  });

  it('/adhihtan should serve raw and structured static content', async () => {
    await request(app.getHttpServer())
      .get('/adhihtan/data.json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.schemaVersion).toBe(1);
        expect(res.body.categories).toHaveLength(5);
        expect(Object.keys(res.body.localizedSpellNames)).toHaveLength(35);
      });

    await request(app.getHttpServer())
      .get('/adhihtan/categories')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(5);
        expect(res.body[0]).toHaveProperty('label', 'ကိုးနဝင်း');
      });

    await request(app.getHttpServer())
      .get('/adhihtan/categories/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.value).toBe(1);
        expect(res.body.detailTabs.instructions).toHaveLength(5);
      });

    await request(app.getHttpServer())
      .get('/adhihtan/categories/1/schedules')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(9);
      });

    await request(app.getHttpServer())
      .get('/adhihtan/categories/1/schedules/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.value).toBe(1);
        expect(res.body.datasources).toHaveLength(9);
      });

    await request(app.getHttpServer())
      .get('/adhihtan/categories/5/schedules')
      .expect(200)
      .expect([]);

    await request(app.getHttpServer())
      .get('/adhihtan/spells')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(35);
      });

    await request(app.getHttpServer())
      .get('/adhihtan/spells/1')
      .expect(200)
      .expect({
        id: 1,
        key: 'default_spell_1',
        name: 'ဗုဒ္ဓံ သရဏံ ဂစ္ဆမိ',
      });
  });

  it('/adhihtan should validate category, level, and spell identifiers', async () => {
    await request(app.getHttpServer())
      .get('/adhihtan/categories/not-a-number')
      .expect(400);

    await request(app.getHttpServer())
      .get('/adhihtan/categories/999')
      .expect(404);

    await request(app.getHttpServer())
      .get('/adhihtan/categories/1/schedules/999')
      .expect(404);

    await request(app.getHttpServer()).get('/adhihtan/spells/999').expect(404);
  });

  it('/swagger (GET) should serve documentation assets', async () => {
    await request(app.getHttpServer())
      .get('/swagger')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(res.text).toContain('SF Pro Text');
        expect(res.text).toContain('--font-mono');
        expect(res.text).toContain(
          '.swagger-ui .info .title small.version-stamp',
        );
        expect(res.text).toContain('background: transparent !important');
      });

    await request(app.getHttpServer())
      .get('/swagger-json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.info.title).toContain('မြန်မာ');
        expect(res.body.info.description).toContain('မြန်မာ့ယဉ်ကျေးမှု');
        const expectedProjectTags = [
          'adhihtan | အဓိဋ္ဌာန်',
          'quotlets | အဆိုအမိန့်များ',
          'burmese-recipes | မြန်မာဟင်းချက်နည်းများ',
          'burmese-agriculture | မြန်မာ့စိုက်ပျိုးရေး',
          'phayar-sar | ဘုရားစာ',
          'nat-myat-si | နတ်မျက်စိ',
          'lat-htauk-bay-din | လက်ထောက်ဗေဒင်',
          'dream-dictionary | အိပ်မက်အဘိဓာန်',
          'movie-ticket-online-booking | ရုပ်ရှင်လက်မှတ် အွန်လိုင်းကြိုတင်မှာယူခြင်း',
          'pick-a-pile | ကတ်တစ်ပုံရွေး',
          'myanmar-proverbs | မြန်မာစကားပုံများ',
          'zodiac | ရာသီခွင်',
          'bagan-map | ပုဂံမြေပုံ',
          'birds | ငှက်များ',
          'myanmar-months | မြန်မာလများ',
          'snakes | မြွေများ',
          'art-gallery | အနုပညာပြခန်း',
          'incompatible-food | အတည့်မဖြစ်သော အစားအစာများ',
          'missing-historical-records | ပျောက်ဆုံးသမိုင်းမှတ်တမ်းများ',
        ];
        const projectTags = res.body.tags as Array<{
          name: string;
          description: string;
        }>;

        expect(projectTags.map((tag) => tag.name)).toEqual(expectedProjectTags);
        expect(
          projectTags.every(
            (tag) =>
              tag.description.includes('<span lang="my">') &&
              tag.description.includes('Source project') &&
              tag.description.includes('https://github.com/'),
          ),
        ).toBe(true);

        const adhihtanTag = res.body.tags.find(
          (tag: { name: string }) => tag.name === 'adhihtan | အဓိဋ္ဌာန်',
        );
        expect(adhihtanTag.description).toContain(
          'read-only adhihtan counting flow',
        );
        expect(adhihtanTag.description).toContain('<span lang="my">');

        const adhihtanPaths = Object.entries(res.body.paths).filter(([path]) =>
          path.startsWith('/adhihtan/'),
        );
        expect(adhihtanPaths).toHaveLength(7);
        expect(
          adhihtanPaths.every(([, operations]) =>
            Object.values(
              operations as Record<string, { description?: string }>,
            ).every((operation) =>
              operation.description?.includes('<span lang="my">'),
            ),
          ),
        ).toBe(true);
      });

    await request(app.getHttpServer())
      .get('/assets/brand-logo.svg')
      .expect(200)
      .expect('Content-Type', /svg/)
      .expect((res) => {
        const logoSvg = Buffer.from(res.body).toString('utf8');
        expect(logoSvg).toContain('#0d182b');
        expect(logoSvg).toContain('#43d3ff');
        expect(logoSvg).toContain('#f3f7ff');
      });

    await request(app.getHttpServer())
      .get('/assets/social-card.png')
      .expect(200)
      .expect('Content-Type', /png/);

    await request(app.getHttpServer())
      .get('/site.webmanifest')
      .expect(200)
      .expect('Content-Type', /json|manifest/);

    await request(app.getHttpServer())
      .get('/favicon.ico')
      .expect(200)
      .expect('Content-Type', /image/);

    await request(app.getHttpServer())
      .get('/swagger/swagger-ui.css')
      .expect(200)
      .expect('Content-Type', /css/);

    await request(app.getHttpServer())
      .get('/swagger/swagger-ui-bundle.js')
      .expect(200)
      .expect('Content-Type', /javascript/);

    await request(app.getHttpServer())
      .get('/scalar')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(res.text).toContain('Scalar API Reference');
        expect(res.text).toContain('"withDefaultFonts":false');
        expect(res.text).toContain('--scalar-font');
        expect(res.text).toContain('မြန်မာ API ကိုးကားချက်');
      });
  });

  it('should return absolute image URLs using request host and protocol', async () => {
    const expectedOrigin = 'https://api.example.test';
    const forwardedRequest = (path: string) =>
      request(app.getHttpServer())
        .get(path)
        .set('Host', 'api.example.test')
        .set('X-Forwarded-Proto', 'https');

    await forwardedRequest('/birds')
      .expect(200)
      .expect((res) => {
        expect(res.body[0].ImagePath).toBe(
          `${expectedOrigin}/birds/img/1_Orange-belliedLeafbird.jpg`,
        );
      });

    await forwardedRequest('/snakes')
      .expect(200)
      .expect((res) => {
        expect(res.body[0].ImageUrl).toBe(`${expectedOrigin}/snakes/1.jpg`);
      });

    await forwardedRequest('/pick-a-pile/1')
      .expect(200)
      .expect((res) => {
        expect(res.body[0].AnswerImageUrl).toBe(
          `${expectedOrigin}/articles/1/1.jpg`,
        );
      });

    await forwardedRequest('/art-gallery')
      .expect(200)
      .expect((res) => {
        expect(res.body[0].ArtImageUrl).toBe(
          `${expectedOrigin}/art-gallery/1.jpg`,
        );
      });

    await forwardedRequest('/quotlets')
      .expect(200)
      .expect((res) => {
        expect(res.body[0].ImageUrl).toBe(
          `${expectedOrigin}/quotlets/img/1/action%20is%20fundamental%20key%2C%20to%20all%20success.jpg`,
        );
      });

    await forwardedRequest('/zodiac')
      .expect(200)
      .expect((res) => {
        expect(res.body[0].ZodiacSignImageUrl).toBe(
          `${expectedOrigin}/zodiac/images/zodiac-signs/h1.svg`,
        );
        expect(res.body[0].ElementImageUrl).toBe(
          `${expectedOrigin}/zodiac/images/elements/fire.png`,
        );
        expect(res.body[8].ZodiacSign2ImageUrl).toBe(
          `${expectedOrigin}/zodiac/images/zodiac-signs-2/sagittarius.jpg`,
        );
      });
  });

  it('should serve static image assets from public', async () => {
    await request(app.getHttpServer())
      .get('/birds/img/1_Orange-belliedLeafbird.jpg')
      .expect(200);

    await request(app.getHttpServer())
      .get(
        '/quotlets/img/1/action%20is%20fundamental%20key%2C%20to%20all%20success.jpg',
      )
      .expect(200);

    await request(app.getHttpServer())
      .get('/zodiac/images/zodiac-signs-2/sagittarius.jpg')
      .expect(200);
  });
});
