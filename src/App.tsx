
import React from 'react';
import './App.css';
import { Toaster } from "@/components/ui/sonner";
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import BookingForm from './components/BookingForm';
import ContactInfo from './components/ContactInfo';
import Footer from './components/Footer';
import { Wrench, Fan, Zap, Thermometer, Snowflake, ExternalLink } from 'lucide-react';

function App() {
  const services = [
    {
      title: "התקנת מזגן חדש",
      description: "התקנה מקצועית ומהירה של מזגנים מכל הסוגים בבית או בעסק שלך",
      icon: <Fan className="h-5 w-5 text-primary" />,
      image: "https://images.unsplash.com/photo-1595061628890-381bf6540f47?auto=format&fit=crop&q=80&w=1080",
      price: "₪550",
      features: [
        "התקנה מקצועית",
        "אחריות מלאה על העבודה",
        "ניקיון בסיום העבודה"
      ]
    },
    {
      title: "תיקון מזגנים",
      description: "פתרון מהיר לכל תקלה במזגן - חוסר קירור, רעשים, נזילות ועוד",
      icon: <Wrench className="h-5 w-5 text-primary" />,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1080",
      price: "₪250",
      features: [
        "אבחון מקצועי",
        "תיקון תוך שעות בודדות",
        "חלקי חילוף מקוריים"
      ]
    },
    {
      title: "ניקוי וחיטוי מזגנים",
      description: "ניקוי יסודי של המזגן להבטחת אוויר נקי ובריא וחיסכון בחשמל",
      icon: <Snowflake className="h-5 w-5 text-primary" />,
      image: "https://images.unsplash.com/photo-1613294326794-e0b22a69c9b7?auto=format&fit=crop&q=80&w=1080",
      price: "₪200",
      features: [
        "ניקוי עמוק ומקיף",
        "הדברה נגד חיידקים ופטריות",
        "שיפור ביצועי המזגן"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />
      <Header />
      
      <main>
        <Hero />
        
        <section id="services" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-14 space-y-3">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                <Thermometer className="mr-1 h-3.5 w-3.5" />
                <span>השירותים שלנו</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">פתרונות מיזוג אוויר מקצועיים</h2>
              <p className="text-muted-foreground max-w-2xl">
                אנו מציעים מגוון שירותי מיזוג אוויר מקצועיים לבית ולעסק. הצוות המקצועי שלנו עומד לרשותכם לכל צורך.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  image={service.image}
                  price={service.price}
                  features={service.features}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section id="booking" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-14 space-y-3">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                <Calendar className="mr-1 h-3.5 w-3.5" />
                <span>הזמן שירות</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">הזמנת שירות מקוון</h2>
              <p className="text-muted-foreground max-w-2xl">
                מלא את הפרטים ואנו ניצור איתך קשר בהקדם לתיאום מועד לביצוע השירות.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <BookingForm />
            </div>
          </div>
        </section>
        
        <section id="צור קשר" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <ContactInfo />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

// Missing Calendar component import
function Calendar(props: { className: string }) {
  return <span {...props} />;
}
