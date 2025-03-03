
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useAnimation";
import { toast } from "sonner";

const BookingForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px'
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("ההזמנה התקבלה בהצלחה! ניצור איתך קשר בקרוב.");
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        // Reset form values here
      }, 3000);
    }, 1500);
  };
  
  if (isSuccess) {
    return (
      <div 
        className="glass-card p-8 text-center flex flex-col items-center justify-center space-y-6 min-h-[400px]"
      >
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">ההזמנה התקבלה בהצלחה!</h3>
        <p className="text-muted-foreground max-w-md">
          קיבלנו את פרטי ההזמנה שלך. אחד הנציגים שלנו ייצור איתך קשר בהקדם לתיאום מועד סופי.
        </p>
        <Button 
          onClick={() => setIsSuccess(false)}
          variant="outline"
        >
          חזרה לטופס
        </Button>
      </div>
    );
  }
  
  return (
    <div 
      ref={elementRef}
      className={`glass-card p-6 md:p-8 transition-all duration-500 ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="service">סוג השירות המבוקש</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="בחר שירות" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="installation">התקנת מזגן חדש</SelectItem>
                  <SelectItem value="repair">תיקון מזגן</SelectItem>
                  <SelectItem value="maintenance">ניקוי וטיפול תקופתי</SelectItem>
                  <SelectItem value="inspection">בדיקה ואבחון</SelectItem>
                  <SelectItem value="consultation">ייעוץ לפני רכישה</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="acType">סוג המזגן</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="בחר סוג" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="split">מזגן עילי (ספליט)</SelectItem>
                  <SelectItem value="inverter">מזגן אינוורטר</SelectItem>
                  <SelectItem value="mini-central">מיני מרכזי</SelectItem>
                  <SelectItem value="portable">מזגן נייד</SelectItem>
                  <SelectItem value="other">אחר</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>דחיפות</Label>
              <RadioGroup defaultValue="standard" className="flex space-x-4 rtl">
                <div className="flex items-center space-x-2 rtl">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="cursor-pointer">דחוף (תוך 4 שעות)</Label>
                </div>
                
                <div className="flex items-center space-x-2 rtl">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="cursor-pointer">רגיל</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label>תאריך מועדף</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right"
                  >
                    {date ? (
                      format(date, "dd/MM/yyyy")
                    ) : (
                      <span className="text-muted-foreground">בחר תאריך</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">שם מלא</Label>
              <Input id="name" required placeholder="הכנס את שמך המלא" dir="rtl" />
            </div>
            
            <div>
              <Label htmlFor="phone">מספר טלפון</Label>
              <Input id="phone" type="tel" required placeholder="הכנס מספר טלפון" dir="rtl" />
            </div>
            
            <div>
              <Label htmlFor="address">כתובת מלאה</Label>
              <Input id="address" required placeholder="רחוב, מספר בית, עיר" dir="rtl" />
            </div>
            
            <div>
              <Label htmlFor="message">הערות נוספות</Label>
              <Textarea 
                id="message" 
                placeholder="פרטים נוספים שחשוב לנו לדעת..." 
                className="resize-none" 
                rows={4}
                dir="rtl"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="min-w-[150px] btn-primary-effect"
            disabled={isSubmitting}
          >
            {isSubmitting ? "שולח..." : "שלח הזמנה"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
