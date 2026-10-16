import { Inject, Service } from 'typedi';
import { Item } from '../../../domain/entities/Item';
import { DatabasePool } from '../../DatabasePool';
import { ItemRepository } from './ItemRepository';

interface ItemRow {
  id: string;
  name: string;
  created_at: Date;
}

const toItem = (row: ItemRow): Item => ({ id: Number(row.id), name: row.name, createdAt: row.created_at });

@Service()
export class ItemRepositoryImpl implements ItemRepository {
  constructor(@Inject(() => DatabasePool) private readonly db: DatabasePool) {}

  async findAll(): Promise<Item[]> {
    const client = await this.db.pool.connect();
    try {
      const result = await client.query<ItemRow>('SELECT id, name, created_at FROM items ORDER BY id');
      return result.rows.map(toItem);
    } finally {
      client.release();
    }
  }

  async create(name: string): Promise<Item> {
    const client = await this.db.pool.connect();
    try {
      const result = await client.query<ItemRow>(
        'INSERT INTO items (name) VALUES ($1) RETURNING id, name, created_at',
        [name],
      );
      return toItem(result.rows[0]);
    } finally {
      client.release();
    }
  }
}
