import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FeatureType, 
  PlanType, 
  FEATURE_ACCESS, 
  hasAccessToFeature, 
  getAccessLimitations 
} from '@/utils/planAccess';
import { 
  AlertCircle, 
  Lock, 
  CheckCircle, 
  Download, 
  ArrowRight,
  Calendar,
  TrendingUp,
  MessageSquare,
  Sparkles,
  MapPin,
  Store
} from 'lucide-react';

// Simula o usuário atual (em produção, isso viria do seu contexto de autenticação)
const useCurrentUser = () => {
  // Simulação - em produção, você obteria isso do seu contexto de auth
  return {
    isLoggedIn: false,
    plan: 'free' as PlanType,
    hasDownloadedApp: false
  };
};

// Obtém o ícone correspondente para uma feature
const getFeatureIcon = (feature: FeatureType) => {
  const icons = {
    trends: <TrendingUp className="h-5 w-5" />,
    virtual: <Sparkles className="h-5 w-5" />,
    scheduling: <Calendar className="h-5 w-5" />,
    finder: <MapPin className="h-5 w-5" />,
    chat: <MessageSquare className="h-5 w-5" />,
    business: <Store className="h-5 w-5" />
  };
  
  return icons[feature] || <AlertCircle className="h-5 w-5" />;
};

interface FeatureAccessCheckProps {
  feature: FeatureType;
  requestedPlan?: PlanType;
  children: React.ReactNode;
}

/**
 * Componente que verifica se o usuário tem acesso a uma funcionalidade.
 * Se não tiver, mostra uma mensagem explicativa e opções para upgrade.
 */
