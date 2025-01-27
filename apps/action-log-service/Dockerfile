FROM docker.io/node:lts-alpine AS deps
WORKDIR /usr/src/app

COPY dist/production/package.json ./
COPY dist/production/package-lock.json ./

RUN npm install --only=production --omit=dev

FROM docker.io/node:lts-alpine AS runner

ENV NODE_ENV production
ARG PORT=3002
ENV PORT=$PORT

WORKDIR /usr/src/app

COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node dist/production/ ./

RUN chown node:node ./

USER node

EXPOSE ${PORT}

CMD ["node", "main.js"]
