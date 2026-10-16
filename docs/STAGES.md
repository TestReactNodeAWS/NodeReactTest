# Learning stages

Each stage rebuilds one piece of what RTC needs to leave SkyU. Do them in order; each one uses the last.

| Stage | Goal | Status | RTC piece it rehearses |
| --- | --- | --- | --- |
| 1. Sample app | Backend, Liquibase, Dockerfiles and local stack | Scaffolded. Frontend to be added in `packages/web` | Repo layout |
| 2. PR check | Lint, unit tests, integration tests on a migrated Postgres, image builds, security scan | Scaffolded | `pull-request.yaml`, plus the PR scan SkyU never ran |
| 3. After-merge tests | Full tests on `main` and release branches, Teams alert on failure | Scaffolded | `nightly-unit-test-run.yml` |
| 4. Build images | Build once, scan, push, tag with the commit SHA | Scaffolded (GHCR) | SkyU build-and-push |
| 5. Helm and Kubernetes | Chart with settings, secret, migration hook, probes, ingress; deployed to kind | Scaffolded | SkyU deploy and its manifests |
| 6. Real environments | GitHub Environments (approval on prod), AWS login with OIDC, ECR, EKS | To do | SkyU's dev, staging and prod pipelines |
| 7. Test environments | One Helm release and database per branch, removed when done | To do | SkyU's qe-testing, ms-outlook and other test environments |
| 8. Monitoring | Prometheus and Grafana, one latency alert sent to Teams | To do | SkyU's alert rules |

## Before stage 2 works on GitHub

- Give the developers **Write** access to the repo (today it's Read only).
- Protect `main` and make the "Pull Request - Validate PR" checks required.
- Commit `packages/backend/package-lock.json` (run `npm install` once in `packages/backend`).

## Before stage 6

- GitHub Environments on a **private** repo need a paid plan (the TestReactNodeAWS organisation is on the free plan). Either make the repo public or upgrade the organisation.
- Set up an AWS role GitHub can assume through OIDC, an ECR repository per image, and a sandbox EKS cluster, ideally in a separate AWS account from RTC's.

## Exercises

1. Break a unit test on a branch and watch the PR check fail.
2. Add a Liquibase changeset with no `<rollback>` and see `update-testing-rollback` fail.
3. Change a value in `values-dev.yaml`, run `helm template`, and find it in the ConfigMap.
4. Make the Liquibase job fail on purpose, deploy, and check the old backend keeps running.
5. Add a second endpoint end to end: changeset, repository, service, controller, tests.
