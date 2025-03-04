import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Youtube, Twitter, Linkedin, Plus, Trash2, ExternalLink, AlertCircle, BarChart3, Calendar, Clock, Rocket, RefreshCw, Zap, Settings, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type SocialMediaPlatform = 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin';

interface SocialAccount {
  platform: SocialMediaPlatform;
  username: string;
  url: string;
  verified: boolean;
  followers?: number;
  engagement?: number; // percentual de engajamento
  businessAccount?: boolean;
  // Novos campos adicionados
  impressions?: number;
  conversionRate?: number;
  bestPostTime?: string;
  bestPostDay?: string;
  topPerformingContent?: string[];
  analyticsAvailable?: boolean;
  autoPostingEnabled?: boolean;
}

interface SocialMediaConnectProps {
  accounts: SocialAccount[];
  userType: 'client' | 'barber' | 'barbershop_owner';
  userPlan: 'free' | 'basic' | 'professional' | 'premium';
  isEditing: boolean;
  onAdd?: (account: SocialAccount) => void;
  onRemove?: (platform: SocialMediaPlatform) => void;
  onEnableAutoPost?: (platform: SocialMediaPlatform, enabled: boolean) => void;
  className?: string;
}

// Componente personalizado para o ícone do TikTok
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M19.32 6.95C17.96 6.95 16.86 5.85 16.86 4.5H13.5V15.93C13.5 17.61 12.14 18.98 10.45 18.98C8.76 18.98 7.41 17.61 7.41 15.93C7.41 14.24 8.77 12.88 10.45 12.88C10.86 12.88 11.24 12.97 11.59 13.13V9.61C11.22 9.56 10.84 9.53 10.45 9.53C6.9 9.53 4 12.42 4 15.98C4 19.53 6.9 22.42 10.45 22.42C14.01 22.42 16.91 19.53 16.91 15.98V10.14C18.16 10.99 19.67 11.5 21.29 11.5V8.15C21.29 8.15 20.21 6.95 19.32 6.95Z" 
      fill="currentColor"
    />
  </svg>
);

