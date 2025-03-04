import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  DollarSign,
  Scissors,
  TrendingUp,
  ClipboardList,
  Store
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

// Implementação local da função useMediaQuery
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Definir o valor inicial
    setMatches(mediaQuery.matches);
    
    // Criar um listener para mudanças
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Adicionar o listener
    mediaQuery.addEventListener("change", handler);
    
    // Remover o listener na limpeza
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}

export default function BarberShopOwnerLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
  // Fechar o menu ao navegar em dispositivos móveis
  useEffect(() => {
    if (!isDesktop) {
      setIsOpen(false);
    }
  }, [location.pathname, isDesktop]);

  // Ajustar o estado do menu conforme o tamanho da tela
  useEffect(() => {
    if (isDesktop) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isDesktop]);

  const handleLogout = () => {
    // Simulação de logout
    toast.success("Sessão encerrada", {
      description: "Você saiu com sucesso da sua conta",
    });
    
    // Redirecionamento após logout
    navigate("/barbershop-login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Overlay para dispositivos móveis */}
      {isOpen && !isDesktop && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: isDesktop ? 0 : -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 20 }}
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-[280px] border-r bg-card lg:static shadow-lg lg:shadow-none",
          !isOpen && "hidden lg:block"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo e Perfil */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold tracking-tight">BarberMatch</span>
              </div>
              {!isDesktop && (
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            <div className="mt-6 flex items-center gap-4">
              <Avatar className="h-10 w-10 border border-primary/20">
                <AvatarImage src="/images/barber-shop-logo.jpg" alt="Logo da barbearia" />
                <AvatarFallback className="bg-primary/10 text-primary">BS</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <h3 className="text-sm font-medium leading-none truncate">
                  Barbearia Elegance
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Plano Premium
                </p>
              </div>
            </div>
          </div>
          
          {/* Menu de Navegação */}
          <nav className="flex-1 overflow-y-auto px-3 py-6">
            <div className="space-y-1">
              <NavLink 
                to="/barbershop" 
                end
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-muted-foreground"
                  )
                }
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>
              
              <NavLink 
                to="/barbershop/employees" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-muted-foreground"
                  )
                }
              >
                <Users className="h-4 w-4" />
                <span>Funcionários</span>
              </NavLink>
              
              <NavLink 
                to="/barbershop/appointments" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-muted-foreground"
                  )
                }
              >
                <Calendar className="h-4 w-4" />
                <span>Agendamentos</span>
              </NavLink>
              
              <NavLink 
                to="/barbershop/services" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-muted-foreground"
                  )
                }
              >
                <Scissors className="h-4 w-4" />
                <span>Serviços</span>
              </NavLink>
              
              <NavLink 
                to="/barbershop/financial" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-muted-foreground"
                  )
                }
              >
                <DollarSign className="h-4 w-4" />
                <span>Financeiro</span>
              </NavLink>
              
              <NavLink 
                to="/barbershop/analytics" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-muted-foreground"
                  )
                }
              >
                <TrendingUp className="h-4 w-4" />
                <span>Análises</span>
              </NavLink>
              
              <NavLink 
                to="/barbershop/reports" 
                className={({ isActive }) => 
                  cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-muted-foreground"
                  )
                }
              >
                <ClipboardList className="h-4 w-4" />
                <span>Relatórios</span>
              </NavLink>
            </div>
          </nav>
          
          {/* Ações na parte inferior */}
          <div className="mt-auto border-t px-6 py-4">
            <div className="flex items-center justify-between">
              <NavLink 
                to="/barbershop/settings" 
                className={({ isActive }) => 
                  cn("flex items-center gap-2 text-sm",
                    isActive 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </NavLink>
              <ThemeToggle />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4 w-full justify-start text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </motion.aside>
      
      {/* Conteúdo principal */}
      <main className="flex-1 overflow-hidden">
        {/* Header superior */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </Button>
          
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Store className="mr-2 h-4 w-4" />
              Minha Barbearia
            </Button>
          </div>
        </header>
        
        {/* Conteúdo da página */}
        <div className="overflow-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 