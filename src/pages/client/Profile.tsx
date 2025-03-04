import { useState, useEffect } from 'react';
import { User, Scissors, MapPin, Bell, Shield, LogOut, Camera, Sparkles, Edit2, Check, X, Phone, BadgeCheck, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import VerificationBadge from '@/components/VerificationBadge';
import SecurityStrength from '@/components/SecurityStrength';

// Tipos
interface ClientProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  preferences: {
    barberTypes: string[];
    hairStyles: string[];
    productBrands: string[];
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    appointmentReminder: boolean;
    promotions: boolean;
    news: boolean;
  };
  privacySettings: {
    shareLocation: boolean;
    shareHistory: boolean;
    allowReviews: boolean;
  };
}

// Dados mockados
const INITIAL_PROFILE: ClientProfile = {
  name: "João Silva",
  email: "joao.silva@exemplo.com",
  phone: "(11) 98765-4321",
  address: "Rua das Flores, 123 - São Paulo, SP",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  emailVerified: false,
  phoneVerified: false,
  preferences: {
    barberTypes: ["Barbearias Tradicionais", "Salões Modernos"],
    hairStyles: ["Degradê", "Corte Clássico"],
    productBrands: ["American Crew", "Reuzel"]
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
    appointmentReminder: true,
    promotions: false,
    news: true
  },
  privacySettings: {
    shareLocation: true,
    shareHistory: false,
    allowReviews: true
  }
};

