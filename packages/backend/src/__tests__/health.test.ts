import request from 'supertest';
import { createApp } from '../app';

describe('GET /health', () => {
  it('reports ok without touching the database', async () => {
    const response = await request(createApp()).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