const FeatureAccessCheck: React.FC<FeatureAccessCheckProps> = ({
  feature,
  requestedPlan = 'free',
  children
}) => {
  const { isLoggedIn, plan, hasDownloadedApp } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAccessModal, setShowAccessModal] = useState(false);
  
  const featureConfig = FEATURE_ACCESS[feature];
  const hasAccess = isLoggedIn && hasAccessToFeature(feature, plan);
  const limitations = isLoggedIn ? getAccessLimitations(feature, plan) : null;
  
  // Verifica a URL para determinar se estamos em modo de demonstração
  const isDemo = location.search.includes('demo=true');
  
  useEffect(() => {
    // Se estiver no modo de demonstração, não faz redirecionamentos
    if (isDemo) return;
    
    // Se não está logado, redireciona para login
    if (!isLoggedIn) {
      setShowAccessModal(true);
      return;
    }
    
    // Se é um recurso que requer o app e o usuário não tem o app
    if (featureConfig.appOnly && !hasDownloadedApp) {
      setShowAccessModal(true);
      return;
    }
    
    // Se não tem acesso baseado no plano
    if (!hasAccess) {
      setShowAccessModal(true);
      return;
    }
  }, [isLoggedIn, hasAccess, feature, plan, hasDownloadedApp, isDemo, featureConfig.appOnly]);
  
  // Lidar com fechamento do modal de acesso
  const handleCloseModal = () => {
    setShowAccessModal(false);
  };
  
  // Redirecionar para upgrade
  const handleUpgrade = () => {
    navigate(`/pricing?highlight=${feature}`);
  };
  
  // Redirecionar para download do app
  const handleDownloadApp = () => {
    navigate(`/download?feature=${feature}`);
  };
  
  // Redirecionar para login
  const handleLogin = () => {
    navigate(`/login?feature=${feature}&plan=${requestedPlan}`);
  };
  
  // Criar mensagem adequada baseada na situação
  const getAccessMessage = () => {
    if (!isLoggedIn) {
      return `Faça login para acessar ${featureConfig.name}`;
    }
    
    if (featureConfig.appOnly && !hasDownloadedApp) {
      return `Esta funcionalidade está disponível apenas no aplicativo`;
    }
    
    if (!hasAccess) {
      return `O recurso ${featureConfig.name} requer plano ${featureConfig.minimumPlan} ou superior`;
    }
    
    return limitations;
  };
  
  // Renderiza o modal de acesso quando necessário
  const renderAccessModal = () => {
    if (!showAccessModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full p-6">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full mr-3">
              <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-bold">Acesso Limitado</h3>
          </div>
          
          <div className="mb-6">
            <div className="bg-muted/50 rounded-lg p-4 mb-4 flex items-start">
              <div className="bg-primary/20 p-2 rounded-full mr-3 mt-0.5">
                {getFeatureIcon(feature)}
              </div>
              <div>
                <h4 className="font-medium">{featureConfig.name}</h4>
                <p className="text-sm text-muted-foreground">{featureConfig.description}</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-2">{getAccessMessage()}</p>
            
            {!isLoggedIn && (
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/20 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-200">
                <p>Crie uma conta ou faça login para acessar este recurso.</p>
              </div>
            )}
            
            {isLoggedIn && !hasAccess && (
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/20 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-200">
                <p>Seu plano atual ({plan}) não inclui acesso a este recurso.</p>
              </div>
            )}
            
            {featureConfig.appOnly && !hasDownloadedApp && (
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/20 rounded-lg p-3 text-sm text-blue-800 dark:text-blue-200">
                <p>Esta funcionalidade está disponível apenas no aplicativo BarberMatch.</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Opções variadas dependendo da situação */}
            {!isLoggedIn && (
              <button 
                onClick={handleLogin}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                Entrar <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            )}
            
            {isLoggedIn && !hasAccess && (
              <button 
                onClick={handleUpgrade}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                Fazer Upgrade <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            )}
            
            {featureConfig.appOnly && !hasDownloadedApp && (
              <button 
                onClick={handleDownloadApp}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                Baixar App <Download className="ml-1 h-4 w-4" />
              </button>
            )}
            
            {/* Opção de fechar sempre presente */}
            <button 
              onClick={handleCloseModal}
              className="flex-1 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Se estiver no modo demo, sempre mostra o conteúdo
  if (isDemo) {
    return (
      <div className="relative">
        {/* Banner de demo */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-800/30 py-2 px-4 text-center">
          <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center justify-center">
            <AlertCircle className="mr-2 h-4 w-4" />
            Modo de demonstração - Algumas funcionalidades estão limitadas
          </p>
        </div>
        
        {children}
      </div>
    );
  }
  
  // Se tem acesso, mostra o conteúdo normalmente
  if (hasAccess) {
    // Se tem limitações, mostra um banner explicativo
    if (limitations) {
      return (
        <div className="relative">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/30 py-2 px-4 text-center">
            <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center justify-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              {limitations}
            </p>
          </div>
          
          {children}
        </div>
      );
    }
    
    // Sem limitações, conteúdo normal
    return <>{children}</>;
  }
  
  // Se não tem acesso, mostra o modal e uma versão limitada do conteúdo
  return (
    <>
      {renderAccessModal()}
      
      <div className="relative">
        <div className="absolute inset-0 bg-gray-200/70 dark:bg-gray-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm mx-auto text-center">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mx-auto mb-4 w-fit">
              <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">Acesso Restrito</h3>
            <p className="text-sm text-muted-foreground mb-4">{getAccessMessage()}</p>
            
            {!isLoggedIn && (
              <button 
                onClick={handleLogin}
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                Entrar para Acessar <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            )}
            
            {isLoggedIn && !hasAccess && (
              <button 
                onClick={handleUpgrade}
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                Fazer Upgrade <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            )}
            
            {featureConfig.appOnly && !hasDownloadedApp && (
              <button 
                onClick={handleDownloadApp}
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center mt-2"
              >
                Baixar App <Download className="ml-1 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Conteúdo embaçado ao fundo */}
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      </div>
    </>
  );
};

export default FeatureAccessCheck; 