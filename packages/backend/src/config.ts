import 'dotenv/config';

export interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl: boolean;
}

export interface AppConfig {
  env: string;
  name: string;
  port: number;
  corsAllowed: string[];
  db: DbConfig;
}

const toNumber = (value: string | undefined, fallback: number): number => (value ? parseInt(value, 10) : fallback);

export const config: AppConfig = {
  env: process.env.NODE_ENV ?? 'development',
  name: process.env.APP_NAME ?? 'lab-backend',
  port: toNumber(process.env.PORT, 5010),
  corsAllowed: (process.env.CORS_ALLOWED ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: toNumber(process.env.DB_PORT, 5432),
    user: process.env.DB_USER ?? 'lab',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'lab',
    ssl: process.env.DB_SSL_ENABLED === 'true',
  },
};
