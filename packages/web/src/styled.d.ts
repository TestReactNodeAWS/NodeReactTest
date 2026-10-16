import { Theme } from '@material-ui/core';
import 'styled-components';

// Tells TypeScript that styled-components' theme is the Material UI theme (see components/Theme.tsx).
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
