declare global {
  interface Window {
    __ENV__?: { [key: string]: string | undefined };
  }
}

// Settings are read when the app loads, not baked in at build time, so one image runs in every environment.
// window.__ENV__ comes from /env-config.js, which the web container writes at start-up
// (docker/resources/30-env-to-file.sh). process.env covers `npm start` with a local .env file.
export function getEnv(name: string, defaultValue: string): string {
  return window.__ENV__?.[name] ?? process.env[name] ?? defaultValue;
}

// Relative by default: `npm start` proxies it to the backend (see "proxy" in package.json),
// and in Kubernetes the ingress routes it.
export const API_ENDPOINT = getEnv('REACT_APP_API_URL', '/api/v2');

export const BUILD_VERSION = getEnv('REACT_APP_BUILD_VERSION', '');
