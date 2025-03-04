import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Scissors,
  BarChart2,
  Settings, 
  CreditCard,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  Store
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedLogo from '@/components/AnimatedLogo';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Implementação futura da lógica de logout
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Mobile */}
      <div 
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`} 
        onClick={toggleSidebar}
      />
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-0`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <Link to="/admin" className="flex items-center">
            <AnimatedLogo size="small" />
            <span className="ml-2 font-bold text-primary">Admin</span>
          </Link>
          <button 
            className="lg:hidden text-muted-foreground hover:text-foreground" 
            onClick={toggleSidebar}
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2 pl-3">
            GERAL
          </div>
          
          <Link 
            to="/admin" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          
          <div className="text-xs font-semibold text-muted-foreground mt-6 mb-2 pl-3">
            USUÁRIOS
          </div>
          
          <Link 
            to="/admin/users" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <Users size={18} />
            <span>Clientes</span>
          </Link>
          
          <Link 
            to="/admin/barbers" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <Scissors size={18} />
            <span>Barbeiros</span>
          </Link>
          
          <Link 
            to="/admin/barbershops" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <Store size={18} />
            <span>Barbearias</span>
          </Link>
          
          <div className="text-xs font-semibold text-muted-foreground mt-6 mb-2 pl-3">
            RELATÓRIOS
          </div>
          
          <Link 
            to="/admin/reports" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <BarChart2 size={18} />
            <span>Estatísticas</span>
          </Link>
          
          <Link 
            to="/admin/financial" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <CreditCard size={18} />
            <span>Financeiro</span>
          </Link>
          
          <div className="text-xs font-semibold text-muted-foreground mt-6 mb-2 pl-3">
            SISTEMA
          </div>
          
          <Link 
            to="/admin/settings" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <Settings size={18} />
            <span>Configurações</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-destructive"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <ThemeToggle />
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center bg-background/80 backdrop-blur-sm border-b px-4">
          <button 
            className="lg:hidden mr-4 text-muted-foreground hover:text-foreground" 
            onClick={toggleSidebar}
            aria-label="Abrir menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center">
            <ShieldAlert className="text-primary mr-2" size={20} />
            <span className="font-medium">Painel Administrativo</span>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm">Administrador</span>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              A
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 