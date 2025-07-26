# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@8.10.5
RUN apk add --no-cache libc6-compat

# -----------------------------
# Dependencies (shared)
# -----------------------------
FROM base AS deps
COPY package*.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install

# -----------------------------
# Development
# -----------------------------
FROM base AS development
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install
COPY . .
EXPOSE 3000

# -----------------------------
# Build
# -----------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# -----------------------------
# Production
# -----------------------------
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 node

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:nodejs /app/.next/standalone ./
COPY --from=builder --chown=node:nodejs /app/.next/static ./.next/static

USER node
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
