
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ThermometerSun,
  Wind,
  Wrench,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { useIntersectionObserver, useAnimatedText } from "@/hooks/useAnimation";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px'
  });
  
  const { displayedText } = useAnimatedText(
    "שירות מקצועי ואמין - כל פתרונות המיזוג שלך במקום אחד",
    mounted ? 30 : 0
  );
  
  const benefits = [
    {
      title: "מענה מהיר",
      description: "מגיעים תוך 2-4 שעות לקריאות דחופות",
      icon: <Wind className="text-primary h-5 w-5" />
    },
    {
      title: "טכנאים מוסמכים",
      description: "עם ניסיון רב בכל סוגי המזגנים",
      icon: <Wrench className="text-primary h-5 w-5" />
    },
    {
      title: "אחריות מלאה",
      description: "על כל התיקונים וההתקנות שלנו",
      icon: <CheckCircle2 className="text-primary h-5 w-5" />
    }
  ];
  
  return (
    <section ref={elementRef} className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 bg-cool-waves bg-cover bg-fixed opacity-20" />
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-right">
            <div className="space-y-3">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                <ThermometerSun className="mr-1 h-3.5 w-3.5" />
                <span>מומחי מיזוג אוויר</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                <span className="text-glow text-primary">מיזוג אוויר</span> מקצועי לבית ולעסק
              </h1>
              
              <p className="text-lg text-muted-foreground">
                {displayedText}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                size="lg"
                className="btn-primary-effect"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                הזמן שירות עכשיו
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                גלה את השירותים שלנו
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-3xl">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`glass-card p-4 text-right transition-opacity transition-transform duration-500 ${
                    mounted && isIntersecting 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3 rtl">
                    <div className="p-2 rounded-full bg-primary/10">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div
            className={`relative transition-all duration-500 ${
              mounted && isIntersecting 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="relative">
              <div className="absolute -top-5 -left-5 bg-primary/30 w-full h-full rounded-tr-[80px] -z-10" />
              <div className="rounded-tr-[80px] overflow-hidden border-4 border-white shadow-lg relative h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1619045119136-349759036131?auto=format&fit=crop&q=80&w=1074"
                  alt="AC Technician"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <div className="glass-card p-4 max-w-sm mr-auto backdrop-blur-lg bg-white/20">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                          >
                            <img
                              src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`}
                              alt="Customer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="text-white">
                        <div className="text-sm font-medium">+800 לקוחות מרוצים</div>
                        <div className="text-xs opacity-75">באזור המרכז</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 glass-card p-5 backdrop-blur-lg bg-white/70 rounded-lg shadow-glass-lg max-w-xs hidden md:block">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <ThermometerSun className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">מחירים הוגנים</h3>
                  <p className="text-sm text-muted-foreground">מחירון שקוף לכל השירותים ללא הפתעות</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
