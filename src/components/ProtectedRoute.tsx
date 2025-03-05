import React, { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: string;
  allowedRoles?: Array<'admin' | 'client' | 'barber' | 'barbershop_owner'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  allowedRoles
}) => {
  const { user, isAuthenticated, hasPermission } = useAuth();
  const location = useLocation();

  // Verificar autenticação
  if (!isAuthenticated) {
    // Redirecionar para login e guardar a rota tentada para redirecionamento após login
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Verificar permissão específica
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <AccessDenied message="Você não tem permissão para acessar esta funcionalidade." />
    );
  }

  // Verificar se o usuário tem uma das roles permitidas
  if (allowedRoles && allowedRoles.length > 0 && user) {
    if (!allowedRoles.includes(user.role)) {
      return (
        <AccessDenied message="Seu tipo de usuário não tem acesso a esta área." />
      );
    }
  }

  // Se passou por todas as verificações, renderizar o conteúdo protegido
  return <>{children}</>;
};

// Componente de animação para acesso negado
const AccessDenied: React.FC<{ message: string }> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.2
        }}
        className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-red-100 dark:bg-red-900/20"
      >
        <Shield size={48} className="text-red-500 dark:text-red-400" />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold mb-2 text-center"
      >
        Acesso Negado
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-muted-foreground mb-8 max-w-md"
      >
        {message}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <a
          href="/"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition duration-200"
        >
          Voltar para a Página Inicial
        </a>
      </motion.div>
    </motion.div>
  );
};

export default ProtectedRoute; 