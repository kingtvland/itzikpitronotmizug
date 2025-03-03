
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  username: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

// מידע סטטי של המנהל - במערכת אמיתית זה יגיע מבסיס נתונים
const ADMIN_USER = {
  username: 'admin',
  password: 'admin123', // בפיתוח אמיתי צריך להשתמש בהצפנה
  isAdmin: true
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // בדיקה אם המשתמש מחובר בטעינת העמוד
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // בדיקת פרטי התחברות מול הנתונים הסטטיים
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      const userData = {
        username: ADMIN_USER.username,
        isAdmin: ADMIN_USER.isAdmin
      };
      
      // שמירת המשתמש בלוקל סטורג'
      localStorage.setItem('authUser', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
