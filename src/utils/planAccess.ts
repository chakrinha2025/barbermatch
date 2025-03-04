export type FeatureType = 
  | 'trends' 
  | 'virtual' 
  | 'scheduling' 
  | 'finder' 
  | 'chat' 
  | 'business';

export type PlanType = 
  | 'free' 
  | 'basic' 
  | 'professional' 
  | 'premium';

export interface FeatureAccess {
  name: string;
  description: string;
  icon: string;
  minimumPlan: PlanType;
  limitedAccess?: {
    free?: string;
    basic?: string;
  };
  appOnly?: boolean;
  demoAvailable?: boolean;
}

export const FEATURE_ACCESS: Record<FeatureType, FeatureAccess> = {
  trends: {
    name: 'Análise de Tendências',
    description: 'Descubra as tendências do mundo da barbearia com análises baseadas em IA',
    icon: 'trend-up',
    minimumPlan: 'professional',
    limitedAccess: {
      basic: 'Acesso apenas à análises básicas, sem IA preditiva'
    },
    demoAvailable: true
  },
  virtual: {
    name: 'Experiência Virtual',
    description: 'Experimente cortes virtualmente com realidade aumentada',
    icon: 'sparkles',
    minimumPlan: 'basic',
    appOnly: true,
    demoAvailable: true
  },
  scheduling: {
    name: 'Agendamento Inteligente',
    description: 'Sistema avançado de agendamento com lembretes automáticos',
    icon: 'calendar',
    minimumPlan: 'free',
    limitedAccess: {
      free: 'Limitado a 3 agendamentos por dia'
    }
  },
  finder: {
    name: 'Descoberta de Barbeiros',
    description: 'Encontre os melhores barbeiros da sua região',
    icon: 'map-pin',
    minimumPlan: 'free'
  },
  chat: {
    name: 'Chat com Barbeiros',
    description: 'Comunique-se diretamente com os barbeiros',
    icon: 'message-square',
    minimumPlan: 'basic'
  },
  business: {
    name: 'Gestão de Negócio',
    description: 'Dashboard completo para administrar sua barbearia',
    icon: 'store',
    minimumPlan: 'professional',
    limitedAccess: {
      basic: 'Acesso apenas a relatórios básicos e agenda'
    }
  }
};

/**
 * Verifica se um plano tem acesso a uma determinada funcionalidade
 */
export const hasAccessToFeature = (feature: FeatureType, plan: PlanType): boolean => {
  const featureConfig = FEATURE_ACCESS[feature];
  
  const planLevels: Record<PlanType, number> = {
    'free': 0,
    'basic': 1,
    'professional': 2,
    'premium': 3
  };
  
  const requiredLevel = planLevels[featureConfig.minimumPlan];
  const userLevel = planLevels[plan];
  
  return userLevel >= requiredLevel;
};

/**
 * Retorna informações sobre as limitações de acesso para um plano específico
 */
export const getAccessLimitations = (feature: FeatureType, plan: PlanType): string | null => {
  const featureConfig = FEATURE_ACCESS[feature];
  
  if (!hasAccessToFeature(feature, plan)) {
    return `Esta funcionalidade requer plano ${featureConfig.minimumPlan} ou superior`;
  }
  
  if (plan === 'free' && featureConfig.limitedAccess?.free) {
    return featureConfig.limitedAccess.free;
  }
  
  if (plan === 'basic' && featureConfig.limitedAccess?.basic) {
    return featureConfig.limitedAccess.basic;
  }
  
  return null;
};

/**
 * Verifica se um recurso requer o app
 */
export const isAppOnlyFeature = (feature: FeatureType): boolean => {
  return FEATURE_ACCESS[feature].appOnly === true;
};

/**
 * Verifica se um recurso tem demo disponível
 */
export const hasDemoAvailable = (feature: FeatureType): boolean => {
  return FEATURE_ACCESS[feature].demoAvailable === true;
};

/**
 * Formata a URL para o próximo passo com base na feature e plano
 */
export const getNextStepUrl = (feature: FeatureType, requestedPlan: PlanType): string => {
  const featureConfig = FEATURE_ACCESS[feature];
  
  // Se o recurso só está disponível no app
  if (featureConfig.appOnly) {
    return `/download?feature=${feature}`;
  }
  
  // Se o plano solicitado não é suficiente para o recurso
  if (!hasAccessToFeature(feature, requestedPlan)) {
    return `/pricing?highlight=${feature}`;
  }
  
  // Se tem demo disponível e está tentando acessar recursos premium
  if (featureConfig.demoAvailable && featureConfig.minimumPlan !== 'free') {
    return `/login?feature=${feature}&demo=true`;
  }
  
  // Caso padrão: enviar para login/signup
  return `/signup?feature=${feature}&plan=${requestedPlan}`;
}; 