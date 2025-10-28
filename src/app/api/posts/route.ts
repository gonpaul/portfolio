import { NextRequest, NextResponse } from 'next/server';
import { db, initDB } from '@/lib/db';
import { parseMarkdown, extractExcerpt } from '@/lib/markdown';
import { protectApiRoute } from '@/lib/auth';

// Initialize database
initDB();

export async function POST(request: NextRequest) {
  // Check authentication
  const authResponse = protectApiRoute(request);
  if (authResponse) {
    return authResponse;
  }
  try {
    const body = await request.json();
    const { slug, title, content, category } = body;

    // Validate required fields
    if (!slug || !title || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['business', 'technology', 'philosophy', 'science', 'life'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Parse markdown to get excerpt
    const excerpt = extractExcerpt(content);

    // Insert post
    const stmt = db.prepare(`
      INSERT INTO posts (slug, title, content, excerpt, category)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(slug, title, content, excerpt, category);

    return NextResponse.json({
      id: result.lastInsertRowid,
      slug,
      title,
      category,
      message: 'Post created successfully'
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
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

    return NextResponse.json({ posts });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
