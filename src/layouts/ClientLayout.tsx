import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Scissors, 
  MapPin, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import AnimatedLogo from '@/components/AnimatedLogo';

const ClientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleLogout = () => {
    // Implementação futura da lógica de logout
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    window.location.href = '/login';
  };

  // Simulação de notificações - em produção viriam de uma API
  const notifications = [
    {
      id: 1,
      message: 'Seu agendamento para hoje às 15:00 foi confirmado',
      time: '2 horas atrás',
      read: false
    },
    {
      id: 2,
      message: 'Alex Martin cancelou seu agendamento para amanhã',
      time: '5 horas atrás',
      read: true
    },
    {
      id: 3,
      message: 'Nova promoção: 20% de desconto em cortes na Barbearia VIP',
      time: '1 dia atrás',
      read: true
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Mobile Overlay */}
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
          <Link to="/app" className="flex items-center">
            <AnimatedLogo size="small" />
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
          <Link 
            to="/app" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <User size={18} />
            <span>Painel</span>
          </Link>
          
          <Link 
            to="/app/appointments" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <Calendar size={18} />
            <span>Agendamentos</span>
          </Link>
          
          <Link 
            to="/app/try-on" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <Scissors size={18} />
            <span>Experimentar Cortes</span>
          </Link>
          
          <Link 
            to="/app/find-barbers" 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
          >
            <MapPin size={18} />
            <span>Encontrar Barbeiros</span>
          </Link>
          
          <Link 
            to="/app/profile" 
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
        <header className="sticky top-0 z-30 flex h-16 items-center bg-background/80 backdrop-blur-sm border-b px-4 justify-between">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 text-muted-foreground hover:text-foreground" 
              onClick={toggleSidebar}
              aria-label="Abrir menu"
            >
              <Menu size={20} />
            </button>
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Buscar barbeiros, cortes..."
                className="w-[300px] pl-9 pr-4 py-2 text-sm border rounded-md bg-muted"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notificações */}
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="relative p-2 rounded-full hover:bg-muted"
                aria-label="Notificações"
              >
                <Bell size={20} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-card border rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="p-3 border-b">
                    <h3 className="font-medium">Notificações</h3>
                  </div>
                  
                  <div className="max-h-96 overflow-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b hover:bg-muted/50 ${!notification.read ? 'bg-primary/5' : ''}`}
                        >
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        <p>Nenhuma notificação.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2 text-center border-t">
                    <button className="text-xs text-primary hover:underline">
                      Marcar todas como lidas
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <span className="text-sm hidden md:inline-block">Olá, João Silva</span>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              J
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

export default ClientLayout; 