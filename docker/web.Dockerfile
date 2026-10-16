# Build from the repo root: docker build -f docker/web.Dockerfile .
# Settings are not baked in. 30-env-to-file.sh writes REACT_APP_* variables into
# /env-config.js when the container starts, so one image works in every environment.
ARG NODE_IMAGE=node:22.18.0-bookworm-slim

FROM ${NODE_IMAGE} AS builder
WORKDIR /app
COPY packages/web/package.json packages/web/package-lock.json ./
RUN npm ci
COPY packages/web ./
RUN npm run build

FROM nginx:1.27-alpine AS release
# dist for Vite, build for Create React App.
ARG WEB_BUILD_DIR=dist
COPY docker/resources/nginx-spa.conf /etc/nginx/conf.d/default.conf
COPY docker/resources/30-env-to-file.sh /docker-entrypoint.d/30-env-to-file.sh
RUN chmod +x /docker-entrypoint.d/30-env-to-file.sh
COPY --from=builder /app/${WEB_BUILD_DIR} /usr/share/nginx/html
EXPOSE 80
