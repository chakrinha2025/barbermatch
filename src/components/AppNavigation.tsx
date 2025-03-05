import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Scissors, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  User, 
  Search, 
  MapPin,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export function AppNavigation() {
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);
  
  const navigationItems: NavigationItem[] = [
    {
      path: '/app',
      label: 'Início',
      icon: <Home size={24} />,
    },
    {
      path: '/app/explore',
      label: 'Explorar',
      icon: <Search size={24} />,
    },
    {
      path: '/app/appointments',
      label: 'Agendamentos',
      icon: <Calendar size={24} />,
      badge: 1
    },
    {
      path: '/app/chat',
      label: 'Chat',
      icon: <MessageSquare size={24} />,
      badge: 2
    },
    {
      path: '/app/profile',
      label: 'Perfil',
      icon: <User size={24} />,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Barra de navegação superior */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/app" className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">BarberMatch</span>
            </Link>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin size={14} className="mr-1" />
              <span>Curitiba, PR</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors" aria-label="Notificações">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center rounded-full">
                  {notifications}
                </span>
              )}
            </button>
            <div className="relative w-8 h-8 overflow-hidden rounded-full">
              <img 
                src="https://randomuser.me/api/portraits/men/20.jpg" 
                alt="Perfil do usuário" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Barra de navegação inferior (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
        <div className="flex justify-around">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-3 relative ${
                isActive(item.path)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -top-2 w-1/2 h-1 bg-primary rounded-full"
                  initial={false}
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
              {item.badge && (
                <span className="absolute top-2 right-1/4 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Barra de navegação lateral (desktop) */}
      <nav className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 border-r p-4 flex-col">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md relative ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto w-5 h-5 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t">
          <Link 
            to="/app/trends" 
            className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/5 text-primary hover:bg-primary/10"
          >
            <TrendingUp size={20} />
            <span>Explorar Tendências</span>
          </Link>
        </div>
      </nav>
    </>
  );
} 