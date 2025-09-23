import request from 'supertest';
import app from '../src/server.js';


let token;

describe('Schedulr API', () => {
  it('health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('login', async () => {
    const res = await request(app).post('/auth/login').send({ email: 'admin@example.com', password: 'admin123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    token = res.body.token;
  });

  it('generate timetable choices', async () => {
    const res = await request(app).post('/timetable/generate').set('Authorization', `Bearer ${token}`).send({ choices: 2 });
    expect(res.status).toBe(200);
    expect(res.body.choices.length).toBe(2);
  });
});


