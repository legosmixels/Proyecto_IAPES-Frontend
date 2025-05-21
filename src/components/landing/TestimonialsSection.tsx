
"use client";

import { useRef } from 'react'; // Import useRef
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'; // Import Chevron icons
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'; // Import Button

const testimonials = [
  {
    name: 'Laura V.',
    avatarFallback: 'LV',
    avatarSrc: 'https://placehold.co/40x40.png',
    aiHint: 'person woman',
    rating: 5,
    comment: "IAPES Prep helped me identify my weaknesses and improve my scores significantly. The AI feedback is amazing!",
  },
  {
    name: 'Carlos R.',
    avatarFallback: 'CR',
    avatarSrc: 'https://placehold.co/40x40.png',
    aiHint: 'person man',
    rating: 4,
    comment: "The simulations are very realistic. I felt much more confident on test day. Highly recommend this platform.",
  },
  {
    name: 'Sofia M.',
    avatarFallback: 'SM',
    avatarSrc: 'https://placehold.co/40x40.png',
    aiHint: 'person student',
    rating: 5,
    comment: "An excellent tool for ICFES preparation. The content is thorough and the platform is easy to use.",
  },
  {
    name: 'Juan P.',
    avatarFallback: 'JP',
    avatarSrc: 'https://placehold.co/40x40.png',
    aiHint: 'person male',
    rating: 4,
    comment: "Great value for money. The personalized recommendations made a huge difference in my study strategy.",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
  );
};

export default function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Card width (280px) + space-x-6 (1.5rem = 24px) = 304px
  const SCROLL_AMOUNT = 304; 

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary text-shadow-neon-primary">What Our Users Say</h2>
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={handleScrollLeft}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 rounded-full border-primary/50 text-primary hover:bg-primary/10 text-shadow-neon-primary disabled:opacity-50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div 
            ref={scrollContainerRef} 
            className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 no-scrollbar"
          >
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="min-w-[280px] flex-shrink-0 shadow-lg hover:shadow-xl hover:border-primary hover:shadow-neon-primary transition-all duration-300 border border-transparent"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                      <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <StarRating rating={testimonial.rating} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleScrollRight}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 rounded-full border-primary/50 text-primary hover:bg-primary/10 text-shadow-neon-primary disabled:opacity-50"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
