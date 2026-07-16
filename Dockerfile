FROM node:22-bookworm-slim AS builder
WORKDIR /app
# Install build dependencies for better-sqlite3 native module
RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*
# Create data directory in case DB_PATH is set during build
RUN mkdir -p /app/data
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# -------- Runner: production server using next start --------
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=9010
# DB_PATH and ALLOWED_ORIGINS only needed at runtime (not during build)

# Install SQLite libraries for better-sqlite3 runtime (required on Debian-based images)
RUN apt-get update && apt-get install -y --no-install-recommends \
  libsqlite3-dev \
  sqlite3 \
  && rm -rf /var/lib/apt/lists/*

# Create data directory for persistent database
RUN mkdir -p /app/data

# Copy production node_modules from builder (preserves native module binaries)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Mount point for persistent database (use: docker run -v personal-website-data:/app/data)
VOLUME ["/app/data"]

EXPOSE 9010
CMD ["npm", "start"]