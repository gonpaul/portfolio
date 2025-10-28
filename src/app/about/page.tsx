'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { workExperience, education, technicalSkills, socialLinks, personalInfo } from '@/lib/content';

export default function About() {
  const t = useTranslations('About');
  // Handle smooth scrolling with offset for fixed sidebar
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const offset = 160; // Account for fixed sidebar
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listeners to all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex max-w-4xl mt-0 md:mt-20 mx-auto">
        {/* Left Sidebar Navigation - Hidden on mobile */}
        <aside className="hidden [@media(min-width:1320px)]:block w-64 fixed left-0 top-1/3 h-full bg-transparent z-10">
          <div className="p-8">
            <nav className="space-y-6">
              <a href="#introduction" className="block text-gray-700 hover:text-black transition-colors text-lg">
                <span className="mr-2">—</span>{t('sidebar.introduction')}
              </a>
              <a href="#work-experience" className="block text-gray-700 hover:text-black transition-colors text-lg">
                <span className="mr-2">—</span>{t('sidebar.workExperience')}
              </a>
              <a href="#education" className="block text-gray-700 hover:text-black transition-colors text-lg">
                <span className="mr-2">—</span>{t('sidebar.education')}
              </a>
              <a href="#technical-skills" className="block text-gray-700 hover:text-black transition-colors text-lg">
                <span className="mr-2">—</span>{t('sidebar.technicalSkills')}
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pb-4 px-6 sm:p-6 lg:p-8 pt-10 lg:pt-10">
          {/* Profile Header */}
          <div id="introduction" className="mb-16 relative py-10">
            {/* Background texture for md+ screens */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-20 lg:mb-8 relative z-10">
              {/* Avatar */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-gray-200 flex items-center justify-center mx-auto">
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center mt-4 lg:mt-8 gap-2 mb-4">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 pb-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 text-sm lg:text-base">{t('personal.location')}</span>
                </div>

                <div className="flex gap-2 mb-4 justify-center">
                  {[t('languages.english'), t('languages.russian')].map((language, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-2">{t('personal.name')}</h1>
                <p className="text-xl lg:text-2xl text-gray-600 mb-6">{t('personal.title')}</p>

                {/* Social Links */}
                <div className="flex flex-wrap gap-2 lg:gap-4 justify-center lg:justify-start mb-6">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-transparent border border-black text-black px-3 lg:px-4 py-1 lg:py-0.5 rounded-full transition-opacity duration-200 hover:opacity-80"
                      >
                        <IconComponent className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span className="text-xs lg:text-sm lg:pt-1 font-medium">{social.name}</span>
                      </a>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-8">
                  <a
                    href={personalInfo.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-4 lg:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-102"
                  >
                    {/* Calendar Icon */}
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"></path>
                      <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm lg:text-base">{t('buttons.scheduleCall')}</span>
                    {/* Chevron Icon */}
                    <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd"></path>
                    </svg>
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 px-4 lg:px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full font-semibold transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-102"
                  >
                    {/* Contact Icon */}
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>
                    <span className="text-sm lg:text-base">{t('buttons.contactMe')}</span>
                    {/* Chevron Icon */}
                    <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="prose prose-lg mt-10 max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {t('personal.introduction')}
              </p>
            </div>

          </div>

          {/* Work Experience */}
          <div id="work-experience" className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-black mb-6 lg:mb-8">{t('headings.workExperience')}</h2>
            <div className="space-y-8">
              {[
                { key: 'personalSaaS', slug: '6' },
                { key: 'onmars', slug: '5' },
                { key: 'smartFace', slug: '1' },
                { key: 'roboFriends', slug: '2' }
              ].map((work, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-black">{t(`workExperience.${work.key}.company`)}</h3>
                    <span className="text-gray-600">{t(`workExperience.${work.key}.timeframe`)}</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-4">{t(`workExperience.${work.key}.role`)}</p>
                  <ul className="space-y-2 mb-4">
                    {Array.from({ length: Number(t(`workExperience.${work.key}.achievementsCount`)) }, (_, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{t(`workExperience.${work.key}.achievements.${achievementIndex}`)}</span>
                      </li>
                    ))}
                  </ul>
                  {work.slug && (
                    <Link 
                      href={`/works/${work.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {t('buttons.viewProject')}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div id="education" className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-black mb-6 lg:mb-8">{t('headings.education')}</h2>
            <div className="space-y-6">
              {Array.from({ length: Number(t('education.count')) }, (_, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-bold text-black mb-2">{t(`education.${index}.institution`)}</h3>
                  <p className="text-gray-600 mb-1">{t(`education.${index}.description`)}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-500">{t(`education.${index}.timeframe`)}</span>
                    {t(`education.${index}.isFinished`) === 'false' && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {t('status.inProcess')}
                      </span>
                    )}
                  </div>
                  </div>
                ))}
            </div>
              </div>
              
          {/* Technical Skills */}
          <div id="technical-skills" className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-black mb-6 lg:mb-8">{t('headings.technicalSkills')}</h2>
            <div className="space-y-8">
              {Array.from({ length: Number(t('technicalSkillsData.count')) }, (_, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-black mb-2">{t(`technicalSkillsData.${index}.title`)}</h3>
                  <p className="text-gray-700 mb-4">{t(`technicalSkillsData.${index}.description`)}</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: Number(t(`technicalSkillsData.${index}.tags.count`)) }, (_, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-white text-gray-700 px-3 py-1 rounded-md text-sm border"
                      >
                        {t(`technicalSkillsData.${index}.tags.${tagIndex}`)}
                      </span>
                    ))}
                  </div>
              </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div id="certificates" className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-black mb-6 lg:mb-8">{t('headings.certificates')}</h2>
            <div className="bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center">
                <Image 
                  src="/images/ztm-complete-web-dev-course.png" 
                  alt="Certificate"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-md shadow"
                  priority={false}
                />
                <Image 
                  src="/images/ztm-complete-machine-learning-and-ds.png" 
                  alt="Certificate"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-md shadow"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 lg:mt-16 text-center">
            <div className="bg-gradient-to-r from-black to-gray-800 rounded-lg p-6 lg:p-8 text-white">
              <h3 className="text-xl lg:text-2xl font-bold mb-4">{t('cta.title')}</h3>
              <p className="text-gray-300 mb-6 text-sm lg:text-base">
                {t('cta.text')}
              </p>
              <Link 
                href="/contact"
                className="inline-block bg-white text-black px-6 lg:px-8 py-3 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 text-sm lg:text-base"
              >
                {t('buttons.getInTouch')}
              </Link>
            </div>
          </div>
        </main>
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