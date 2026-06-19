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

  it('/swagger (GET) should serve documentation assets', async () => {
    await request(app.getHttpServer())
      .get('/swagger')
      .expect(200)
      .expect('Content-Type', /html/);

    await request(app.getHttpServer())
      .get('/swagger-json')
      .expect(200)
      .expect('Content-Type', /json/);

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
