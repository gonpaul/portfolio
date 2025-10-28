'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [locale, setLocale] = useState<'en' | 'ru'>('en');
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  
  // Check if we're on the home page
  const isHomePage = pathname === '/';

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    // Initialize locale from cookie on client
    try {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('locale='));
      const value = cookie?.split('=')[1] as 'en' | 'ru' | undefined;
      if (value === 'en' || value === 'ru') {
        setLocale(value);
      }
    } catch (_) {
      // noop
    }
  }, []);
  
  const handleLocaleChange = (next: 'en' | 'ru') => {
    try {
      document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
      setLocale(next);
      // Full reload to ensure server reads new cookie
      window.location.reload();
    } catch (_) {
      // Fallback: navigate home
      window.location.href = '/';
    }
  };
  
  // Navigation link styles based on current page (only apply on client)
  const linkStyles = isClient && isHomePage 
    ? "text-[var(--gray)] hover:text-gray-300" 
    : "text-black hover:text-gray-600";
  
  const mobileLinkStyles = isClient && isHomePage 
    ? "text-white hover:text-gray-300" 
    : "text-black hover:text-gray-600";

  const langBtnBase = "px-2 py-1 text-sm border rounded transition-colors duration-200";
  const langBtnActiveHome = "bg-white text-black border-white";
  const langBtnInactiveHome = "bg-transparent text-white border-white hover:bg-white hover:text-black";
  const langBtnActive = "bg-black text-white border-black";
  const langBtnInactive = "bg-transparent text-black border-black hover:bg-black hover:text-white";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className={`bg-transparent ${isClient && !isHomePage ? 'md:bg-white' : ''}`}>
        <div className="max-w-7xl md:mx-20 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative">
            {/* Left side - Desktop navigation only */}
            <div className="hidden lg:block">
              <div className="flex items-center my-5 space-x-3 whitespace-nowrap">
                <Link href="/" className={`px-3 py-2 text-lg font-light transition-colors duration-200 whitespace-nowrap ${linkStyles}`}>
                  01 : {t('home')} 
                </Link>
                <div className={`h-6 border-l ${isClient && isHomePage ? 'border-white' : 'border-black'}`}></div>
                <Link href="/works" className={`px-3 py-2 text-lg font-light transition-colors duration-200 whitespace-nowrap ${linkStyles}`}>
                  02 : {t('works')} 
                </Link>
                <div className={`h-6 border-l ${isClient && isHomePage ? 'border-white' : 'border-black'}`}></div>
                <Link href="/blog" className={`px-3 py-2 text-lg font-light transition-colors duration-200 whitespace-nowrap ${linkStyles}`}>
                  03 : {t('blog')} 
                </Link>
                <div className={`h-6 border-l ${isClient && isHomePage ? 'border-white' : 'border-black'}`}></div>
                <Link href="/about" className={`px-3 py-2 text-lg font-light transition-colors duration-200 whitespace-nowrap ${linkStyles}`}>
                  04 : {t('about')}
                </Link>
                <div className={`h-6 border-l ${isClient && isHomePage ? 'border-white' : 'border-black'}`}></div>
                <Link href="/contact" className={`px-3 py-2 text-lg font-light transition-colors duration-200 whitespace-nowrap ${linkStyles}`}>
                  05 : {t('contact')}
                </Link>
                <div className={`w-full h-6 border-l ${isClient && isHomePage ? 'border-white' : 'border-black'}`}></div>
              </div>
            </div>
            
            {/* Desktop language switcher pushed to the right */}
            <div className="hidden lg:flex flex-1 justify-end">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleLocaleChange('en')}
                  className={
                    `${langBtnBase} ` +
                    (isHomePage
                      ? (locale === 'en' ? langBtnActiveHome : langBtnInactiveHome)
                      : (locale === 'en' ? langBtnActive : langBtnInactive))
                  }
                  aria-pressed={locale === 'en'}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleLocaleChange('ru')}
                  className={
                    `${langBtnBase} ` +
                    (isHomePage
                      ? (locale === 'ru' ? langBtnActiveHome : langBtnInactiveHome)
                      : (locale === 'ru' ? langBtnActive : langBtnInactive))
                  }
                  aria-pressed={locale === 'ru'}
                >
                  RU
                </button>
              </div>
            </div>


            {/* Right side - Mobile menu button */}
            {/* Spacer to push burger to the right on mobile */}
            <div className="flex-1 lg:hidden"></div>
            <button
              type="button"
              className={`lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-opacity-10 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-current relative z-50 ${
                isClient && isHomePage ? 'text-white hover:bg-white' : 'text-black hover:bg-black'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 transition-all duration-300 ${isClient && isHomePage ? 'bg-white' : 'bg-black'} ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-5 h-0.5 transition-all duration-300 mt-1 ${isClient && isHomePage ? 'bg-white' : 'bg-black'} ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 transition-all duration-300 mt-1 ${isClient && isHomePage ? 'bg-white' : 'bg-black'} ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile navigation menu */}
          <div className={`lg:hidden absolute top-0 left-0 right-0 w-full transition-all duration-300 transform ${
            isOpen 
              ? 'opacity-100 translate-y-0 visible' 
              : 'opacity-0 -translate-y-4 invisible'
          }`}>
            <div className={`px-4 py-4 space-y-1 w-full transition-all duration-300 ${
              isClient && isHomePage 
                ? 'bg-black bg-opacity-90' 
                : 'bg-white bg-opacity-98 shadow-lg'
            }`}>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col flex-1">
                  <Link 
                    href="/" 
                    className={`block px-3 py-2 text-base font-medium transition-all duration-200 transform hover:scale-105 ${mobileLinkStyles} ${
                      isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`} 
                    onClick={() => setIsOpen(false)}
                    style={{ transitionDelay: isOpen ? '0.1s' : '0s' }}
                  >
                    01 : {t('home')}
                  </Link>
                </div>
                {/* Mobile language switcher (horizontal, right next to links) */}
                <div className="flex items-center gap-2 ml-2 mr-12">
                  <button
                    type="button"
                    onClick={() => handleLocaleChange('en')}
                    className={
                      `${langBtnBase} ` +
                      (isHomePage
                        ? (locale === 'en' ? langBtnActiveHome : langBtnInactiveHome)
                        : (locale === 'en' ? langBtnActive : langBtnInactive))
                    }
                    aria-pressed={locale === 'en'}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocaleChange('ru')}
                    className={
                      `${langBtnBase} ` +
                      (isHomePage
                        ? (locale === 'ru' ? langBtnActiveHome : langBtnInactiveHome)
                        : (locale === 'ru' ? langBtnActive : langBtnInactive))
                    }
                    aria-pressed={locale === 'ru'}
                  >
                    RU
                  </button>
                </div>
              </div>
              <Link 
                href="/works" 
                className={`block px-3 py-2 text-base font-medium transition-all duration-200 transform hover:scale-105 ${mobileLinkStyles} ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`} 
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: isOpen ? '0.15s' : '0s' }}
              >
                02 : {t('works')}
              </Link>
              <Link 
                href="/blog" 
                className={`block px-3 py-2 text-base font-medium transition-all duration-200 transform hover:scale-105 ${mobileLinkStyles} ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`} 
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: isOpen ? '0.2s' : '0s' }}
              >
                03 : {t('blog')}
              </Link>
              <Link 
                href="/about" 
                className={`block px-3 py-2 text-base font-medium transition-all duration-200 transform hover:scale-105 ${mobileLinkStyles} ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`} 
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: isOpen ? '0.25s' : '0s' }}
              >
                04 : {t('about')}
              </Link>
              <Link 
                href="/contact" 
                className={`block px-3 py-2 text-base font-medium transition-all duration-200 transform hover:scale-105 ${mobileLinkStyles} ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`} 
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: isOpen ? '0.3s' : '0s' }}
              >
                05 : {t('contact')}
              </Link>
              {/* (moved) mobile language switcher now positioned near burger */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}