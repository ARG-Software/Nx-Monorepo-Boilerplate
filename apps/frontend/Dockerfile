FROM docker.io/node:22.12.0-alpine

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ARG PORT=80
ENV PORT=${PORT}

WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs

COPY --chown=nextjs:nodejs dist/production/standalone ./
COPY --chown=nextjs:nodejs dist/production/static ./apps/frontend/dist/production/static
COPY --chown=nextjs:nodejs public ./apps/frontend/public

USER nextjs

EXPOSE ${PORT}

CMD ["node", "apps/frontend/server.js"]
