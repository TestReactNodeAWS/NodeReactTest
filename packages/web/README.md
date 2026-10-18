# Web

A small React app set up the same way as RTC's `packages/web`, so the pipelines, Docker image and settings behave the same.

## Same as RTC

| Piece | Here and in RTC |
| --- | --- |
| Build tool | Create React App (`react-scripts`), output in `build/` |
| Libraries | React 16, Material UI v4, styled-components, react-query v3, react-router v5, axios, TypeScript |
| Layout | `src/index.tsx` → `AppProviders.tsx` → `App.tsx`, then `pages/`, `components/`, `hooks/`, `requests/`, and `config.ts` for settings |
| Tests | Jest through `react-scripts test`, with Testing Library, in `__tests__` folders |
| Lint | `npm run lint` runs the type check, then ESLint |
| Settings | `REACT_APP_*` names, read at start-up, not baked in at build time |
| Local API | `npm start` proxies API calls to the backend on port 5010 |

## Different from RTC

- No login. RTC uses Auth0; the lab backend has no authentication.
- No generated API types. RTC generates them from `packages/api-docs`; here they're in `src/types.ts`.
- Settings come from `window.__ENV__` in `/env-config.js` (RTC: `window._env_` in `/env.js`). Same idea, different names.
- No Enzyme. RTC still has some Enzyme tests; Testing Library is used for everything here.

## Commands

```bash
npm ci
npm start              # http://localhost:3000, needs the backend on 5010 (see docs/LOCAL-SETUP.md)
npm run lint
npm test               # once, with coverage (what CI runs)
npm run test:dev       # watch mode
npm run build          # writes build/
```

## Settings

`src/config.ts` reads each setting from `window.__ENV__`, then `process.env`, then a default:

| Setting | Default | What it is |
| --- | --- | --- |
| `REACT_APP_API_URL` | `/api/v2` | Where the backend API is |
| `REACT_APP_BUILD_VERSION` | empty | Shown in the top bar when set |

In the Docker image, `docker/resources/30-env-to-file.sh` writes every `REACT_APP_*` environment variable into `/env-config.js` when the container starts. Helm sets them from `web.env` in `deploy/helm/app/values-<env>.yaml`, so the same image goes from dev to staging to prod.

## Backend API it uses

- `GET /api/v2/items`
- `POST /api/v2/items` with `{ "name": "..." }`
