import '@testing-library/jest-dom';
import { setLogger } from 'react-query';

// Failed requests in tests are expected; keep react-query from printing them.
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
