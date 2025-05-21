
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const carouselItems = [
  {
    id: 1,
    src: 'https://placehold.co/800x400.png',
    alt: 'Feature 1',
    title: 'Interactive Simulations',
    description: 'Experience real test conditions with our advanced simulations.',
    aiHint: 'study learning',
  },
  {
    id: 2,
    src: 'https://placehold.co/800x400.png',
    alt: 'Feature 2',
    title: 'Personalized AI Feedback',
    description: 'Receive custom advice to target your weak areas effectively.',
    aiHint: 'technology code',
  },
  {
    id: 3,
    src: 'https://placehold.co/800x400.png',
    alt: 'Feature 3',
    title: 'Comprehensive Study Material',
    description: 'Access a vast library of resources curated by experts.',
    aiHint: 'books library',
  },
];

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carouselItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === carouselItems.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!isClient) {
    return (
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Discover Our Features</h2>
          <div className="w-full max-w-3xl mx-auto h-64 bg-muted rounded-lg flex items-center justify-center">
            Loading Carousel...
          </div>
        </div>
      </section>
    );
  }
  

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Discover Our Features</h2>
        <div className="relative w-full max-w-3xl mx-auto">
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-[2/1] relative">
                <Image
                  src={carouselItems[currentIndex].src}
                  alt={carouselItems[currentIndex].alt}
                  data-ai-hint={carouselItems[currentIndex].aiHint}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={currentIndex === 0}
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-2xl font-semibold text-white mb-2">{carouselItems[currentIndex].title}</h3>
                  <p className="text-md text-gray-200">{carouselItems[currentIndex].description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full border-accent-details/50 text-accent-details hover:bg-accent-details/10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full border-accent-details/50 text-accent-details hover:bg-accent-details/10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="flex justify-center mt-4 space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                /* Changed inactive dot color */
                className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-primary shadow-neon-primary' : 'bg-accent-details/30 hover:bg-accent-details/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
