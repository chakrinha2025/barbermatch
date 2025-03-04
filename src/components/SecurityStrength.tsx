import React, { useMemo } from 'react';
import { Lock, LucideIcon, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';
import { calcWidthPercentage } from '@/lib/animations';

interface SecurityFactorProps {
  title: string;
  description: string;
  isComplete: boolean;
  icon: LucideIcon;
}

const SecurityFactor: React.FC<SecurityFactorProps> = ({
  title,
  description,
  isComplete,
  icon: Icon,
}) => {
  return (
    <div className="flex items-start mb-4">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
        isComplete ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-500 dark:bg-amber-900/30 dark:text-amber-400'
      }`}>
        <Icon size={16} />
      </div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="ml-auto">
        {isComplete ? (
          <span className="text-xs font-medium text-green-600 dark:text-green-400">Concluído</span>
        ) : (
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Pendente</span>
        )}
      </div>
    </div>
  );
};

interface SecurityStrengthProps {
  emailVerified: boolean;
  phoneVerified: boolean;
  has2FA?: boolean;
  hasPIN?: boolean;
  hasStrongPassword?: boolean;
  showStrengthMeter?: boolean;
  className?: string;
}

export const SecurityStrength: React.FC<SecurityStrengthProps> = ({
  emailVerified,
  phoneVerified,
  has2FA = false,
  hasPIN = false,
  hasStrongPassword = true,
  showStrengthMeter = true,
  className = '',
}) => {
  // Calcular pontuação de segurança (0-100)
  const securityScore = useMemo(() => {
    let score = 0;
    
    // Email verificado vale 20 pontos
    if (emailVerified) score += 20;
    
    // Telefone verificado vale 20 pontos
    if (phoneVerified) score += 20;
    
    // 2FA vale 25 pontos
    if (has2FA) score += 25;
    
    // PIN vale 15 pontos
    if (hasPIN) score += 15;
    
    // Senha forte vale 20 pontos
    if (hasStrongPassword) score += 20;
    
    return score;
  }, [emailVerified, phoneVerified, has2FA, hasPIN, hasStrongPassword]);
  
  // Obter estado da segurança
  const getSecurityLevel = () => {
    if (securityScore >= 80) return { label: 'Excelente', color: 'bg-green-500' };
    if (securityScore >= 60) return { label: 'Boa', color: 'bg-blue-500' };
    if (securityScore >= 40) return { label: 'Média', color: 'bg-amber-500' };
    return { label: 'Fraca', color: 'bg-red-500' };
  };
  
  const securityLevel = getSecurityLevel();
  
  return (
    <div className={`p-6 rounded-lg border bg-card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Segurança da Conta</h3>
        
        {showStrengthMeter && (
          <div className="flex items-center">
            <span className="text-sm mr-3">{securityLevel.label}</span>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${securityLevel.color} ${calcWidthPercentage(securityScore, 100)}`} />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <SecurityFactor
          title="Email Verificado"
          description="Confirme que você tem acesso ao seu email"
          isComplete={emailVerified}
          icon={Lock}
        />
        
        <SecurityFactor
          title="Número de Telefone Verificado" 
          description="Adicione uma camada extra de segurança e facilite a recuperação da conta"
          isComplete={phoneVerified}
          icon={Lock}
        />
        
        {has2FA !== undefined && (
          <SecurityFactor
            title="Autenticação de Dois Fatores"
            description="Proteja sua conta com uma segunda camada de verificação"
            isComplete={has2FA}
            icon={ShieldCheck}
          />
        )}
        
        {hasPIN !== undefined && (
          <SecurityFactor
            title="PIN de Segurança"
            description="Crie um PIN para operações sensíveis"
            isComplete={hasPIN}
            icon={ShieldAlert}
          />
        )}
        
        {hasStrongPassword !== undefined && (
          <SecurityFactor
            title="Senha Forte"
            description="Sua senha atende aos requisitos mínimos de segurança"
            isComplete={hasStrongPassword}
            icon={ShieldX}
          />
        )}
      </div>
    </div>
  );
};

export default SecurityStrength; 