import { getEnv } from '../config';

describe('getEnv', () => {
  afterEach(() => {
    delete window.__ENV__;
    delete process.env.REACT_APP_TEST_SETTING;
  });

  it('reads the value the container wrote to window.__ENV__', () => {
    window.__ENV__ = { REACT_APP_TEST_SETTING: 'from-container' };
    process.env.REACT_APP_TEST_SETTING = 'from-build';

    expect(getEnv('REACT_APP_TEST_SETTING', 'default')).toBe('from-container');
  });

  it('falls back to process.env, then the default', () => {
    expect(getEnv('REACT_APP_TEST_SETTING', 'default')).toBe('default');

    process.env.REACT_APP_TEST_SETTING = 'from-build';
    expect(getEnv('REACT_APP_TEST_SETTING', 'default')).toBe('from-build');
  });
});
