import request from 'supertest';
import { app } from '../src/main';

describe('AppController (e2e)', () => {
  
  beforeEach(async () => {
    await app.init();
  });

  it('/ (GET)', () => request(app.getHttpServer())
    .get('/')
    .expect(200)
    .expect('OK'));

});

