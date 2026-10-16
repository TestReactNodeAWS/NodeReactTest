# Build from the repo root: docker build -f docker/backend.Dockerfile .
ARG NODE_IMAGE=node:22.23.3-bookworm-slim

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
# Apply Debian security fixes released since the base image was built.
RUN apt-get update && apt-get upgrade -y --no-install-recommends && rm -rf /var/lib/apt/lists/*
COPY packages/backend/package.json packages/backend/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force \
  # The app only needs node at runtime. Removing npm and corepack removes their bundled
  # dependencies (tar, glob, minimatch...), which are what the image scan flags.
  && rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
            /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack
COPY --from=builder /app/build ./build
USER node
EXPOSE 5010
CMD ["node", "build/server.js"]
