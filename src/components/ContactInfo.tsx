
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useAnimation";

const ContactInfo = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  });
  
  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "התקשר אלינו",
      value: "072-1234567",
      action: () => window.location.href = "tel:+97272123456",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "דוא״ל",
      value: "info@ac-tech.co.il",
      action: () => window.location.href = "mailto:info@ac-tech.co.il",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "כתובת",
      value: "רחוב הרצל 52, תל אביב",
      action: () => window.open("https://maps.google.com"),
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "שעות פעילות",
      value: "א׳-ה׳: 8:00-20:00, ו׳: 8:00-13:00",
    },
  ];
  
  const socialLinks = [
    { icon: <Facebook />, url: "#" },
    { icon: <Instagram />, url: "#" },
    { icon: <Linkedin />, url: "#" },
  ];
  
  const stats = [
    { icon: <Users />, value: "1,200+", label: "לקוחות מרוצים" },
    { icon: <Clock />, value: "24/7", label: "שירות חירום" },
    { icon: <MapPin />, value: "כל הארץ", label: "אזורי שירות" },
  ];
  
  return (
    <div
      ref={elementRef}
      className={`transition-all duration-500 ${
        isIntersecting ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold">צור קשר</h3>
            <p className="text-muted-foreground">
              אנחנו כאן לכל שאלה או בקשה. ניתן ליצור איתנו קשר באחת מהדרכים הבאות:
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="glass-card p-4 flex flex-col hover:shadow-glass transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {method.icon}
                  </div>
                  <div className="font-medium">{method.title}</div>
                </div>
                <div className="text-muted-foreground mb-3">{method.value}</div>
                {method.action && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-auto self-start text-primary hover:text-primary hover:bg-primary/10"
                    onClick={method.action}
                  >
                    צור קשר
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 rtl">
            <div className="text-muted-foreground">עקבו אחרינו:</div>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-glass">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27035.55995429554!2d34.777233639657654!3d32.08809305723361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca40c52f899%3A0x6b008c2efb95e97b!2sTel%20Aviv-Yafo%2C%20Israel!5e0!3m2!1sen!2sus!4v1678997726994!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass-card p-6 text-center flex flex-col items-center justify-center space-y-2 hover:shadow-glass-lg transition-all duration-300 group"
          >
            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