// Componente principal
const Profile = () => {
  const [profile, setProfile] = useState<ClientProfile>(INITIAL_PROFILE);
  const [activeTab, setActiveTab] = useState<'info' | 'preferences' | 'security'>('info');
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [newPreference, setNewPreference] = useState<string>('');
  const [tempCategory, setTempCategory] = useState<keyof ClientProfile['preferences'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Verificar status de verificação
  useEffect(() => {
    // Simular busca de informações do armazenamento local
    const emailVerified = localStorage.getItem('user_email_verified') === 'true';
    const phoneVerified = localStorage.getItem('user_phone_verified') === 'true';
    
    setProfile(prev => ({
      ...prev,
      emailVerified,
      phoneVerified
    }));
  }, []);
  
  // Função para alterar para o modo de edição
  const startEdit = (field: string, value: string) => {
    setEditField(field);
    setEditValue(value);
  };
  
  // Função para salvar a edição
  const saveEdit = () => {
    setIsLoading(true);
    
    // Simula chamada de API
    setTimeout(() => {
      setProfile(prev => {
        // Cria um novo objeto para não mutar o estado diretamente
        const newProfile = { ...prev };
        
        // Atualiza o campo apropriado com base no nome do campo
        switch (editField) {
          case 'name':
            newProfile.name = editValue;
            break;
          case 'email':
            newProfile.email = editValue;
            break;
          case 'phone':
            newProfile.phone = editValue;
            break;
          case 'address':
            newProfile.address = editValue;
            break;
          // Outros campos seriam tratados aqui
        }
        
        return newProfile;
      });
      
      setEditField(null);
      setEditValue('');
      setIsLoading(false);
    }, 1000);
  };
  
  // Função para cancelar a edição
  const cancelEdit = () => {
    setEditField(null);
    setEditValue('');
  };
  
  // Função para alternar configurações booleanas
  const toggleSetting = (category: keyof Pick<ClientProfile, 'notifications' | 'privacySettings'>, setting: string) => {
    setProfile(prev => {
      const newProfile = { ...prev };
      // @ts-ignore - Sabemos que esta propriedade existe
      newProfile[category][setting] = !newProfile[category][setting];
      return newProfile;
    });
  };
  
  // Função para adicionar uma preferência
  const addPreference = (category: keyof ClientProfile['preferences'], newItem: string) => {
    if (!newItem.trim()) return;
    
    setProfile(prev => {
      const newProfile = { ...prev };
      const preferences = [...newProfile.preferences[category]];
      
      if (!preferences.includes(newItem)) {
        preferences.push(newItem);
      }
      
      newProfile.preferences[category] = preferences;
      return newProfile;
    });
  };
  
  // Função para remover uma preferência
  const removePreference = (category: keyof ClientProfile['preferences'], item: string) => {
    setProfile(prev => {
      const newProfile = { ...prev };
      newProfile.preferences[category] = newProfile.preferences[category].filter(i => i !== item);
      return newProfile;
    });
  };
  
  // Iniciar verificação de telefone
  const handlePhoneVerification = () => {
    // Redirecionar para a página de verificação de telefone
    navigate(`/phone-verification?phone=${encodeURIComponent(profile.phone)}&type=client&method=sms`);
  };
  
  // Renderiza o conteúdo com base na aba ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full hover:bg-primary/90"
                  title="Alterar foto de perfil"
                  aria-label="Alterar foto de perfil"
                >
                  <Camera size={14} />
                </button>
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Nome</label>
                  {!editField && (
                    <button 
                      className="text-xs text-primary hover:underline flex items-center"
                      onClick={() => startEdit('name', profile.name)}
                    >
                      <Edit2 size={12} className="mr-1" />
                      Editar
                    </button>
                  )}
                </div>
                {editField === 'name' ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 p-2 border rounded-md text-sm"
                      placeholder="Digite seu nome"
                      title="Nome completo"
                    />
                    <div className="flex gap-1">
                      <button 
                        className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        onClick={saveEdit}
                        disabled={isLoading}
                        aria-label="Salvar nome"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        className="p-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
                        onClick={cancelEdit}
                        aria-label="Cancelar edição"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 bg-muted rounded-md">{profile.name}</div>
                )}
              </div>
              
              <div className="grid gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Email</label>
                  {!editField && (
                    <button 
                      className="text-xs text-primary hover:underline flex items-center"
                      onClick={() => startEdit('email', profile.email)}
                    >
                      <Edit2 size={12} className="mr-1" />
                      Editar
                    </button>
                  )}
                </div>
                {editField === 'email' ? (
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 p-2 border rounded-md text-sm"
                      placeholder="Digite seu email"
                      title="Email"
                    />
                    <div className="flex gap-1">
                      <button 
                        className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        onClick={saveEdit}
                        disabled={isLoading}
                        aria-label="Salvar email"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        className="p-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
                        onClick={cancelEdit}
                        aria-label="Cancelar edição"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 bg-muted rounded-md">{profile.email}</div>
                )}
              </div>
              
              <div className="grid gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Telefone</label>
                  {!editField && (
                    <button 
                      className="text-xs text-primary hover:underline flex items-center"
                      onClick={() => startEdit('phone', profile.phone)}
                    >
                      <Edit2 size={12} className="mr-1" />
                      Editar
                    </button>
                  )}
                </div>
                {editField === 'phone' ? (
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 p-2 border rounded-md text-sm"
                      placeholder="Digite seu telefone"
                      title="Telefone"
                    />
                    <div className="flex gap-1">
                      <button 
                        className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        onClick={saveEdit}
                        disabled={isLoading}
                        aria-label="Salvar telefone"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        className="p-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
                        onClick={cancelEdit}
                        aria-label="Cancelar edição"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 bg-muted rounded-md">{profile.phone}</div>
                )}
              </div>
              
              <div className="grid gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Endereço</label>
                  {!editField && (
                    <button 
                      className="text-xs text-primary hover:underline flex items-center"
                      onClick={() => startEdit('address', profile.address)}
                    >
                      <Edit2 size={12} className="mr-1" />
                      Editar
                    </button>
                  )}
                </div>
                {editField === 'address' ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 p-2 border rounded-md text-sm"
                      placeholder="Digite seu endereço"
                      title="Endereço"
                    />
                    <div className="flex gap-1">
                      <button 
                        className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        onClick={saveEdit}
                        disabled={isLoading}
                        aria-label="Salvar endereço"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        className="p-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
                        onClick={cancelEdit}
                        aria-label="Cancelar edição"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 bg-muted rounded-md">{profile.address}</div>
                )}
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Salvar Alterações
              </button>
              <button className="w-full mt-2 px-4 py-2 text-sm text-muted-foreground hover:underline">
                Alterar Senha
              </button>
            </div>
          </div>
        );
      
      case 'preferences':
        return (
          <div className="space-y-6">
            {/* Tipos de Barbearias */}
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <MapPin size={16} className="mr-2" />
                Tipos de Barbearias Preferidas
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.preferences.barberTypes.map((type, index) => (
                  <div 
                    key={index} 
                    className="bg-muted px-2 py-1 rounded-md text-sm flex items-center"
                  >
                    {type}
                    <button 
                      className="ml-1.5 hover:text-destructive" 
                      onClick={() => removePreference('barberTypes', type)}
                      aria-label={`Remover ${type}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Adicionar tipo de barbearia..."
                  className="flex-1 p-2 text-sm border rounded-md"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addPreference('barberTypes', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button 
                  className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                  onClick={(e) => {
                    const input = e.currentTarget.previousSibling as HTMLInputElement;
                    addPreference('barberTypes', input.value);
                    input.value = '';
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>
            
            {/* Estilos de Corte */}
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <Scissors size={16} className="mr-2" />
                Estilos de Corte Preferidos
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.preferences.hairStyles.map((style, index) => (
                  <div 
                    key={index} 
                    className="bg-muted px-2 py-1 rounded-md text-sm flex items-center"
                  >
                    {style}
                    <button 
                      className="ml-1.5 hover:text-destructive" 
                      onClick={() => removePreference('hairStyles', style)}
                      aria-label={`Remover ${style}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Adicionar estilo de corte..."
                  className="flex-1 p-2 text-sm border rounded-md"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addPreference('hairStyles', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button 
                  className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                  onClick={(e) => {
                    const input = e.currentTarget.previousSibling as HTMLInputElement;
                    addPreference('hairStyles', input.value);
                    input.value = '';
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>
            
            {/* Marcas de Produtos */}
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <Sparkles size={16} className="mr-2" />
                Marcas de Produtos Preferidas
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.preferences.productBrands.map((brand, index) => (
                  <div 
                    key={index} 
                    className="bg-muted px-2 py-1 rounded-md text-sm flex items-center"
                  >
                    {brand}
                    <button 
                      className="ml-1.5 hover:text-destructive" 
                      onClick={() => removePreference('productBrands', brand)}
                      aria-label={`Remover ${brand}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Adicionar marca..."
                  className="flex-1 p-2 text-sm border rounded-md"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addPreference('productBrands', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button 
                  className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                  onClick={(e) => {
                    const input = e.currentTarget.previousSibling as HTMLInputElement;
                    addPreference('productBrands', input.value);
                    input.value = '';
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Salvar Preferências
              </button>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <SecurityStrength 
              emailVerified={profile.emailVerified}
              phoneVerified={profile.phoneVerified}
              has2FA={false}
              hasPIN={false}
              hasStrongPassword={true}
              showStrengthMeter={true}
            />
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="container max-w-4xl py-8">
      <div className="bg-card shadow-sm rounded-xl border p-6 mb-6">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img 
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full hover:bg-primary/90"
              title="Alterar foto de perfil"
              aria-label="Alterar foto de perfil"
            >
              <Camera size={14} />
            </button>
          </div>
          
          <div className="ml-5 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <User size={14} className="mr-1.5" />
                  <span>Cliente desde Dez 2022</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="flex flex-col items-end space-y-2">
                  <VerificationBadge
                    type="email"
                    isVerified={profile.emailVerified}
                    value={profile.email}
                    userType="client"
                  />
                  
                  <VerificationBadge
                    type="phone"
                    isVerified={profile.phoneVerified}
                    value={profile.phone}
                    userType="client"
                    onStartVerification={handlePhoneVerification}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm">
        <div className="flex border-b overflow-x-auto">
          <button 
            className={`px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('info')}
          >
            <span className="flex items-center">
              <User size={16} className="mr-2" />
              Informações Pessoais
            </span>
          </button>
          <button 
            className={`px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'preferences' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('preferences')}
          >
            <span className="flex items-center">
              <Scissors size={16} className="mr-2" />
              Preferências
            </span>
          </button>
          <button 
            className={`px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'security' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('security')}
          >
            <span className="flex items-center">
              <Shield size={16} className="mr-2" />
              Privacidade
            </span>
          </button>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <button className="text-muted-foreground hover:text-foreground flex items-center">
          <LogOut size={16} className="mr-2" />
          Sair da conta
        </button>
      </div>
    </div>
  );
};

export default Profile; 