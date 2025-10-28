'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Home() {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const t = useTranslations('HomePage');

  const texts = [
    t('titles.name'), t('titles.job'), t('titles.message')
  ];

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  // Mouse movement effect for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized position (-1 to 1)
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
        className="h-screen bg-cover bg-no-repeat flex items-center justify-start relative overflow-hidden"
        style={{ 
          backgroundImage: "url('/images/space.jpg')",
          backgroundPosition: `calc(50% + ${mousePosition.x * 12}px) calc(50% + ${mousePosition.y * 12}px)`,
          backgroundSize: 'cover',
          transition: 'background-position 0.1s ease-out'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 text-start mx-6 md:mx-14 px-4 pl-8">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight">
            {t('greeting')},<br />
            <span className="block">
              {currentText}
              <span className="typing-cursor text-white"></span>
            </span>
          </h1>
          
        </div>
      </div>
  );
}