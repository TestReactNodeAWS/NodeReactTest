import { Router } from 'express';
import Container from 'typedi';
import { ItemServiceImpl } from '../../../application/services/ItemService/ItemServiceImpl';
import { itemsController } from './ItemsController';

// Mounted at /api/v2, like RTC. Add new controllers here.
// RTC mounts webhooks before its auth check; do the same when auth is added.
export const v2Controller = (): Router => {
  const router = Router();
  router.use('/items', itemsController(Container.get(ItemServiceImpl)));
  return router;
};
