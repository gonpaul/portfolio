'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

export default function ImageViewModal({ isOpen, onClose, imageUrl, alt }: ImageViewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Modal content with scale animation */}
      <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-12 right-4 z-10 p-2 text-black hover:text-gray-300 transition-colors duration-200"
          aria-label="Close image viewer"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
