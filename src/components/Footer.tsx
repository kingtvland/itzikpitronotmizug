
import { useState } from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  const [showLogo, setShowLogo] = useState(true);
  
  const toggleLogo = () => {
    setShowLogo(!showLogo);
  };
  
  const links = [
    { label: "שירותים", href: "#services" },
    { label: "צור קשר", href: "#צור קשר" },
    { label: "הזמן שירות", href: "#booking" },
    { label: "מדיניות פרטיות", href: "#" },
    { label: "תנאי שימוש", href: "#" },
  ];
  
  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      <div className="absolute -top-20 opacity-5 right-0 pointer-events-none">
        <img 
          src={showLogo ? "/logo1.png" : "/logo2.png"} 
          alt="לוגו" 
          className="w-96 h-96 object-contain"
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary mb-4">
              <img 
                src={showLogo ? "/logo1.png" : "/logo2.png"} 
                alt="איציק פיתרונות מיזוג" 
                className="h-16 cursor-pointer hover:scale-105 transition-all duration-300 border border-primary/20 rounded-full p-1" 
                onClick={toggleLogo}
              />
            </div>
            <p className="text-muted-foreground max-w-md">
              איציק פיתרונות מיזוג - שירותי מיזוג אוויר מקצועיים ואמינים לבית ולעסק. התקנה, תיקון, תחזוקה ועוד.
              זמינים בכל רחבי אזור המרכז, עם שירות אדיב ומקצועי.
            </p>
            <p className="text-primary font-bold">
              טלפון: 050-2290880
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-border pb-2">ניווט מהיר</h3>
            <nav className="grid grid-cols-2 gap-2">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-border pb-2">שעות פעילות</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between border border-border/50 p-2 rounded-md">
                <span>ימים א׳-ה׳:</span>
                <span>8:00 - 20:00</span>
              </li>
              <li className="flex justify-between border border-border/50 p-2 rounded-md">
                <span>יום ו׳:</span>
                <span>8:00 - 13:00</span>
              </li>
              <li className="flex justify-between border border-border/50 p-2 rounded-md">
                <span>שבת:</span>
                <span>סגור</span>
              </li>
              <li className="mt-4 pt-4 border-t border-border">
                <span className="font-medium text-primary">שירותי חירום:</span> 24/7
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {year} איציק פיתרונות מיזוג. כל הזכויות שמורות.
          </div>
          
          <div className="text-sm text-muted-foreground mt-4 md:mt-0">
            עוצב ופותח ע״י Lovable
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
