import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { BUILD_VERSION } from '../config';

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing(4, 0)};
`;

export const Layout: React.FC = ({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="span">
          Lab
        </Typography>
        {BUILD_VERSION && (
          <Typography variant="caption" component="span" style={{ marginLeft: 'auto' }}>
            {BUILD_VERSION}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
    <Main>
      <Container maxWidth="sm">
        <>{children}</>
      </Container>
    </Main>
  </>
);
