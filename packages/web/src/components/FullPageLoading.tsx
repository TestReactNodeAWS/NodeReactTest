import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

const Centre = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const FullPageLoading: React.FC = () => (
  <Centre>
    <CircularProgress aria-label="Loading" />
  </Centre>
);
