
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, Clock, Phone, User, MapPin, Clipboard, CheckCircle, XCircle } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useAnimation";
import { toast } from "sonner";

// Mock data for bookings
const initialBookings = [
  {
    id: 1,
    customerName: "דוד כהן",
    phoneNumber: "050-1234567",
    service: "התקנת מזגן חדש",
    date: "2023-06-15",
    time: "10:00",
    address: "רחוב הרצל 45, תל אביב",
    status: "ממתין",
    notes: "מזגן מסוג אלקטרה 1.5 כ״ס"
  },
  {
    id: 2,
    customerName: "שרה לוי",
    phoneNumber: "052-7654321",
    service: "תיקון מזגן",
    date: "2023-06-16",
    time: "12:30",
    address: "רחוב בן גוריון 12, רמת גן",
    status: "אושר",
    notes: "המזגן לא מקרר כראוי"
  },
  {
    id: 3,
    customerName: "יוסי אברהם",
    phoneNumber: "054-9876543",
    service: "ניקוי וחיטוי מזגנים",
    date: "2023-06-17",
    time: "15:00",
    address: "רחוב סוקולוב 30, רעננה",
    status: "הושלם",
    notes: "שני מזגנים בבית"
  }
];

const CrmSystem = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("הכל");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px'
  });
  
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.includes(searchTerm) || 
      booking.phoneNumber.includes(searchTerm) ||
      booking.address.includes(searchTerm) ||
      booking.service.includes(searchTerm);
    
    const matchesStatus = statusFilter === "הכל" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus } 
          : booking
      )
    );
    
    toast.success(`סטטוס ההזמנה עודכן ל-${newStatus}`);
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case "ממתין":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">ממתין</Badge>;
      case "אושר":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">אושר</Badge>;
      case "הושלם":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">הושלם</Badge>;
      case "בוטל":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">בוטל</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div 
      ref={elementRef}
      className={`transition-all duration-500 ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="bg-white rounded-xl border border-border shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">ניהול הזמנות</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="חיפוש לפי שם, טלפון, כתובת..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-right"
              dir="rtl"
            />
          </div>
          
          <div className="w-full sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="סטטוס" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="הכל">כל הסטטוסים</SelectItem>
                <SelectItem value="ממתין">ממתין</SelectItem>
                <SelectItem value="אושר">אושר</SelectItem>
                <SelectItem value="הושלם">הושלם</SelectItem>
                <SelectItem value="בוטל">בוטל</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">שם הלקוח</TableHead>
                <TableHead className="text-right">סוג השירות</TableHead>
                <TableHead className="text-right hidden md:table-cell">תאריך</TableHead>
                <TableHead className="text-right hidden lg:table-cell">שעה</TableHead>
                <TableHead className="text-right">סטטוס</TableHead>
                <TableHead className="text-right">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{booking.customerName}</TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell className="hidden md:table-cell">{booking.date}</TableCell>
                    <TableCell className="hidden lg:table-cell">{booking.time}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 rtl">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setIsDialogOpen(true);
                          }}
                        >
                          פרטים
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    לא נמצאו הזמנות התואמות את החיפוש
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {selectedBooking && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">פרטי הזמנה</DialogTitle>
              <DialogDescription className="text-center">
                הזמנה מספר #{selectedBooking.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">שם הלקוח</p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.customerName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">מספר טלפון</p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.phoneNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clipboard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">סוג השירות</p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.service}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">תאריך</p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">שעה</p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">כתובת</p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.address}</p>
                </div>
              </div>
              
              {selectedBooking.notes && (
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-medium mb-1">הערות</p>
                  <p className="text-sm text-muted-foreground">{selectedBooking.notes}</p>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">עדכון סטטוס</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="border-green-300 hover:bg-green-50"
                  onClick={() => {
                    handleStatusChange(selectedBooking.id, "אושר");
                    setIsDialogOpen(false);
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  אישור
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-red-300 hover:bg-red-50"
                  onClick={() => {
                    handleStatusChange(selectedBooking.id, "בוטל");
                    setIsDialogOpen(false);
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                  ביטול
                </Button>
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                סגור
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CrmSystem;
