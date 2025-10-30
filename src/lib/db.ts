import Database from 'better-sqlite3';
import path from 'path';

// Use environment variable for DB path, fallback to current directory
const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'blog.db');

// Ensure directory exists if DB_PATH is set
if (process.env.DB_PATH) {
  const dbDir = path.dirname(dbPath);
  const fs = await import('fs');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
}

const db = new Database(dbPath);

// Initialize database
export function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      category TEXT NOT NULL,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    INSERT OR IGNORE INTO categories (name, slug) VALUES 
      ('Business', 'business'),
      ('Technology', 'technology'),
      ('Philosophy', 'philosophy'),
      ('Science', 'science'),
      ('Life', 'life');
  `);
}

export { db };
