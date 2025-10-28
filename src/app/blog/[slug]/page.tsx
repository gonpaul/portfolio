import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db, initDB } from '@/lib/db';
import { parseMarkdown } from '@/lib/markdown';
import { getTranslations } from 'next-intl/server';

// Initialize database
initDB();

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  published_at: string;
  created_at: string;
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const t = await getTranslations('Blog');

  try {
    const stmt = db.prepare(`
      SELECT id, slug, title, content, excerpt, category, published_at, created_at
      FROM posts 
      WHERE slug = ?
    `);

    const post = stmt.get(slug) as BlogPost | undefined;

    if (!post) {
      notFound();
    }

    // Parse markdown content
    const { html, frontmatter } = parseMarkdown(post.content);

    return (
      <div className="min-h-screen bg-white pt-12 md:pt-20">
        <div className="max-w-4xl mx-auto px-0 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-black mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="text-gray-600 font-mono text-sm">
              {t('publishedOn')} {new Date(post.published_at).toLocaleDateString()}
            </div>
            <div className="mt-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {t(`categories.${post.category}`)}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <article className="bg-white rounded-lg shadow-lg p-8 md:px-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/blog"
                className="bg-black text-white px-6 py-3 font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 text-center"
              >
                ← {t('backToBlog')}
              </Link>
              <Link 
                href="/contact"
                className="bg-transparent border-2 border-black text-black px-6 py-3 font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-200 transform hover:scale-105 text-center"
              >
                {t('discussThisTopic')}
              </Link>
            </div>
          </article>
        </div>

        {/* Footer */}
        <footer className="bg-gray-100 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600 font-mono">
              © Gonpaul | Pavel Goncharov
            </p>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}
