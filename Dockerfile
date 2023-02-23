FROM node:16-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN NODE_ENV=production npm install --frozen-lockfile

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

RUN --mount=type=secret,id=SENDGRID_API_KEY \
    --mount=type=secret,id=NEXT_PUBLIC_SANITY_PROJECT_ID \
    --mount=type=secret,id=NEXT_PUBLIC_SANITY_DATASET \
    --mount=type=secret,id=NEXT_PUBLIC_MATOMO_URL \
    --mount=type=secret,id=NEXT_PUBLIC_MATOMO_SITE_ID \
    export SENDGRID_API_KEY=$(cat /run/secrets/SENDGRID_API_KEY) && \
    export NEXT_PUBLIC_SANITY_PROJECT_ID=$(cat /run/secrets/NEXT_PUBLIC_SANITY_PROJECT_ID) && \
    export NEXT_PUBLIC_SANITY_DATASET=$(cat /run/secrets/NEXT_PUBLIC_SANITY_DATASET) && \
    export NEXT_PUBLIC_MATOMO_URL=$(cat /run/secrets/NEXT_PUBLIC_MATOMO_URL) && \
    export NEXT_PUBLIC_MATOMO_SITE_ID=$(cat /run/secrets/NEXT_PUBLIC_MATOMO_SITE_ID)
    
RUN npm run build


FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs
CMD ["node", "server.js"]
