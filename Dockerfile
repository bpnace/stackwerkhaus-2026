FROM node:22.23.4-alpine3.24 AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 STACKWERKHAUS_CMS_URL=https://cms.stackwerkhaus.de
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm test:content && pnpm test:drupal-richtext && pnpm test:baustellencheck
RUN pnpm build
FROM node:22.23.4-alpine3.24 AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN apk upgrade --no-cache && rm -rf /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack /opt/yarn*
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/content ./content
ENV STACKWERKHAUS_CMS_URL=https://cms.stackwerkhaus.de
EXPOSE 3000
CMD ["node", "server.js"]
