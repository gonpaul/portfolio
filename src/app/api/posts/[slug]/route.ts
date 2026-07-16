import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseMarkdown } from '@/lib/markdown';

function getAllowedOrigins(): string[] {
  const envOrigins = process.env.ALLOWED_ORIGINS;
  // REQUIRE ALLOWED_ORIGINS - no fallback
  if (!envOrigins) {
    return [];
  }
  return envOrigins.split(',').map(o => o.trim()).filter(o => o);
}

function getCorsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin');
  const allowedOrigins = getAllowedOrigins();
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  
  return headers;
}

function validateApiKey(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || !authHeader) return false;
  return authHeader.replace(/^Bearer\s+/i, '') === apiKey;
}

interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  published_at: string;
  created_at: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: getCorsHeaders(request) });
  }

  // Check authentication
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Valid API key required' },
      { status: 401, headers: getCorsHeaders(request) }
    );
  }

  try {
    const { slug } = await params;

    const stmt = db.prepare(`
      SELECT id, slug, title, content, excerpt, category, published_at, created_at
      FROM posts 
      WHERE slug = ?
    `);

    const post = stmt.get(slug) as Post | undefined;

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404, headers: getCorsHeaders(request) }
      );
    }

    // Parse markdown content
    const { html, frontmatter } = parseMarkdown(post.content);

    return NextResponse.json(
      { ...post, html, frontmatter },
      { headers: getCorsHeaders(request) }
    );

  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getCorsHeaders(request) }
    );
  }
}