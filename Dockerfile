FROM node:22.2.0-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22.2.0-alpine AS builder
ENV NODE_ENV=production

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

##ENV NEXT_PUBLIC_MATOMO_SITE_ID="1"
##ENV NEXT_PUBLIC_MATOMO_URL="https://matomo.scstanton.dev"
ENV NEXT_PUBLIC_SANITY_DATASET="production"
ENV NEXT_PUBLIC_SANITY_PROJECT_ID="zu8w3jsp"

#RUN npx next lint
RUN npx next build

FROM node:22.2.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]