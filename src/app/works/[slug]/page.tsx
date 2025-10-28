import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getWorkById, getAllWorks, Work } from '@/lib/works';
import { getTranslations } from 'next-intl/server';

interface WorkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const workId = parseInt(slug);
  const work = getWorkById(workId);
  const t = await getTranslations('Works');

  if (!work) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-3 md:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/works" 
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('buttons.backToWorks')}
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-black text-white px-4 py-2 text-sm font-medium rounded-full">
              {work.category}
            </span>
            <span className="text-gray-500 text-sm">
              Project {work.id.toString().padStart(3, '0')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-black mb-6">
            {t(`items.${work.id}.title`)}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            {t(`items.${work.id}.description`)}
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-lg shadow-2xl">
            <Image
              src={work.image}
              alt={work.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-black mb-4">{t('sections.about')}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t(`items.${work.id}.detailedDescription`)}
              </p>

              {work.features && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-black mb-4">{t('sections.features')}</h3>
                  <ul className="list-disc ml-1 md:ml-3 space-y-2 text-gray-700">
                    {Array.from({ length: Number(t(`items.${work.id}.features.count`)) }, (_, index) => (
                      <li key={index}>{t(`items.${work.id}.features.${index}`)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {work.challenges && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-black mb-4">{t('sections.challenges')}</h3>
                  <ul className="list-disc ml-1 md:ml-3 space-y-2 text-gray-700">
                    {Array.from({ length: Number(t(`items.${work.id}.challenges.count`)) }, (_, index) => (
                      <li key={index}>{t(`items.${work.id}.challenges.${index}`)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Technologies */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-black mb-4">{t('sections.technologies')}</h3>
                <div className="flex flex-wrap gap-2">
                  {work.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-white text-gray-700 px-3 py-1 text-sm rounded-md border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-3">
                {work.liveUrl && (
                  <a 
                    href={work.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 text-center block rounded-lg"
                  >
                    {t('buttons.liveDemo')}
                  </a>
                )}
                
                <Link 
                  href="/works"
                  className="w-full bg-transparent border-2 border-black text-black px-6 py-3 font-medium hover:bg-black hover:text-white transition-all duration-200 transform hover:scale-105 text-center block rounded-lg"
                >
                  {t('buttons.backToWorks')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {work.gallery && work.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">{t('sections.gallery')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {work.gallery.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image}
                    alt={`${work.title} - Image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
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

// Generate static params for all works
export async function generateStaticParams() {
  const works = getAllWorks();
  return works.map((work) => ({
    slug: work.id.toString(),
  }));
}
