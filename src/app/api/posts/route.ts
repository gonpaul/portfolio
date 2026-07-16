import { NextRequest, NextResponse } from 'next/server';
import { db, initDB } from '@/lib/db';
import { extractExcerpt } from '@/lib/markdown';

// Initialize database
initDB();

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100) || 'post';
}

function getCorsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin');
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ?.split(',')
    .map(o => o.trim())
    .filter(o => o) || [];
  
  // REQUIRE ALLOWED_ORIGINS to be set - no fallback
  if (allowedOrigins.length === 0) {
    console.warn('ALLOWED_ORIGINS not configured - CORS will not allow any origins');
  }
  
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  
  return headers;
}

export async function POST(request: NextRequest) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: getCorsHeaders(request) });
  }

  // Check authentication
  const authHeader = request.headers.get('authorization');
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || !authHeader || authHeader.replace(/^Bearer\\s+/i, '') !== apiKey) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Valid API key required' },
      { status: 401, headers: getCorsHeaders(request) }
    );
  }

  try {
    const body = await request.json();
    const { title, content, category } = body;

    // Validate required fields (slug auto-generated from title)
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title and content are required' },
        { status: 400, headers: getCorsHeaders(request) }
      );
    }

    // Auto-generate slug from title
    const slug = generateSlug(title);

    // Default to 'technology' category if not provided
    const validCategories = ['business', 'technology', 'philosophy', 'science', 'life'] as const;
    const finalCategory = (category && validCategories.includes(category)) ? category : 'technology';

    // Parse markdown to get excerpt
    const excerpt = extractExcerpt(content);

    // Insert post
    const stmt = db.prepare(`
      INSERT INTO posts (slug, title, content, excerpt, category)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(slug, title, content, excerpt, finalCategory);

    return NextResponse.json({
      id: result.lastInsertRowid,
      slug,
      title,
      category: finalCategory,
      message: 'Post created successfully',
    }, { headers: getCorsHeaders(request) });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getCorsHeaders(request) }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(request) });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = `
      SELECT id, slug, title, excerpt, category, published_at, created_at
      FROM posts
    `;
    const params: any[] = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY published_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const stmt = db.prepare(query);
    const posts = stmt.all(...params);

    return NextResponse.json({ posts }, { headers: getCorsHeaders(request) });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getCorsHeaders(request) }
    );
  }
}