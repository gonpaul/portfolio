'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const CATEGORIES = ['all', 'business', 'technology', 'philosophy', 'science', 'life'] as const;

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
}

export default function Blog() {
  const t = useTranslations('Blog');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory === 'all' 
        ? '/api/posts'
        : `/api/posts?category=${selectedCategory}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-12 md:pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 md:py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-black mb-4 relative inline-block">
              <span className="relative">
                {t('header')}
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-1 h-full bg-black"></div>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-1 h-full bg-black"></div>
              </span>
            </h1>
          </div>

          {/* Category Filters */}
          <div className="mb-12">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3 sm:gap-4">
              {CATEGORIES.map((slug) => (
                <button
                  key={slug}
                  onClick={() => setSelectedCategory(slug)}
                  className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                    selectedCategory === slug
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(`categories.${slug}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
              <p className="mt-4 text-gray-600">{t('loading')}</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-gray-600">
                          {new Date(post.published_at).toLocaleDateString()}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {t(`categories.${post.category}`)}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-black hover:text-black/50 transition-colors duration-200">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-block bg-transparent border-2 border-black text-black px-6 py-3 font-medium hover:bg-black hover:text-white transition-all duration-200 transform hover:scale-105"
                      >
                        {t('readMore')}
                      </Link>
                    </div>
                    <div className="mt-4 md:mt-8">
                      <p className="text-gray-700 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
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
}