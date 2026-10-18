import { createTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export const theme = createTheme({
  palette: {
    primary: { main: '#133459' },
  },
});

// Material UI and styled-components share one theme, so styled components can use theme.spacing() and colours.
export const Theme: React.FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <StyledThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </StyledThemeProvider>
  </MuiThemeProvider>
);
