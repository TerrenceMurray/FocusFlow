# Base image
FROM node:20-alpine AS base
WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app
RUN npm install -g pnpm@8.10.5

# -----------------------------
# DEVELOPMENT STAGE
# -----------------------------
FROM base AS development

COPY --chown=node:node package*.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . .

# RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app

USER node

# -----------------------------
# BUILD STAGE
# -----------------------------
FROM base AS build

COPY --chown=node:node package*.json pnpm-lock.yaml* ./
RUN pnpm install

COPY --chown=node:node . .
RUN pnpm build

# -----------------------------
# PRODUCTION STAGE
# -----------------------------
FROM base AS production
ENV NODE_ENV=production

COPY --chown=node:node package*.json pnpm-lock.yaml* ./
# RUN pnpm install --prod

COPY --chown=node:node --from=build /usr/src/app/dist ./dist
USER node

EXPOSE 3000

CMD ["node", "dist/main"]
