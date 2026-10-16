import { Item } from '../../../domain/entities/Item';

export interface ItemRepository {
  findAll(): Promise<Item[]>;
  create(name: string): Promise<Item>;
}
