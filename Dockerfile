FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN NODE_ENV=production npm install --frozen-lockfile

<<<<<<< HEAD
FROM node:18-alpine As builder
ENV NODE_ENV=production

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

COPY . .
=======
FROM node:16-alpine As builder
ARG TARGETPLATFORM=linux/amd64
ENV NODE_ENV=production

WORKDIR /app
COPY next.config.js ./
COPY tailwind.config.js ./tailwind.config.js
COPY tsconfig.json ./tsconfig.json
COPY typings.d.ts ./typings.d.ts
COPY postcss.config.js ./postcss.config.js
COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY sanity.js ./sanity.js
COPY src ./src
COPY public ./public
COPY DOCKERFILE ./DOCKERFILE
>>>>>>> b6362d9 (trying to setup actions - fail)

ENV NEXT_PUBLIC_MATOMO_SITE_ID="1"
ENV NEXT_PUBLIC_MATOMO_URL="https://matomo.scstanton.dev"
ENV NEXT_PUBLIC_SANITY_DATASET="production"
ENV NEXT_PUBLIC_SANITY_PROJECT_ID="zu8w3jsp"

RUN --mount=type=secret,id=SENDGRID_API_KEY \
    export SENDGRID_API_KEY=$(cat /run/secrets/SENDGRID_API_KEY)


RUN npm ci && npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

<<<<<<< HEAD

COPY --from=builder /app/next.config.js ./
=======
>>>>>>> b6362d9 (trying to setup actions - fail)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

<<<<<<< HEAD
=======

>>>>>>> b6362d9 (trying to setup actions - fail)
USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]