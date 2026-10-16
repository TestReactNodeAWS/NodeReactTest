import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { ValidationError } from './application/errors/ValidationError';
import { config } from './config';
import { healthController } from './infrastructure/ExpressServer/controllers/HealthController';
import { v2Controller } from './infrastructure/ExpressServer/controllers/V2Controller';

export const createApp = (): express.Express => {
  const app = express();
  app.use(cors({ origin: config.corsAllowed }));
  app.use(express.json());

  app.use(healthController());
  app.use('/api/v2', v2Controller());

  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }
    // Client errors raised by Express middleware, such as malformed JSON bodies.
    const status = (error as { status?: number }).status;
    if (status && status >= 400 && status < 500) {
      res.status(status).json({ error: 'Bad request' });
      return;
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
};
