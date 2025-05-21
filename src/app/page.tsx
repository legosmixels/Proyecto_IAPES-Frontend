
import HeroSection from '@/components/landing/HeroSection';
import CarouselSection from '@/components/landing/CarouselSection';
import WhyThisAppSection from '@/components/landing/WhyThisAppSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FeedbackSection from '@/components/landing/FeedbackSection';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <CarouselSection />
      <WhyThisAppSection />
      <TestimonialsSection />
      <FeedbackSection />
      {/* A simple footer */}
      <footer className="py-8 bg-muted text-muted-foreground text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} IAPES Prep. All rights reserved.</p>
          <p className="text-sm mt-1">Your partner for ICFES Saber 11 success.</p>
        </div>
      </footer>
    </main>
  );
}
