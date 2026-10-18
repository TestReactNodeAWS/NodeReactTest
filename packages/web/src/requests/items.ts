import { Item } from '../types';
import { requester } from './requester';

export async function getItems(): Promise<Item[]> {
  const { data } = await requester.get<Item[]>('/items');
  return data;
}

export async function createItem(name: string): Promise<Item> {
  const { data } = await requester.post<Item>('/items', { name });
  return data;
}
