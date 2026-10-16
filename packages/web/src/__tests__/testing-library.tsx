import { render, RenderOptions } from '@testing-library/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { Theme } from '../components/Theme';

// Renders a component with the same providers as the app, and a fresh query cache per test.
export function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <Theme>
        <MemoryRouter>{ui}</MemoryRouter>
      </Theme>
    </QueryClientProvider>,
    options,
  );
}
