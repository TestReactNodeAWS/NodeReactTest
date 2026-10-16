import { Pool } from 'pg';
import { Service } from 'typedi';
import { config } from '../config';

@Service()
export class DatabasePool {
  readonly pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    ssl: config.db.ssl ? { rejectUnauthorized: false } : undefined,
  });

  async end(): Promise<void> {
    await this.pool.end();
  }
}
