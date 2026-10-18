import { Button, CircularProgress, List, ListItem, ListItemText, Paper, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import { useCreateItem, useItems } from '../../hooks/useItems';
import { getErrorMessage } from '../../requests/errors';

const AddForm = styled.form`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)}px;
  margin: ${({ theme }) => theme.spacing(3, 0)};
`;

const ItemsPage: React.FC = () => {
  const items = useItems();
  const createItem = useCreateItem();
  const [name, setName] = React.useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createItem.mutate(name, { onSuccess: () => setName('') });
  };

  return (
    <>
      <Typography variant="h4" component="h1">
        Items
      </Typography>

      <AddForm onSubmit={onSubmit}>
        <TextField
          id="item-name"
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={createItem.isError}
          helperText={createItem.isError ? getErrorMessage(createItem.error) : undefined}
        />
        <Button type="submit" variant="contained" color="primary" disabled={createItem.isLoading}>
          Add
        </Button>
      </AddForm>

      {items.isLoading && <CircularProgress aria-label="Loading items" />}
      {items.isError && <Typography color="error">Could not load items: {getErrorMessage(items.error)}</Typography>}
      {items.data && items.data.length === 0 && <Typography color="textSecondary">No items yet.</Typography>}
      {items.data && items.data.length > 0 && (
        <Paper variant="outlined">
          <List aria-label="Items">
            {items.data.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText primary={item.name} secondary={new Date(item.createdAt).toLocaleString()} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

export default ItemsPage;
