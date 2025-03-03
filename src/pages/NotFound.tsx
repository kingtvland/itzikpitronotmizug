
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">העמוד לא נמצא</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          מצטערים, אך העמוד שאתה מחפש אינו קיים. ייתכן שהועבר, נמחק או שמעולם לא היה קיים.
        </p>
        <Link to="/">
          <Button>
            <Home className="mr-2 h-4 w-4" />
            חזרה לדף הבית
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
