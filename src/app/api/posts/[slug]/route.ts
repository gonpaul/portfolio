import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseMarkdown } from '@/lib/markdown';
import { protectApiRoute } from '@/lib/auth';

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
  // Check authentication
  const authResponse = protectApiRoute(request);
  if (authResponse) {
    return authResponse;
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
        { status: 404 }
      );
    }

    // Parse markdown content
    const { html, frontmatter } = parseMarkdown(post.content);

    return NextResponse.json({
      ...post,
      html,
      frontmatter
    });

  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
