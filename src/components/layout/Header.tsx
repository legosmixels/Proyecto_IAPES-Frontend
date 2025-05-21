
import Link from 'next/link';
import { Menu, User, Home, Globe, Sun, Moon } from 'lucide-react'; // Added Sun, Moon, Globe
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Left Group: Mobile Menu Trigger or Desktop Logo+Title */}
        <div className="flex items-center">
          {/* Mobile Nav Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2" 
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 pt-8 sm:max-w-xs">
              <Link
                href="/"
                className="flex items-center space-x-2 mb-6 px-4"
              >
                <Home className="h-6 w-6 text-primary text-shadow-neon-primary" />
                <span className="font-bold text-lg">IAPES Prep</span>
              </Link>
              <nav className="flex flex-col space-y-3 px-4">
                <Link href="/login" className="text-md py-2 hover:text-primary transition-colors">Login</Link>
                <Link href="/register" className="text-md py-2 hover:text-primary transition-colors">Register</Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          {/* Desktop Logo & Title */}
          <Link href="/" className="hidden md:flex items-center space-x-2">
            <Home className="h-7 w-7 text-primary text-shadow-neon-primary" />
            <span className="font-bold text-xl sm:inline-block">
              IAPES Prep
            </span>
          </Link>
        </div>

        <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
           <Link href="/" className="flex items-center space-x-1.5">
            <Home className="h-5 w-5 text-primary text-shadow-neon-primary" />
            <span className="font-semibold text-md">IAPES Prep</span>
          </Link>
        </div>

        {/* Right Group: Action Icons (Language, Theme, User) */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="icon" aria-label="Login" className="w-9 h-9">
              <User className="h-5 w-5 text-primary text-shadow-neon-primary" /> 
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
