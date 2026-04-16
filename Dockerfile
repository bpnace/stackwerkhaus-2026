FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV STACKWERKHAUS_CMS_URL=https://cms.stackwerkhaus.de
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV STACKWERKHAUS_CMS_URL=https://cms.stackwerkhaus.de
COPY --from=builder /app ./
EXPOSE 3000
CMD ["sh", "-c", "corepack enable && corepack prepare pnpm@latest --activate && pnpm start --hostname 0.0.0.0 --port 3000"]
