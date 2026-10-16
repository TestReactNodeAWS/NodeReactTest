import { Router } from 'express';
import { config } from '../../../config';

// Kubernetes readiness and liveness probes call this. Keep it free of database calls
// so a slow database doesn't restart healthy pods.
export const healthController = (): Router => {
  const router = Router();
  router.get('/health', (_req, res) => {
    res.json({ status: 'ok', app: config.name });
  });
  return router;
};
