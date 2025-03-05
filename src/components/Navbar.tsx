
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ThemeToggle';
import { 
  Menu, User, LogOut, Bell, MessageSquare, 
  Scissors, Shield, Calendar, Settings 
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary">
                BarberMatch
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/features" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground">
                Recursos
              </Link>
              <Link to="/pricing" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                Planos
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-muted-foreground hover:text-foreground">
                Sobre
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <ModeToggle />
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/auth/register">
              <Button size="sm">Cadastre-se</Button>
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
