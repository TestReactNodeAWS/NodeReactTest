# Web (frontend developer)

This folder is for the React app. The pipelines and Docker image are already set up and switch on automatically once `packages/web/package.json` exists.

## What the pipelines expect

| Requirement | Why |
| --- | --- |
| `package.json` and `package-lock.json` in this folder | CI runs `npm ci` here |
| `npm run build` writes the site to `dist/` (Vite) or `build/` (Create React App) | The Docker image copies it into nginx. Set `WEB_BUILD_DIR` in `docker/web.Dockerfile` if it isn't `dist` |
| `npm run lint` and `npm test` (optional) | The PR check runs them if they exist |
| Settings read at runtime from `window.__ENV__`, not baked in at build time | So one image can be promoted from dev to staging to prod, like RTC |

## Runtime settings

At container start, `docker/resources/30-env-to-file.sh` writes every `REACT_APP_*` environment variable into `/env-config.js`:

```js
window.__ENV__ = { "REACT_APP_API_URL": "https://.../api/v2" };
```

Load it before the app in `index.html`, and read settings from it:

```html
<script src="/env-config.js"></script>
```

```ts
const apiUrl = window.__ENV__?.REACT_APP_API_URL ?? 'http://localhost:5010/api/v2';
```

RTC uses the `REACT_APP_` prefix too (for example `REACT_APP_API_URL`, `REACT_APP_AUTH0_DOMAIN`), so the names carry over.

## Backend API

- `GET /health`
- `GET /api/v2/items`
- `POST /api/v2/items` with `{ "name": "..." }`

The local stack runs the backend at `http://localhost:5010`, and its CORS settings already allow `http://localhost:3000` and `http://localhost:8080`.
