# How this lab maps to RTC and SkyU

Every file here stands in for a piece of `realtime-core` or of SkyU. When you've got a piece working here, the matching RTC change is the same idea at a bigger scale.

## Repo layout

| Lab | RTC (`realtime-core`) | Notes |
| --- | --- | --- |
| `packages/backend` | `packages/backend` | Same v2 layering, typedi wiring, `/api/v2` routes, port 5010, `.env` names |
| `packages/liquibase` | `packages/liquibase` | Same rules (new file per change, every changeset has a rollback). RTC wraps Liquibase in a Node CLI; here the Docker image runs it directly |
| `packages/web` | `packages/web` | Same Create React App setup, libraries and `REACT_APP_*` settings. No Auth0 or generated API types; see `packages/web/README.md` |
| `docker/*.Dockerfile` | `docker/backend.Dockerfile`, `web.Dockerfile`, `liquibase.Dockerfile` | Same three images |
| `docker/resources/30-env-to-file.sh` | `docker/resources/21-react-env-to-file.sh` | Lets one web image be promoted through every environment |
| `docker/docker-compose.yml` | `docker/docker-compose.yml` | Local stack |

## Pipelines

| Lab workflow | Replaces in RTC | Who owns it in RTC today |
| --- | --- | --- |
| `pull-request.yaml` | `pull-request.yaml` (lint, unit tests, integration tests, builds) | RTC team |
| `pull-request.yaml` → Security scan | SkyU's 3 PR scan pipelines, which have never run | SkyU |
| `after-merge.yaml` | `nightly-unit-test-run.yml` | RTC team |
| `reusable-test.yaml` | Nothing; RTC copies the same jobs into both workflows | |
| `build-images.yaml` | SkyU's `build-and-push` job in all 35 environment pipelines, and RTC's `docker-build.yaml` release tags | SkyU and RTC |
| `deploy.yaml` | SkyU's `deploy` job and its deploy API | SkyU |
| *(stage 7)* `preview.yaml` | SkyU's test-environment pipelines (qe-testing, ms-outlook, ...) | SkyU |

## Things SkyU holds that the lab puts in the repo

| SkyU today | Lab | Real RTC version |
| --- | --- | --- |
| Kubernetes manifests | `deploy/helm/app/templates/` | Same chart, built from what's running in the EKS cluster |
| Per-environment settings ("config mounts") | `values-<env>.yaml` → ConfigMap | Same |
| Secret values | A Secret created outside the chart | AWS Secrets Manager + External Secrets Operator |
| The liquibase pipeline that runs first in each release | Helm pre-install / pre-upgrade Job | Same |
| Deploy order: liquibase → backend → web | The hook runs first; backend and web roll out together | Same |
| Prometheus alert rules | *(stage 8)* | `PrometheusRule` resources in the chart |
| Test environments | *(stage 7)* one Helm release per branch | Same, on EKS |
| The EKS cluster, ingress, DNS, certificates | kind on your laptop or in CI | Terraform or CDK (`realtime-cloud-infra`) |

## Environment names

| Lab values file | RTC SkyU environment | RTC URL |
| --- | --- | --- |
| `values-dev.yaml` | dev | `rtcaws-sit.rtcmgmt.com` |
| `values-staging.yaml` | staging | `rtcaws-qa.rtcmgmt.com` (also called Perftest) |
| `values-prod.yaml` | prod | `web.realtimeconveyancer.com.au` |
