FROM node:24.11.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack for pnpm
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack install && pnpm install --frozen-lockfile

FROM node:24.11.0-alpine AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

# Enable corepack for pnpm
RUN corepack enable

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_SANITY_DATASET="production"
ENV NEXT_PUBLIC_SANITY_PROJECT_ID="zu8w3jsp"

# Build the Next.js app
RUN pnpm build

FROM node:24.11.0-alpine AS runner
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/sanity.config.ts ./
COPY --from=builder /app/sanity.ts ./
COPY --from=builder /app/typings.d.ts ./
COPY --from=builder /app/schemas ./schemas
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Create cache directories with proper permissions
RUN mkdir -p /app/.next/cache/images && \
    chown -R nextjs:nodejs /app/.next/cache

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]