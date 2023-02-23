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
#COPY DOCKERFILE ./DOCKERFILE

FROM node:16-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./

USER nextjs
CMD ["node", "server.js"]
