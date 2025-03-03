
import { Snowflake } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  
  const links = [
    { label: "שירותים", href: "#services" },
    { label: "אודות", href: "#about" },
    { label: "המלצות", href: "#testimonials" },
    { label: "צור קשר", href: "#contact" },
    { label: "הזמן שירות", href: "#booking" },
    { label: "מדיניות פרטיות", href: "#" },
    { label: "תנאי שימוש", href: "#" },
  ];
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <Snowflake className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">CoolAir</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              שירותי מיזוג אוויר מקצועיים ואמינים לבית ולעסק. התקנה, תיקון, תחזוקה ועוד.
              זמינים בכל רחבי אזור המרכז, עם שירות אדיב ומקצועי.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">ניווט מהיר</h3>
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
            <h3 className="font-semibold text-lg">שעות פעילות</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between">
                <span>ימים א׳-ה׳:</span>
                <span>8:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>יום ו׳:</span>
                <span>8:00 - 13:00</span>
              </li>
              <li className="flex justify-between">
                <span>שבת:</span>
                <span>סגור</span>
              </li>
              <li className="mt-4 pt-4 border-t border-border">
                <span className="font-medium">שירותי חירום:</span> 24/7
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {year} CoolAir טכנאי מזגנים. כל הזכויות שמורות.
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