export const SocialMediaConnect: React.FC<SocialMediaConnectProps> = ({
  accounts,
  userType,
  userPlan,
  isEditing = false,
  onAdd,
  onRemove,
  onEnableAutoPost,
  className = ''
}) => {
  const [newPlatform, setNewPlatform] = useState<SocialMediaPlatform>('instagram');
  const [newUsername, setNewUsername] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<SocialAccount | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  // Verificar recursos disponíveis com base no plano
  const canAccessAnalytics = userPlan === 'professional' || userPlan === 'premium';
  const canAccessAdvancedAnalytics = userPlan === 'premium';
  const canAccessAutoPosting = userPlan === 'premium';

  // Obter ícone para a plataforma
  const getPlatformIcon = (platform: SocialMediaPlatform, size: number = 16) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={size} className="text-pink-500" />;
      case 'facebook':
        return <Facebook size={size} className="text-blue-600" />;
      case 'tiktok':
        return <TikTokIcon size={size} className="text-black dark:text-white" />;
      case 'youtube':
        return <Youtube size={size} className="text-red-600" />;
      case 'twitter':
        return <Twitter size={size} className="text-blue-400" />;
      case 'linkedin':
        return <Linkedin size={size} className="text-blue-700" />;
      default:
        return <Instagram size={size} className="text-pink-500" />;
    }
  };

  // Obter cor de fundo para o card da plataforma
  const getPlatformBgClass = (platform: SocialMediaPlatform) => {
    switch (platform) {
      case 'instagram':
        return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case 'facebook':
        return 'bg-blue-600';
      case 'tiktok':
        return 'bg-black dark:bg-zinc-800';
      case 'youtube':
        return 'bg-red-600';
      case 'twitter':
        return 'bg-blue-400';
      case 'linkedin':
        return 'bg-blue-700';
      default:
        return 'bg-gray-200 dark:bg-gray-800';
    }
  };

  // Obter nome amigável da plataforma
  const getPlatformName = (platform: SocialMediaPlatform) => {
    switch (platform) {
      case 'instagram':
        return 'Instagram';
      case 'facebook':
        return 'Facebook';
      case 'tiktok':
        return 'TikTok';
      case 'youtube':
        return 'YouTube';
      case 'twitter':
        return 'Twitter';
      case 'linkedin':
        return 'LinkedIn';
      default:
        return 'Rede Social';
    }
  };

  // Formatar número de seguidores
  const formatNumber = (num?: number) => {
    if (!num) return 'N/A';
    
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    } else {
      return num.toString();
    }
  };

  // Validar url da plataforma
  const validateSocialURL = (platform: SocialMediaPlatform, username: string) => {
    const baseUrls: Record<SocialMediaPlatform, string> = {
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      tiktok: 'https://tiktok.com/@',
      youtube: 'https://youtube.com/',
      twitter: 'https://twitter.com/',
      linkedin: 'https://linkedin.com/in/'
    };
    
    return `${baseUrls[platform]}${username.replace('@', '')}`;
  };

  // Função para adicionar nova conta
  const handleAddAccount = () => {
    if (!newUsername) {
      setError('Preencha o nome de usuário');
      return;
    }
    
    // Verificar se já existe uma conta nesta plataforma
    if (accounts.some(account => account.platform === newPlatform)) {
      setError(`Você já tem uma conta ${getPlatformName(newPlatform)} conectada`);
      return;
    }
    
    const newAccount: SocialAccount = {
      platform: newPlatform,
      username: newUsername,
      url: validateSocialURL(newPlatform, newUsername),
      verified: false, // Inicialmente não verificada
      analyticsAvailable: newPlatform === 'instagram' || newPlatform === 'facebook' || newPlatform === 'tiktok',
      autoPostingEnabled: false
    };
    
    if (onAdd) {
      onAdd(newAccount);
    }
    
    // Resetar formulário
    setNewUsername('');
    setShowAddForm(false);
    setError(null);
  };

  // Alternar estado de automação para uma conta
  const toggleAutoPosting = (account: SocialAccount) => {
    if (!canAccessAutoPosting) return;
    
    if (onEnableAutoPost) {
      onEnableAutoPost(account.platform, !account.autoPostingEnabled);
    }
  };

  // Abrir modal de insights para uma conta
  const openInsights = (account: SocialAccount) => {
    if (!canAccessAnalytics) return;
    
    setSelectedAccount(account);
    setShowInsights(true);
  };

  // Renderização do modal de insights de desempenho
  const renderInsightsModal = () => {
    if (!selectedAccount) return null;
    
    return (
      <AnimatePresence>
        {showInsights && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowInsights(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card w-full max-w-3xl rounded-xl shadow-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className={`${getPlatformBgClass(selectedAccount.platform)} p-4 text-white`}>
                <div className="flex items-center gap-2">
                  {getPlatformIcon(selectedAccount.platform, 24)}
                  <h2 className="text-xl font-bold">{getPlatformName(selectedAccount.platform)} - @{selectedAccount.username}</h2>
                </div>
              </div>
              
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-background rounded-lg p-4 border">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Seguidores</h3>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{formatNumber(selectedAccount.followers)}</span>
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">+2.4%</span>
                    </div>
                  </div>
                  
                  <div className="bg-background rounded-lg p-4 border">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Taxa de Engajamento</h3>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{selectedAccount.engagement?.toFixed(1)}%</span>
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">-0.3%</span>
                    </div>
                  </div>
                  
                  {canAccessAdvancedAnalytics && (
                    <>
                      <div className="bg-background rounded-lg p-4 border">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Impressões</h3>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold">{formatNumber(selectedAccount.impressions || 12500)}</span>
                          <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">+8.7%</span>
                        </div>
                      </div>
                      
                      <div className="bg-background rounded-lg p-4 border">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Taxa de Conversão</h3>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold">{(selectedAccount.conversionRate || 3.2).toFixed(1)}%</span>
                          <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">+1.5%</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Melhores Momentos para Postar</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center bg-background p-3 rounded-lg border">
                      <Calendar className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Melhor dia</p>
                        <p className="font-medium">{selectedAccount.bestPostDay || 'Quinta-feira'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-background p-3 rounded-lg border">
                      <Clock className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Melhor horário</p>
                        <p className="font-medium">{selectedAccount.bestPostTime || '18:00 - 20:00'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {canAccessAdvancedAnalytics && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Conteúdo com Melhor Desempenho</h3>
                    <div className="space-y-3">
                      {(selectedAccount.topPerformingContent || [
                        'Antes e depois de cortes modernos', 
                        'Dicas rápidas em vídeo',
                        'Sorteios e promoções'
                      ]).map((content, idx) => (
                        <div key={idx} className="flex items-center bg-background p-3 rounded-lg border">
                          <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-medium mr-3">
                            {idx + 1}
                          </div>
                          <p>{content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Recomendações de Conteúdo</h3>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Rocket className="h-4 w-4 text-primary mr-2 mt-0.5" />
                        <span>Compartilhe antes e depois de transformações para aumentar o engajamento</span>
                      </li>
                      <li className="flex items-start">
                        <Rocket className="h-4 w-4 text-primary mr-2 mt-0.5" />
                        <span>Crie vídeos curtos mostrando técnicas de corte para gerar mais visualizações</span>
                      </li>
                      <li className="flex items-start">
                        <Rocket className="h-4 w-4 text-primary mr-2 mt-0.5" />
                        <span>Responda aos comentários para aumentar a fidelidade dos seguidores</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {canAccessAutoPosting && (
                  <div>
                    <h3 className="font-medium mb-3">Automação de Publicações</h3>
                    <div className="bg-background border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Publicação Automática</p>
                          <p className="text-sm text-muted-foreground">Programe conteúdo para ser publicado automaticamente nos melhores horários</p>
                        </div>
                        <button 
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${selectedAccount.autoPostingEnabled ? 'bg-primary' : 'bg-muted'}`}
                          onClick={() => toggleAutoPosting(selectedAccount)}
                          aria-checked="false"
                          data-state={selectedAccount.autoPostingEnabled ? "checked" : "unchecked"}
                          role="switch"
                          title={selectedAccount.autoPostingEnabled ? "Desativar publicação automática" : "Ativar publicação automática"}
                        >
                          <span 
                            className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${selectedAccount.autoPostingEnabled ? 'translate-x-5' : 'translate-x-0'}`} 
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t p-4 flex justify-end">
                <button
                  onClick={() => setShowInsights(false)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Renderização condicional dos ícones das contas ou cards
  const renderAccounts = () => {
    if (accounts.length === 0) {
      return (
        <div className="text-sm text-muted-foreground text-center py-2">
          Nenhuma rede social conectada
        </div>
      );
    }

    // Para clientes, exibir apenas ícones
    if (userType === 'client') {
      return (
        <div className="flex flex-wrap gap-2">
          {accounts.map((account) => (
            <a 
              key={account.platform} 
              href={account.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              title={`${getPlatformName(account.platform)}: ${account.username}`}
            >
              {getPlatformIcon(account.platform, 20)}
            </a>
          ))}
        </div>
      );
    }

    // Para barbeiros e barbearias, exibir cards ricos
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-2">
        {accounts.map((account) => (
          <motion.div 
            key={account.platform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative rounded-xl overflow-hidden shadow-sm border"
          >
            <div className={`${getPlatformBgClass(account.platform)} p-3 text-white`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getPlatformIcon(account.platform, 24)}
                  <span className="font-semibold">{getPlatformName(account.platform)}</span>
                </div>
                {isEditing && onRemove && (
                  <button 
                    onClick={() => onRemove(account.platform)}
                    className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
                    aria-label={`Remover conta ${getPlatformName(account.platform)}`}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
            <div className="p-3 bg-card">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium">@{account.username}</span>
                {account.verified && (
                  <span className="ml-1 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
              
              {account.followers !== undefined && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Seguidores:</span>
                  <span className="font-medium text-foreground">{formatNumber(account.followers)}</span>
                </div>
              )}
              
              {account.engagement !== undefined && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Engajamento:</span>
                  <span className="font-medium text-foreground">{account.engagement.toFixed(1)}%</span>
                </div>
              )}

              {/* Novos campos para planos profissional e premium */}
              {canAccessAdvancedAnalytics && account.conversionRate !== undefined && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conversão:</span>
                  <span className="font-medium text-foreground">{account.conversionRate.toFixed(1)}%</span>
                </div>
              )}
              
              <div className="mt-3 pt-2 border-t flex">
                <a 
                  href={account.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center"
                >
                  <ExternalLink size={12} className="mr-1" />
                  Visitar
                </a>
                
                {canAccessAnalytics && account.analyticsAvailable && (
                  <button 
                    onClick={() => openInsights(account)}
                    className="text-xs text-primary hover:text-primary/80 flex items-center ml-auto"
                  >
                    <BarChart3 size={12} className="mr-1" />
                    Estatísticas
                  </button>
                )}

                {canAccessAutoPosting && (
                  <button
                    onClick={() => toggleAutoPosting(account)}
                    className={`ml-3 text-xs flex items-center ${account.autoPostingEnabled ? 'text-green-600 hover:text-green-700' : 'text-muted-foreground hover:text-foreground'}`}
                    title={account.autoPostingEnabled ? 'Automação ativada' : 'Automação desativada'}
                  >
                    <RefreshCw size={12} className="mr-1" />
                    {account.autoPostingEnabled ? 'Auto' : 'Manual'}
                  </button>
                )}
              </div>
            </div>
            
            {/* Indicador para contas com recursos premium */}
            {(userPlan === 'professional' || userPlan === 'premium') && account.verified && (
              <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full font-medium">
                PRO
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  // Formulário para adicionar nova conta
  const renderAddForm = () => {
    if (!showAddForm) {
      return (
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
        >
          <Plus size={16} className="mr-1" />
          Conectar Rede Social
        </button>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-4 p-4 border rounded-lg bg-card"
      >
        <h3 className="text-sm font-medium mb-3">Conectar Nova Rede Social</h3>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Plataforma</label>
            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value as SocialMediaPlatform)}
              className="w-full px-3 py-2 rounded-md border bg-background text-sm"
              aria-label="Selecione a plataforma de rede social"
            >
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Nome de Usuário</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="@seuusuario"
              className="w-full px-3 py-2 rounded-md border bg-background text-sm"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-xs flex items-center">
              <AlertCircle size={12} className="mr-1" />
              {error}
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => {
                setShowAddForm(false);
                setError(null);
              }}
              className="px-3 py-1.5 text-sm border rounded-md bg-background hover:bg-muted/50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddAccount}
              className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Conectar
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Redes Sociais</h2>
        
        {/* Informações de recursos premium */}
        {(userType === 'barber' || userType === 'barbershop_owner') && (
          <div className="flex items-center">
            {userPlan === 'premium' ? (
              <span className="text-xs bg-gradient-to-r from-yellow-400 to-amber-600 text-white px-2 py-0.5 rounded-full font-medium flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                Premium
              </span>
            ) : userPlan === 'professional' ? (
              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium flex items-center">
                <Radio className="h-3 w-3 mr-1" />
                Pro
              </span>
            ) : null}
          </div>
        )}
      </div>
      
      {renderAccounts()}
      
      {isEditing && renderAddForm()}
      
      {/* Modal de insights */}
      {renderInsightsModal()}
      
      {/* Alerta para plano gratuito */}
      {(userType === 'barber' || userType === 'barbershop_owner') && userPlan === 'free' && accounts.length > 0 && (
        <div className="mt-4 bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm">
          <div className="flex items-start">
            <Settings className="h-4 w-4 text-primary mt-0.5 mr-2" />
            <div>
              <p className="text-foreground font-medium">Desbloqueie recursos avançados</p>
              <p className="text-muted-foreground mt-1">
                Atualize para um plano pago para acessar análises avançadas, insights de conversão e automação de redes sociais.
              </p>
              <a 
                href="/pricing" 
                className="text-primary hover:underline mt-2 inline-block"
              >
                Ver planos disponíveis
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaConnect; 