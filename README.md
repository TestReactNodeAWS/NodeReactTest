# NodeReactTest: RTC pipeline lab

A small app with the same shape as Realtime Conveyancer (`realtime-core`), used to learn and rebuild the CI/CD that RTC runs on SkyU today, with GitHub Actions, Docker, Helm and Kubernetes instead.

None of the RTC code is copied here. The layout, script names, settings names and pipeline steps mirror RTC so that what you learn here carries straight over.

## Who works where

| Part | Folder | Owner |
| --- | --- | --- |
| Backend API (Node, TypeScript, Express) | `packages/backend` | Backend developer |
| Database changes (Liquibase) | `packages/liquibase` | Backend developer |
| Web app (React) | `packages/web` | Frontend developer (see `packages/web/README.md` for what the pipelines expect) |
| Docker images and local stack | `docker/` | Shared |
| Pipelines | `.github/workflows/` | Shared |
| Kubernetes deployment (Helm chart) | `deploy/helm/app` | Shared |

## Layout

```
.github/workflows/
  pull-request.yaml      PR check (like RTC's pull-request.yaml)
  after-merge.yaml       Full tests after merge (like RTC's nightly-unit-test-run.yml)
  reusable-test.yaml     Shared test jobs used by the two above
  build-images.yaml      Build, scan and push images (like SkyU's build-and-push)
  deploy.yaml            Deploy with Helm to a throwaway Kubernetes cluster (like SkyU's deploy)
packages/
  backend/               API, unit tests, integration tests
  liquibase/             Database changelogs
  web/                   Frontend (owned by the frontend developer)
docker/                  Dockerfiles, docker-compose.yml, nginx and entrypoint scripts
deploy/
  helm/app/              Helm chart: backend, web, Liquibase job, ingress
  kind/                  Throwaway Postgres for local and CI clusters
docs/
  RTC-MAPPING.md         Which file here matches which RTC or SkyU piece
  LOCAL-SETUP.md         Tools to install and how to run everything locally
  STAGES.md              The learning stages, what is done and what is next
```

## Quick start

```bash
# Database, migrations and backend, all in Docker
docker compose -f docker/docker-compose.yml up --build

# Then
curl http://localhost:5010/health
curl http://localhost:5010/api/v2/items
```

Full instructions, including Kubernetes on your laptop, are in [docs/LOCAL-SETUP.md](docs/LOCAL-SETUP.md).

## Repo settings this lab assumes

- Default branch `main`, protected, with the "Pull Request - Validate PR" checks required before merging.
- Release branches named `releases/YYYY.NN.MM.DD`, like RTC.
- GitHub Packages (GHCR) for images while learning. Moving to AWS ECR is a later stage.
- GitHub Environments (dev, staging, prod) need a public repo, or a paid plan for a private one. See [docs/STAGES.md](docs/STAGES.md).
