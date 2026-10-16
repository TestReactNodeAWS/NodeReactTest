import { Item } from '../../../../domain/entities/Item';
import { ItemRepository } from '../../../../persistence/repositories/ItemRepository/ItemRepository';
import { ValidationError } from '../../../errors/ValidationError';
import { ItemServiceImpl, MAX_NAME_LENGTH } from '../ItemServiceImpl';

const fakeRepository = (): jest.Mocked<ItemRepository> => ({
  findAll: jest.fn(),
  create: jest.fn(async (name: string): Promise<Item> => ({ id: 1, name, createdAt: new Date() })),
});

describe('ItemServiceImpl.add', () => {
  it('trims the name before saving', async () => {
    const repository = fakeRepository();
    const item = await new ItemServiceImpl(repository).add('  Contract  ');

    expect(repository.create).toHaveBeenCalledWith('Contract');
    expect(item.name).toBe('Contract');
  });

  it('rejects a blank name', () => {
    expect(() => new ItemServiceImpl(fakeRepository()).add('   ')).toThrow(ValidationError);
  });

  it('rejects a name that is too long', () => {
    expect(() => new ItemServiceImpl(fakeRepository()).add('x'.repeat(MAX_NAME_LENGTH + 1))).toThrow(ValidationError);
  });
});
