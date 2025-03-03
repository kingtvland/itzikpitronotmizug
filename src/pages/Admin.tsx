
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import CrmSystem from "@/components/CrmSystem";
import { ArrowLeft, LogOut } from "lucide-react";

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // וידוא שהמשתמש הוא מנהל
  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 ml-2" />
              חזרה לאתר
            </Button>
          </div>
          
          <div>
            <h1 className="text-xl font-bold">מערכת ניהול - איציק פיתרונות מיזוג</h1>
          </div>
          
          <div className="flex items-center">
            <div className="text-sm text-muted-foreground ml-4">
              {user?.username}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 ml-2" />
              התנתק
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-border shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">לוח בקרה</h2>
          <p className="text-muted-foreground">ברוך הבא למערכת הניהול של איציק פיתרונות מיזוג.</p>
        </div>
        
        <div>
          <CrmSystem />
        </div>
      </main>
    </div>
  );
};

export default Admin;
