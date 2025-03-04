import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Imports dos componentes de barbeiro para teste
import BarberDashboard from './barber/Dashboard';
import BarberAppointments from './barber/Appointments';
import BarberServices from './barber/Services';
import BarberClients from './barber/Clients';
import BarberStatistics from './barber/Statistics';
import BarberProfile from './barber/Profile';
import BarberSettings from './barber/Settings';

// Componente para cartão de seleção
const ComponentCard = ({ 
  title, 
  description, 
  onClick, 
  isActive 
}: { 
  title: string; 
  description: string; 
  onClick: () => void; 
  isActive: boolean;
}) => (
  <div 
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      isActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-card hover:bg-muted/50'
    }`}
    onClick={onClick}
  >
    <h3 className="font-medium">{title}</h3>
    <p className={`text-sm ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
      {description}
    </p>
  </div>
);

// Função para obter parâmetros da URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TestBench = () => {
  // Estado para controlar qual componente está sendo testado
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const query = useQuery();
  
  // Lista de componentes disponíveis para teste
  const components = [
    { 
      id: 'dashboard', 
      title: 'Dashboard',
      description: 'Painel principal com visão geral de métricas e agendamentos',
      component: <BarberDashboard />
    },
    { 
      id: 'appointments', 
      title: 'Agendamentos',
      description: 'Gestão de agendamentos e calendário',
      component: <BarberAppointments />
    },
    { 
      id: 'services', 
      title: 'Serviços',
      description: 'Gerenciamento dos serviços oferecidos',
      component: <BarberServices />
    },
    { 
      id: 'clients', 
      title: 'Clientes',
      description: 'Lista de clientes e histórico de atendimento',
      component: <BarberClients />
    },
    { 
      id: 'statistics', 
      title: 'Estatísticas',
      description: 'Gráficos e métricas de desempenho',
      component: <BarberStatistics />
    },
    { 
      id: 'profile', 
      title: 'Perfil',
      description: 'Gerenciamento do perfil profissional',
      component: <BarberProfile />
    },
    { 
      id: 'settings', 
      title: 'Configurações',
      description: 'Configurações da conta e preferências',
      component: <BarberSettings />
    }
  ];
  
  // Verificar se há um componente especificado na URL
  useEffect(() => {
    const componentParam = query.get('component');
    if (componentParam && components.some(c => c.id === componentParam)) {
      setActiveComponent(componentParam);
    }
  }, [query]);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">BarberMatch - Bancada de Testes</h1>
        <p className="text-muted-foreground">
          Use esta página para testar os componentes da área do barbeiro de forma isolada.
        </p>
        <div className="flex gap-2 mt-4">
          <Link 
            to="/"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Voltar para Home
          </Link>
          <button
            onClick={() => {
              setActiveComponent(null);
              window.history.pushState({}, '', '/test-bench');
            }}
            className="px-4 py-2 border rounded-md hover:bg-muted"
          >
            Resetar Seleção
          </button>
        </div>
      </div>
      
      {!activeComponent ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Selecione um componente para testar:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((comp) => (
              <ComponentCard
                key={comp.id}
                title={comp.title}
                description={comp.description}
                onClick={() => {
                  setActiveComponent(comp.id);
                  window.history.pushState({}, '', `/test-bench?component=${comp.id}`);
                }}
                isActive={activeComponent === comp.id}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Testando: {components.find(c => c.id === activeComponent)?.title}
            </h2>
            <button
              onClick={() => {
                setActiveComponent(null);
                window.history.pushState({}, '', '/test-bench');
              }}
              className="px-4 py-2 border rounded-md hover:bg-muted"
            >
              Voltar para seleção
            </button>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            {components.find(c => c.id === activeComponent)?.component}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestBench; 