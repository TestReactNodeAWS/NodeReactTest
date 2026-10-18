# Local setup

## Tools

Already needed: Git, Node 22 (see `.node-version`), Docker Desktop.

For the Kubernetes stages:

```powershell
winget install Helm.Helm Kubernetes.kind Kubernetes.kubectl
```

Optional: `winget install nektos.act` to run GitHub workflows locally, and `winget install Amazon.AWSCLI` for stage 6.

## 1. Run the stack with Docker Compose

```bash
docker compose -f docker/docker-compose.yml up --build
curl http://localhost:5010/health
curl -X POST -H "Content-Type: application/json" -d '{"name":"first"}' http://localhost:5010/api/v2/items
curl http://localhost:5010/api/v2/items
```

Add the web app: `docker compose -f docker/docker-compose.yml --profile web up --build`, then open http://localhost:8080.

Stop and wipe the database: `docker compose -f docker/docker-compose.yml down -v`.

## 2. Work on the backend

```bash
cd packages/backend
cp .env.example .env
docker compose -f ../../docker/docker-compose.yml up -d db liquibase
npm ci
npm run lint
npm test
npm run test:integrationTests
npm run dev
```

## 3. Work on the web app

```bash
docker compose -f docker/docker-compose.yml up -d   # backend on 5010
cd packages/web
npm ci
npm run lint
npm test
npm start                                           # http://localhost:3000
```

`npm start` sends `/api/v2` calls to the backend on port 5010 (the `proxy` setting in `package.json`).

## 4. Database changes

```bash
cd packages/liquibase
npm run deploy:local      # apply
npm run status            # what's pending
npm run test-rollbacks    # apply, roll back, apply again
```

## 5. Deploy to Kubernetes on your laptop

These are the same steps `deploy.yaml` runs in CI.

```bash
kind create cluster --name lab

TAG=local
for image in backend liquibase web; do
  docker build -f docker/$image.Dockerfile -t nodereacttest-$image:$TAG .
  kind load docker-image nodereacttest-$image:$TAG --name lab
done

kubectl apply -f deploy/kind/postgres.yaml
kubectl rollout status deployment/lab-postgres
kubectl create secret generic lab-backend-secrets \
  --from-literal=DB_HOST=lab-postgres --from-literal=DB_USER=lab --from-literal=DB_PASSWORD=lab

helm upgrade --install lab deploy/helm/app \
  -f deploy/helm/app/values-dev.yaml -f deploy/helm/app/values-kind.yaml \
  --set image.tag=$TAG --wait --atomic

kubectl port-forward service/lab-backend 5010:5010
curl http://localhost:5010/health

# In another terminal: the web app, and the settings its container wrote at start-up
kubectl port-forward service/lab-web 8080:80
curl http://localhost:8080/env-config.js
```

Useful while learning:

```bash
helm template lab deploy/helm/app -f deploy/helm/app/values-dev.yaml   # see the YAML Helm would apply
helm lint deploy/helm/app
kubectl get pods,jobs,services
kubectl logs deployment/lab-backend
kind delete cluster --name lab
```
