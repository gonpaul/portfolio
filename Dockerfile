FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# Create data directory for persistent storage
RUN mkdir -p /app/data
# Install sqlite3 CLI
RUN apt-get update && \
    apt-get install -y --no-install-recommends sqlite3 && \
    rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
RUN npm prune --omit=dev
EXPOSE 9010
CMD ["sh", "-c", "PORT=9010 npm run start"]