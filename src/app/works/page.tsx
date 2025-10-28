import Link from 'next/link';
import Image from 'next/image';
import { getAllWorks } from '@/lib/works';
import { useTranslations } from 'next-intl';

export default function Works() {
  const t = useTranslations('Works');
  const works = getAllWorks();

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

          {/* Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.slice().reverse().map((work) => (
              <div 
                key={work.id} 
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group flex flex-col"
              >
                <div className="relative overflow-hidden h-52">
                  <Image
                    src={work.image}
                    alt={work.title}
                    width={400}
                    height={300}
                    objectFit='cover'
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black text-white px-3 py-1 text-sm font-medium rounded-full">
                      {work.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    <Link href={work.link}>
                      {t(`items.${work.id}.title`)}
                    </Link>
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                    {t(`items.${work.id}.description`)}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    <Link 
                      href={work.link}
                      className="flex-1 bg-transparent border-2 border-black text-black px-4 py-2 font-medium hover:bg-black hover:text-white transition-all duration-200 transform hover:scale-105 text-center"
                    >
                      {t('buttons.viewDetails')}
                    </Link>
                    {work.liveUrl && (
                      <a 
                        href={work.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 text-center"
                      >
                        {t('buttons.liveDemo')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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