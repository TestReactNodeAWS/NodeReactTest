# Liquibase

Database changes for the lab, applied by the `lab-liquibase` Docker image.

RTC rules that apply here too:
- **Never edit a changeset that has been deployed.** Add a new file instead.
- **Every changeset has a `<rollback>`.** The PR check proves it with `update-testing-rollback`, which applies the changes, rolls them back, and applies them again.
- One file per change in `changelogs/updates/`, named `YYYY-MM-DD_NNN_what.xml`. They run in name order.

## Where it runs

| Where | How |
| --- | --- |
| Your laptop | `npm run deploy:local` (uses `docker/docker-compose.yml`) |
| PR check | Against a temporary Postgres, before the integration tests |
| Kubernetes | A Helm pre-install / pre-upgrade Job, so the database is updated before the new backend starts. This replaces the SkyU liquibase pipeline that RTC runs first in every release. |

## Settings

The image reads `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` and `DB_DATABASE`, the same names the backend uses. See `.env.example`.
