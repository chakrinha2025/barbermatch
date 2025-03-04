import React from 'react';
import { BadgeCheck, Shield, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type VerificationType = 'email' | 'phone';

interface VerificationBadgeProps {
  type: VerificationType;
  isVerified: boolean;
  value: string;
  userType: 'client' | 'barber' | 'barbershop_owner';
  onStartVerification?: () => void;
  className?: string;
  animateOnVerify?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  type,
  isVerified,
  value,
  userType,
  onStartVerification,
  className = '',
  animateOnVerify = true
}) => {
  // Obter ícone correto para o tipo de verificação
  const getIcon = (size: number = 12) => {
    if (type === 'email') {
      return isVerified 
        ? <BadgeCheck size={size} className="mr-1" /> 
        : <Mail size={size} className="mr-1" />;
    } else {
      return isVerified 
        ? <BadgeCheck size={size} className="mr-1" /> 
        : <Phone size={size} className="mr-1" />;
    }
  };
  
  // Obter texto para o status
  const getStatusText = () => {
    if (type === 'email') {
      return isVerified ? 'Email verificado' : 'Verificar email';
    } else {
      return isVerified ? 'Telefone verificado' : 'Verificar telefone';
    }
  };
  
  // Obter URL de verificação (caso não tenha callback)
  const getVerificationUrl = () => {
    if (type === 'email') {
      return `/email-verification?email=${encodeURIComponent(value)}&type=${userType}`;
    } else {
      return `/phone-verification?phone=${encodeURIComponent(value)}&type=${userType}&method=sms`;
    }
  };
  
  // Classes para o badge
  const baseClasses = `flex items-center px-2 py-1 rounded-full text-xs ${
    isVerified 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
  } ${className}`;
  
  // Badge animado de verificado
  if (isVerified && animateOnVerify) {
    return (
      <motion.div
        className={baseClasses}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      >
        {getIcon()}
        <span>{getStatusText()}</span>
      </motion.div>
    );
  }
  
  // Badge para não verificado com ação
  if (!isVerified && onStartVerification) {
    return (
      <div className={baseClasses}>
        {getIcon()}
        <button onClick={onStartVerification} className="hover:underline">
          {getStatusText()}
        </button>
      </div>
    );
  }
  
  // Badge para não verificado com link
  if (!isVerified) {
    return (
      <div className={baseClasses}>
        {getIcon()}
        <Link to={getVerificationUrl()} className="hover:underline">
          {getStatusText()}
        </Link>
      </div>
    );
  }
  
  // Badge básico
  return (
    <div className={baseClasses}>
      {getIcon()}
      <span>{getStatusText()}</span>
    </div>
  );
};

export default VerificationBadge; 