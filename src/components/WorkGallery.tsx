'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageViewModal from '@/components/ImageViewModal';

interface WorkGalleryProps {
  images: string[];
  heading?: string;
  columns?: 2 | 3;
  workTitle?: string;
  altPrefix?: string;
}

export default function WorkGallery({ 
  images, 
  heading, 
  columns = 3, 
  workTitle,
  altPrefix 
}: WorkGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  const gridCols = columns === 2 
    ? 'grid-cols-1 md:grid-cols-2' 
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  const imageHeight = columns === 2 ? 'h-auto' : 'h-64';

  return (
    <>
      <div className="mb-12">
        {heading && (
          <h2 className="text-2xl font-bold text-black mb-6">{heading}</h2>
        )}
        <div className={`grid ${gridCols} gap-6`}>
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={workTitle 
                  ? `${workTitle} - Image ${index + 1}` 
                  : altPrefix 
                    ? `${altPrefix} ${index + 1}` 
                    : `Image ${index + 1}`}
                width={400}
                height={300}
                className={`w-full ${imageHeight} object-cover group-hover:scale-105 transition-transform duration-300`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageViewModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage || ''}
        alt="Full view"
      />
    </>
  );
}