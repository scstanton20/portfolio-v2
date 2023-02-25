FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN NODE_ENV=production npm install --frozen-lockfile

FROM node:18-alpine As builder
ENV NODE_ENV=production

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

COPY next.config.js ./next.config.js
COPY sanity.js ./sanity.js
COPY src ./src
COPY public ./public
COPY .next/static ./.next/statis
COPY .next/standalone ./.next/standalone

RUN npm run build --production

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]