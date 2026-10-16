import { Inject, Service } from 'typedi';
import { Item } from '../../../domain/entities/Item';
import { ItemRepository } from '../../../persistence/repositories/ItemRepository/ItemRepository';
import { ItemRepositoryImpl } from '../../../persistence/repositories/ItemRepository/ItemRepositoryImpl';
import { ValidationError } from '../../errors/ValidationError';
import { ItemService } from './ItemService';

export const MAX_NAME_LENGTH = 100;

@Service()
export class ItemServiceImpl implements ItemService {
  constructor(@Inject(() => ItemRepositoryImpl) private readonly items: ItemRepository) {}

  list(): Promise<Item[]> {
    return this.items.findAll();
  }

  add(name: string): Promise<Item> {
    const trimmed = (name ?? '').trim();
    if (!trimmed) {
      throw new ValidationError('name is required');
    }
    if (trimmed.length > MAX_NAME_LENGTH) {
      throw new ValidationError(`name must be ${MAX_NAME_LENGTH} characters or fewer`);
    }
    return this.items.create(trimmed);
  }
}
