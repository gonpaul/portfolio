#!/bin/bash
BACKUP_DIR="/app/backups"
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp /app/data/blog.db "$BACKUP_DIR/blog_${TIMESTAMP}.db"
# Keep only last 7 days of backups
find "$BACKUP_DIR" -name "blog_*.db" -mtime +7 -delete