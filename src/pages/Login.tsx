
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('יש להזין שם משתמש וסיסמה');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (success) {
        toast.success('התחברת בהצלחה');
        navigate('/admin');
      } else {
        toast.error('שם משתמש או סיסמה שגויים');
      }
    } catch (error) {
      toast.error('אירעה שגיאה בהתחברות');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="max-w-md w-full p-8 bg-background rounded-xl shadow-lg border border-border">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">כניסה למערכת הניהול</h1>
          <p className="text-muted-foreground mt-2">הזן את פרטי ההתחברות שלך</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">שם משתמש</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="הזן שם משתמש"
              className="text-right"
              dir="rtl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">סיסמה</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הזן סיסמה"
              className="text-right"
              dir="rtl"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'מתחבר...' : 'התחבר'}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="font-medium">פרטי התחברות לדוגמה:</p>
            <p>שם משתמש: admin</p>
            <p>סיסמה: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
