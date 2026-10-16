# Backend

Express and TypeScript API, laid out like RTC's v2 backend so the same habits apply.

| Folder | What goes there | RTC equivalent |
| --- | --- | --- |
| `src/application/services/<Name>Service/` | Interface, `Impl`, and `__tests__` | Same |
| `src/persistence/repositories/<Name>Repository/` | Database access | Same |
| `src/domain/entities/` | Plain types | Same |
| `src/infrastructure/ExpressServer/controllers/` | Routes, mounted under `/api/v2` by `V2Controller` | Same |

Conventions carried over from RTC:
- Wire classes with typedi: `@Service()` plus `@Inject(() => Impl)`.
- Release every pool client in `finally`.
- Keep tests to core logic and risky paths.

## Scripts

| Script | Used by |
| --- | --- |
| `npm run build` | Dockerfile, PR check |
| `npm run lint` | PR check (type check + ESLint) |
| `npm test` | Local unit tests |
| `npm run test:pr` | PR check: only tests affected by the change |
| `npm run test:nightly` | After-merge run: all unit tests with coverage |
| `npm run test:integrationTests` | PR check and after-merge run, against a migrated Postgres |

## Run locally

```bash
cp .env.example .env
docker compose -f ../../docker/docker-compose.yml up -d db liquibase
npm ci
npm run dev
npm run test:integrationTests
```
