FROM node:20-bookworm-slim AS builder
WORKDIR /app
# Install build dependencies for better-sqlite3 native module
RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# -------- Runner: production server using next start --------
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=9010
# DB_PATH for persistent database (docker volume mounted at /app/data)
ENV DB_PATH=/app/data/blog.db
# CORS origins - REQUIRED for osbias → personal-website communication
# Override via docker -e ALLOWED_ORIGINS=... or in .env
# ENV ALLOWED_ORIGINS=http://localhost:9010,https://gonpaul.com,https://os.gonpaul.com

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
COPY --from=builder /app/blog.db ./blog.db

# Mount point for persistent database (use: docker run -v personal-website-data:/app/data)
VOLUME ["/app/data"]

EXPOSE 9010
CMD ["npm", "start"]
