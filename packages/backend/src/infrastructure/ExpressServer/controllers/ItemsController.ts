import { NextFunction, Request, Response, Router } from 'express';
import { ItemService } from '../../../application/services/ItemService/ItemService';

export const itemsController = (items: ItemService): Router => {
  const router = Router();

  router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await items.list());
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json(await items.add(req.body?.name));
    } catch (error) {
      next(error);
    }
  });

  return router;
};
