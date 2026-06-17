import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApiDocumentation } from './../src/docs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
  });
});
