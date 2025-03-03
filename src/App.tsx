
import React from 'react';
import './App.css';
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './providers/ThemeProvider';

// דפים
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <Router>
            <Toaster position="top-center" />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
