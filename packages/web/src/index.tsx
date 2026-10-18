import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { AppProviders } from './AppProviders';

render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
);
