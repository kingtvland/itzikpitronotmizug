import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Phone, Mail, Users } from 'lucide-react';
import { ModeToggle } from './ModeToggle';

function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container h-16 flex items-center justify-between py-4">
        <Link to="/" className="flex items-center font-semibold">
          איציק פתרונות מיזוג
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-foreground hover:text-primary transition-colors">
            שירותים
          </a>
          <a href="#shop" className="text-foreground hover:text-primary transition-colors">
            חנות
          </a>
          <a href="#booking" className="text-foreground hover:text-primary transition-colors">
            הזמנת שירות
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            צור קשר
          </a>
          <Link to="/login" className="flex items-center text-foreground hover:text-primary transition-colors">
            <Users className="h-4 w-4 ml-2" />
            <span>ניהול</span>
          </Link>
          <ModeToggle />
        </nav>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>תפריט</SheetTitle>
              <SheetDescription>
                חקור את האתר שלנו
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <a href="#services" className="py-2 text-foreground hover:text-primary transition-colors block">
                שירותים
              </a>
              <a href="#shop" className="py-2 text-foreground hover:text-primary transition-colors block">
                חנות
              </a>
              <a href="#booking" className="py-2 text-foreground hover:text-primary transition-colors block">
                הזמנת שירות
              </a>
              <a href="#contact" className="py-2 text-foreground hover:text-primary transition-colors block">
                צור קשר
              </a>
              <Link to="/login" className="flex items-center py-2 text-foreground hover:text-primary transition-colors">
                <Users className="h-4 w-4 ml-2" />
                <span>ניהול</span>
              </Link>
              <ModeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
