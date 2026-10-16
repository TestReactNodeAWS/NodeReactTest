import 'reflect-metadata';
import Container from 'typedi';
import { createApp } from './app';
import { config } from './config';
import { DatabasePool } from './persistence/DatabasePool';

const server = createApp().listen(config.port, () => {
  console.log(`${config.name} listening on ${config.port}`);
});

// Kubernetes sends SIGTERM before stopping a pod. Finish in-flight requests, then close the pool.
const shutdown = (): void => {
  server.close(async () => {
    await Container.get(DatabasePool).end();
    process.exit(0);
  });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
