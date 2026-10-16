# Build from the repo root: docker build -f docker/backend.Dockerfile .
ARG NODE_IMAGE=node:22.18.0-bookworm-slim

FROM ${NODE_IMAGE} AS builder
WORKDIR /app
COPY packages/backend/package.json packages/backend/package-lock.json ./
RUN npm ci
COPY packages/backend/tsconfig.json packages/backend/tsconfig.build.json ./
COPY packages/backend/src ./src
RUN npm run build

FROM ${NODE_IMAGE} AS release
ENV NODE_ENV=production
WORKDIR /app
COPY packages/backend/package.json packages/backend/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=builder /app/build ./build
USER node
EXPOSE 5010
CMD ["node", "build/server.js"]
