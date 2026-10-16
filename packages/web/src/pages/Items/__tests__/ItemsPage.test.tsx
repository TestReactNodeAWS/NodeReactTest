import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../__tests__/testing-library';
import { createItem, getItems } from '../../../requests/items';
import ItemsPage from '../ItemsPage';

jest.mock('../../../requests/items');

const mockGetItems = getItems as jest.MockedFunction<typeof getItems>;
const mockCreateItem = createItem as jest.MockedFunction<typeof createItem>;

describe('ItemsPage', () => {
  it('lists the items from the API', async () => {
    mockGetItems.mockResolvedValue([
      { id: 1, name: 'first', createdAt: '2026-10-16T00:00:00.000Z' },
      { id: 2, name: 'second', createdAt: '2026-10-16T00:00:00.000Z' },
    ]);

    renderWithProviders(<ItemsPage />);

    expect(await screen.findByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('says so when there are no items', async () => {
    mockGetItems.mockResolvedValue([]);

    renderWithProviders(<ItemsPage />);

    expect(await screen.findByText('No items yet.')).toBeInTheDocument();
  });

  it('adds an item and clears the box', async () => {
    mockGetItems.mockResolvedValue([]);
    mockCreateItem.mockResolvedValue({ id: 3, name: 'new one', createdAt: '2026-10-16T00:00:00.000Z' });

    renderWithProviders(<ItemsPage />);
    const nameBox = screen.getByLabelText('Name');
    userEvent.type(nameBox, 'new one');
    userEvent.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => expect(nameBox).toHaveValue(''));
    expect(mockCreateItem).toHaveBeenCalledWith('new one');
  });

  it('says why the items could not load', async () => {
    mockGetItems.mockRejectedValue(new Error('Network Error'));

    renderWithProviders(<ItemsPage />);

    expect(await screen.findByText('Could not load items: Network Error')).toBeInTheDocument();
  });
});
