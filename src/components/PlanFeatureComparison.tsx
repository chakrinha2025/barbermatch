
import React from 'react';
import { CheckCircle, XCircle, Lock } from 'lucide-react';
import { FeatureType, PlanType, hasAccessToFeature, getAccessLimitations } from '@/utils/planAccess';
import { Link } from 'react-router-dom';

interface PlanFeatureComparisonProps {
  showPremiumCTA?: boolean;
}

export function PlanFeatureComparison({ showPremiumCTA = true }: PlanFeatureComparisonProps) {
  const features: { feature: FeatureType, name: string }[] = [
    { feature: 'finder', name: 'Descoberta de Barbeiros' },
    { feature: 'scheduling', name: 'Agendamento Inteligente' },
    { feature: 'virtual', name: 'Experiência Virtual' },
    { feature: 'chat', name: 'Chat com Barbeiros' },
    { feature: 'business', name: 'Gestão de Negócio' },
    { feature: 'trends', name: 'Análise de Tendências' },
  ];

  const plans: PlanType[] = ['free', 'basic', 'professional', 'premium'];
  const planNames = {
    'free': 'Grátis',
    'basic': 'Básico',
    'professional': 'Profissional',
    'premium': 'Premium'
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 text-left">Funcionalidades</th>
            {plans.map(plan => (
              <th key={plan} className="py-4 px-6 text-center">
                <div className="font-bold text-lg">{planNames[plan]}</div>
                {plan === 'free' && (
                  <div className="text-sm text-emerald-500 font-normal">Atual</div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map(({ feature, name }) => (
            <tr key={feature} className="border-t border-gray-200 dark:border-gray-800">
              <td className="py-4 px-6">{name}</td>
              {plans.map(plan => {
                const hasAccess = hasAccessToFeature(feature, plan);
                const limitations = getAccessLimitations(feature, plan);
                
                return (
                  <td key={`${feature}-${plan}`} className="py-4 px-6 text-center">
                    {hasAccess ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle className="h-6 w-6 text-emerald-500" />
                        {limitations && (
                          <span className="text-xs text-gray-500 mt-1">{limitations}</span>
                        )}
                      </div>
                    ) : (
                      <XCircle className="h-6 w-6 text-gray-300 mx-auto" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {showPremiumCTA && (
        <div className="mt-8 text-center">
          <Link 
            to="/pricing" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Lock size={16} />
            Desbloquear recursos premium
          </Link>
        </div>
      )}
    </div>
  );
}

export default PlanFeatureComparison;
