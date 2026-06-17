import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
});
