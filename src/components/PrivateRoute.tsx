import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

// Esse componente será melhorado quando implementarmos a autenticação real
// Por enquanto, é apenas um esqueleto para a estrutura

type UserRole = 'client' | 'barber' | 'barbershop_owner' | 'admin';

interface PrivateRouteProps {
  children: ReactNode;
  isAdmin?: boolean;
  requiredRole?: UserRole | UserRole[];
}

const PrivateRoute = ({ 
  children, 
  isAdmin = false, 
  requiredRole
}: PrivateRouteProps) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Simulação de verificação de autenticação
    // No futuro, isso será substituído por uma verificação real com JWT ou similar
    const checkAuth = async () => {
      try {
        console.log("Verificando autenticação...");
        
        // Simular uma verificação de autenticação com um atraso menor
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Verificar se há um token de autenticação
        const token = localStorage.getItem('auth_token');
        const authenticated = token !== null;
        console.log("Usuário autenticado:", authenticated);
        
        setIsAuthenticated(authenticated);
        
        if (!authenticated) {
          setIsLoading(false);
          return;
        }
        
        // Obter a role do usuário
        const role = localStorage.getItem('user_role') as UserRole || 'client';
        setUserRole(role);
        console.log("Role do usuário:", role);
        
        // Verificar autorização baseada no isAdmin ou requiredRole
        let authorized = false;
        
        if (isAdmin) {
          // Apenas administradores podem acessar rotas de administrador
          authorized = role === 'admin';
          console.log("Acesso administrativo:", authorized);
        } 
        else if (requiredRole) {
          // Verificar se o usuário tem uma das roles necessárias
          if (Array.isArray(requiredRole)) {
            authorized = requiredRole.includes(role);
            console.log(`Verificando se ${role} está em [${requiredRole.join(', ')}]:`, authorized);
          } else {
            authorized = role === requiredRole;
            console.log(`Verificando se ${role} === ${requiredRole}:`, authorized);
          }
        } 
        else {
          // Se não há requisitos específicos, o usuário está autorizado
          authorized = true;
          console.log("Sem requisitos específicos, autorizado:", authorized);
        }
        
        setIsAuthorized(authorized);
        
        if (!authorized) {
          toast.error("Você não tem permissão para acessar esta página");
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
        setIsAuthorized(false);
        setIsLoading(false);
        toast.error("Erro ao verificar suas credenciais");
      }
    };

    checkAuth();
  }, [isAdmin, requiredRole, location.pathname]);

  if (isLoading) {
    // Podemos adicionar um componente de loading aqui
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Verificando credenciais...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("Não autenticado, redirecionando para login");
    // Redirecionar para login se não estiver autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAuthorized) {
    console.log("Não autorizado, redirecionando para dashboard apropriado");
    // Redirecionar para o dashboard apropriado se não tiver permissão
    const role = userRole || 'client';
    
    // Determinar para onde redirecionar com base na role
    let redirectPath = '/app'; // Default para clientes
    
    if (role === 'barber') {
      redirectPath = '/barber';
    } else if (role === 'barbershop_owner') {
      redirectPath = '/barbershop';
    } else if (role === 'admin') {
      redirectPath = '/admin';
    }
    
    console.log(`Redirecionando para ${redirectPath}`);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 