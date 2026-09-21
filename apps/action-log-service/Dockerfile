FROM docker.io/node:26.9.0-alpine AS deps
WORKDIR /usr/src/app

COPY dist/production/package.json ./
COPY dist/production/pnpm-lock.yaml ./
RUN npm install --global pnpm@9.15.5 \
  && pnpm install --prod --frozen-lockfile

FROM docker.io/node:26.9.0-alpine AS runner

ENV NODE_ENV=production
ARG PORT=3002
ENV PORT=${PORT}

WORKDIR /usr/src/app

COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node dist/production/ ./

USER node

EXPOSE ${PORT}

CMD ["node", "main.js"]
