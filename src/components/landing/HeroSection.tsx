
import Link from 'next/link';
import { Dog } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Unlock Your ICFES Potential
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Your Slogan Here: Master the Pre-ICFES Saber 11 with IAPES Prep. Personalized feedback and expert guidance.
            </p>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button size="lg">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline">Register</Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <Dog className="w-48 h-48 lg:w-64 lg:h-64 text-primary opacity-75" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </section>
  );
}
