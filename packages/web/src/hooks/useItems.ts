import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createItem, getItems } from '../requests/items';

const ITEMS_KEY = 'items';

export const useItems = () => useQuery(ITEMS_KEY, getItems);

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation(createItem, {
    onSuccess: () => queryClient.invalidateQueries(ITEMS_KEY),
  });
};
