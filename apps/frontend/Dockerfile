FROM docker.io/node:lts-alpine

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ARG PORT=80
ENV PORT=$PORT

WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs dist/production/ ./
COPY --chown=nextjs:nodejs dist/production/.next/static ./.next/standalone/apps/frontend/dist/production/.next/static
COPY --chown=nextjs:nodejs dist/production/public ./.next/standalone/apps/frontend/public

RUN chown nextjs:nodejs ./

USER nextjs

EXPOSE ${PORT}

CMD HOSTNAME=0.0.0.0 node ./.next/standalone/apps/frontend/server.js
