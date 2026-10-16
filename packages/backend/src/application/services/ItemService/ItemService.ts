import { Item } from '../../../domain/entities/Item';

export interface ItemService {
  list(): Promise<Item[]>;
  add(name: string): Promise<Item>;
}
