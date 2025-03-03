
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  PhoneCall, 
  Calendar 
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useAnimation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px'
  });
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };
  
  return (
    <header 
      ref={elementRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-2 glass-effect" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-primary">
            <img src="/logo2.png" alt="איציק פיתרונות מיזוג" className="h-12 md:h-14" />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "שירותים", id: "services" },
              { name: "צור קשר", id: "צור קשר" },
              { name: "הזמן שירות", id: "booking" }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/80 hover:text-primary transition-colors relative group"
              >
                <span>{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary text-primary hover:bg-primary hover:text-white transition-colors border" 
              onClick={() => scrollToSection('booking')}
            >
              <Calendar className="mr-2 h-4 w-4" />
              הזמן שירות
            </Button>
            
            <Button 
              className="animate-pulse-soft btn-primary-effect"
              onClick={() => window.location.href = 'tel:0502290880'}
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              050-2290880
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex flex-col pt-20`}
      >
        <div className="container mx-auto px-4 py-8 flex flex-col items-center space-y-6">
          {[
            { name: "שירותים", id: "services" },
            { name: "צור קשר", id: "צור קשר" },
            { name: "הזמן שירות", id: "booking" }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className="text-xl font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </button>
          ))}
          
          <div className="pt-6 flex flex-col space-y-4 w-full max-w-xs">
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary hover:text-white border"
              onClick={() => scrollToSection('booking')}
            >
              <Calendar className="mr-2 h-4 w-4" />
              הזמן שירות
            </Button>
            
            <Button 
              className="w-full btn-primary-effect"
              onClick={() => window.location.href = 'tel:0502290880'}
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              050-2290880
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
