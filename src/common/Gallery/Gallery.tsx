'use client';

import Image from 'next/image';
import React, {useEffect, useState} from 'react';

export type GalleryImage = {id: number; category: string; title: string; src: string};

type Props = {
    images: GalleryImage[];
};

const Gallery: React.FC<Props> = ({images}) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
        if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        if (typeof document !== 'undefined') document.body.style.overflow = 'auto';
    };

    const nextImage = () => {
        setCurrentIndex((i) => (i + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (!lightboxOpen) return;
        const onKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    previousImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lightboxOpen, images.length]);

    const currentImage = images[currentIndex];

    const GalleryItem = ({image, index, openLightbox}: {image: GalleryImage; index: number; openLightbox: (index: number) => void}) => (
        <div
            className="gallery-item group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-80 bg-cover bg-center"
            style={{backgroundImage: `url(${image.src})`}}
            data-category={image.category}
            data-id={image.id}
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={image.title}
        >
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="font-semibold text-lg text-white">{image.title}</h3>
            </div>
        </div>
    );

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <>
            {/* Gallery Grid */}

            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="gallery-grid">
                        {images.map((image, idx) => (
                            <GalleryItem key={image.id} image={image} index={idx} openLightbox={openLightbox} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && currentImage && (
                <div id="lightbox" className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/90"
                        onClick={closeLightbox}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                closeLightbox();
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Close lightbox"
                    />
                    <div className="relative h-full flex items-center justify-center p-4">
                        <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10" aria-label="Close">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        <button onClick={previousImage} className="absolute left-4 text-white hover:text-gray-300 z-10" aria-label="Previous image">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>

                        <button onClick={nextImage} className="absolute right-4 text-white hover:text-gray-300 z-10" aria-label="Next image">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>

                        <Image
                            id="lightbox-image"
                            src={currentImage.src}
                            alt={currentImage.title}
                            width={1920}
                            height={1080}
                            className="max-w-full max-h-full object-contain"
                            quality={90}
                            loading="lazy"
                            blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUUEyoBwACTAEq/0+cSQAAAABJRU5ErkJggg==`}
                            placeholder="blur"
                            priority
                        />
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                            <h3 id="lightbox-title" className="text-white text-xl font-semibold">
                                {currentImage.title}
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Gallery;
