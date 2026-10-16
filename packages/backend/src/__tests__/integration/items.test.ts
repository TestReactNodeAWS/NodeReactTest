import request from 'supertest';
import Container from 'typedi';
import { createApp } from '../../app';
import { DatabasePool } from '../../persistence/DatabasePool';

// Runs against a real Postgres that Liquibase has migrated.
// CI starts one as a service container; locally use docker/docker-compose.yml.
describe('items API against the database', () => {
  afterAll(async () => {
    await Container.get(DatabasePool).end();
  });

  it('saves an item and lists it', async () => {
    const app = createApp();
    const name = `integration ${Date.now()}`;

    const created = await request(app).post('/api/v2/items').send({ name });
    expect(created.status).toBe(201);

    const listed = await request(app).get('/api/v2/items');
    expect(listed.status).toBe(200);
    expect(listed.body.map((item: { name: string }) => item.name)).toContain(name);
  });

  it('rejects a blank name with 400', async () => {
    const response = await request(createApp()).post('/api/v2/items').send({ name: ' ' });
    expect(response.status).toBe(400);
  });
});
