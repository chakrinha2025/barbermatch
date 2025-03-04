import React, { useState, useEffect } from 'react';
import { 
  User, 
  Check,
  X,
  Edit3,
  Save,
  Plus,
  Clock,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
  MessageSquare,
  Info,
  AlertTriangle,
  CheckCircle,
  ImagePlus,
  Upload,
  DollarSign
} from 'lucide-react';

// Dados simulados - em produção viriam de uma API
const INITIAL_PROFILE = {
  id: 1,
  name: 'Marcos Oliveira',
  email: 'marcos.oliveira@email.com',
  phone: '(41) 99876-5432',
  address: 'Rua das Flores, 123 - Centro, Curitiba - PR',
  bio: 'Especialista em cortes masculinos com mais de 8 anos de experiência. Formado pela Escola de Barbearia Moderna e certificado em técnicas avançadas de degradê e barba.',
  workHours: {
    monday: { start: '09:00', end: '18:00', isOpen: true },
    tuesday: { start: '09:00', end: '18:00', isOpen: true },
    wednesday: { start: '09:00', end: '18:00', isOpen: true },
    thursday: { start: '09:00', end: '18:00', isOpen: true },
    friday: { start: '09:00', end: '20:00', isOpen: true },
    saturday: { start: '09:00', end: '16:00', isOpen: true },
    sunday: { start: '00:00', end: '00:00', isOpen: false },
  },
  socialMedia: {
    instagram: '@marcos.barber',
    facebook: 'marcosbarbearia',
    whatsapp: '41998765432'
  },
  profileImage: '/images/barbers/barber-1.jpg',
  coverImage: '/images/barbers/cover-1.jpg',
  specialties: ['Degradê', 'Barba', 'Cortes Clássicos', 'Navalhado'],
  paymentMethods: ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Pix'],
};

// Interface para os dias da semana
interface WorkDay {
  start: string;
  end: string;
  isOpen: boolean;
}

// Interface para horário de trabalho
interface WorkHours {
  [key: string]: WorkDay;
}

// Interface para mídias sociais
interface SocialMedia {
  instagram: string;
  facebook: string;
  whatsapp: string;
}

// Interface para o perfil do barbeiro
interface BarberProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  workHours: WorkHours;
  socialMedia: SocialMedia;
  profileImage: string;
  coverImage: string;
  specialties: string[];
  paymentMethods: string[];
}

// Tradução dos dias da semana
const weekDaysTranslation: { [key: string]: string } = {
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
  sunday: 'Domingo'
};

// Componente para a imagem de capa
const CoverImage = ({ imageUrl }: { imageUrl: string }) => {
  // Usar o ID único para criar um elemento de estilo
  const uniqueId = `cover-img-${Date.now().toString(36)}`;

  // Criar um estilo dinâmico em tempo de execução
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .${uniqueId} {
        background-image: url(${imageUrl});
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [imageUrl, uniqueId]);

  return (
    <div className={`h-48 bg-cover bg-center ${uniqueId}`} />
  );
};

const Profile = () => {
  const [profile, setProfile] = useState<BarberProfile>(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<BarberProfile>(INITIAL_PROFILE);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newPaymentMethod, setNewPaymentMethod] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Iniciar edição de perfil
  const handleStartEditing = () => {
    setEditedProfile({...profile});
    setIsEditing(true);
  };
  
  // Cancelar edição
  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditedProfile({...profile});
  };
  
  // Salvar alterações
  const handleSaveProfile = () => {
    // Em produção, enviaria para a API
    setProfile({...editedProfile});
    setIsEditing(false);
    setSuccessMessage('Perfil atualizado com sucesso!');
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  // Atualizar horário de trabalho
  const handleWorkHoursChange = (day: string, field: 'start' | 'end' | 'isOpen', value: string | boolean) => {
    setEditedProfile({
      ...editedProfile,
      workHours: {
        ...editedProfile.workHours,
        [day]: {
          ...editedProfile.workHours[day],
          [field]: value
        }
      }
    });
  };
  
  // Adicionar nova especialidade
  const handleAddSpecialty = () => {
    if (newSpecialty.trim() !== '' && !editedProfile.specialties.includes(newSpecialty)) {
      setEditedProfile({
        ...editedProfile,
        specialties: [...editedProfile.specialties, newSpecialty]
      });
      setNewSpecialty('');
    }
  };
  
  // Remover especialidade
  const handleRemoveSpecialty = (specialty: string) => {
    setEditedProfile({
      ...editedProfile,
      specialties: editedProfile.specialties.filter(s => s !== specialty)
    });
  };
  
  // Adicionar método de pagamento
  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.trim() !== '' && !editedProfile.paymentMethods.includes(newPaymentMethod)) {
      setEditedProfile({
        ...editedProfile,
        paymentMethods: [...editedProfile.paymentMethods, newPaymentMethod]
      });
      setNewPaymentMethod('');
    }
  };
  
  // Remover método de pagamento
  const handleRemovePaymentMethod = (method: string) => {
    setEditedProfile({
      ...editedProfile,
      paymentMethods: editedProfile.paymentMethods.filter(m => m !== method)
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e profissionais
          </p>
        </div>
        
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={handleCancelEditing}
              className="px-4 py-2 border rounded-md hover:bg-muted"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center"
            >
              <Save size={16} className="mr-2" />
              Salvar Alterações
            </button>
          </div>
        ) : (
          <button
            onClick={handleStartEditing}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Editar Perfil
          </button>
        )}
      </div>
      
      {/* Mensagem de sucesso */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 border border-green-200 rounded-md p-4 flex items-center">
          <CheckCircle size={18} className="mr-2 text-green-600" />
          {successMessage}
        </div>
      )}
      
      {/* Imagens de perfil e capa */}
      <div className="relative overflow-hidden rounded-xl">
        <CoverImage imageUrl={isEditing ? editedProfile.coverImage : profile.coverImage} />
        {isEditing && (
          <button 
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            title="Alterar imagem de capa"
            onClick={() => {/* aqui iria a lógica para upload */}}
          >
            <Upload size={16} />
          </button>
        )}
        
        <div className="relative mx-auto w-24 h-24 -mt-12 rounded-full border-4 border-background overflow-hidden">
          <img 
            src={isEditing ? editedProfile.profileImage : profile.profileImage} 
            alt="Foto de perfil" 
            className="w-full h-full object-cover"
          />
          {isEditing && (
            <button 
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white hover:bg-black/70"
              title="Alterar foto de perfil"
              aria-label="Alterar foto de perfil"
            >
              <ImagePlus size={18} />
            </button>
          )}
        </div>
      </div>
      
      {/* Informações básicas */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Informações Básicas</h2>
        </div>
        
        <div className="p-6 grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome Completo</label>
              {isEditing ? (
                <input
                  id="name"
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
              ) : (
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-muted-foreground" />
                  <span>{profile.name}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              {isEditing ? (
                <input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
              ) : (
                <div className="flex items-center">
                  <Mail size={16} className="mr-2 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
              {isEditing ? (
                <input
                  id="phone"
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
              ) : (
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Endereço</label>
              {isEditing ? (
                <input
                  id="address"
                  type="text"
                  value={editedProfile.address}
                  onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
              ) : (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-muted-foreground" />
                  <span>{profile.address}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">Biografia</label>
            {isEditing ? (
              <textarea
                id="bio"
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                className="w-full px-3 py-2 border rounded-md bg-background"
                rows={4}
              />
            ) : (
              <p className="text-sm leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Redes Sociais */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Redes Sociais</h2>
        </div>
        
        <div className="p-6 grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="instagram" className="text-sm font-medium">Instagram</label>
              {isEditing ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                  <input
                    id="instagram"
                    type="text"
                    value={editedProfile.socialMedia.instagram.replace('@', '')}
                    onChange={(e) => setEditedProfile({
                      ...editedProfile, 
                      socialMedia: {
                        ...editedProfile.socialMedia,
                        instagram: `@${e.target.value}`
                      }
                    })}
                    className="w-full pl-8 pr-3 py-2 border rounded-md bg-background"
                  />
                </div>
              ) : (
                <div className="flex items-center">
                  <Instagram size={16} className="mr-2 text-muted-foreground" />
                  <span>{profile.socialMedia.instagram}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="facebook" className="text-sm font-medium">Facebook</label>
              {isEditing ? (
                <input
                  id="facebook"
                  type="text"
                  value={editedProfile.socialMedia.facebook}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile, 
                    socialMedia: {
                      ...editedProfile.socialMedia,
                      facebook: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
              ) : (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4 mr-2 text-muted-foreground">
                    <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                  <span>{profile.socialMedia.facebook}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp</label>
              {isEditing ? (
                <input
                  id="whatsapp"
                  type="text"
                  value={editedProfile.socialMedia.whatsapp}
                  onChange={(e) => setEditedProfile({
                    ...editedProfile, 
                    socialMedia: {
                      ...editedProfile.socialMedia,
                      whatsapp: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
              ) : (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 mr-2 text-muted-foreground">
                    <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                  <span>{profile.socialMedia.whatsapp}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Horário de Funcionamento */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Horário de Funcionamento</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {Object.entries(isEditing ? editedProfile.workHours : profile.workHours).map(([day, hours]) => (
              <div key={day} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4 sm:col-span-3">
                  <span className="font-medium">{weekDaysTranslation[day]}</span>
                </div>
                
                {isEditing ? (
                  <>
                    <div className="col-span-3 sm:col-span-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hours.isOpen}
                          onChange={(e) => handleWorkHoursChange(day, 'isOpen', e.target.checked)}
                          className="sr-only peer"
                          title="Marcar como aberto"
                          aria-label={`${hours.isOpen ? 'Desativar' : 'Ativar'} ${weekDaysTranslation[day]}`}
                        />
                        <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="col-span-5 sm:col-span-7 flex items-center gap-2">
                      {hours.isOpen ? (
                        <>
                          <input
                            type="time"
                            value={hours.start}
                            onChange={(e) => handleWorkHoursChange(day, 'start', e.target.value)}
                            className="w-full px-3 py-1 border rounded-md bg-background"
                            title="Horário de abertura"
                            aria-label="Horário de abertura"
                          />
                          <span className="text-muted-foreground">até</span>
                          <input
                            type="time"
                            value={hours.end}
                            onChange={(e) => handleWorkHoursChange(day, 'end', e.target.value)}
                            className="w-full px-3 py-1 border rounded-md bg-background"
                            title="Horário de fechamento"
                            aria-label="Horário de fechamento"
                          />
                        </>
                      ) : (
                        <span className="text-muted-foreground">Fechado</span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="col-span-8 sm:col-span-9 flex items-center">
                    {hours.isOpen ? (
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-muted-foreground" />
                        <span>
                          {hours.start} - {hours.end}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Fechado</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Especialidades e Métodos de Pagamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Especialidades */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Especialidades</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Nova especialidade..."
                    className="flex-1 px-3 py-2 border rounded-md bg-background"
                  />
                  <button
                    onClick={handleAddSpecialty}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Adicionar
                  </button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedProfile.specialties : profile.specialties).map((specialty, index) => (
                  <div 
                    key={index}
                    className="bg-muted/60 text-foreground px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4 mr-1">
                      <path fill="currentColor" d="M160 32C71.6 32 0 103.6 0 192c0 88.4 71.6 160 160 160s160-71.6 160-160S248.4 32 160 32zM0 192C0 103.6 71.6 32 160 32c88.4 0 160 71.6 160 160s-71.6 160-160 160S0 280.4 0 192z"/>
                    </svg>
                    <span>{specialty}</span>
                    {isEditing && (
                      <button 
                        onClick={() => handleRemoveSpecialty(specialty)}
                        className="ml-1 p-0.5 rounded-full hover:bg-muted-foreground/20"
                        aria-label="Remover especialidade"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-2 h-2">
                          <path fill="currentColor" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 214.7 54.6 109.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Métodos de Pagamento */}
        <div className="bg-card border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Métodos de Pagamento</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPaymentMethod}
                    onChange={(e) => setNewPaymentMethod(e.target.value)}
                    placeholder="Novo método de pagamento..."
                    className="flex-1 px-3 py-2 border rounded-md bg-background"
                  />
                  <button
                    onClick={handleAddPaymentMethod}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Adicionar
                  </button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedProfile.paymentMethods : profile.paymentMethods).map((method, index) => (
                  <div 
                    key={index}
                    className="bg-muted/60 text-foreground px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4 mr-1">
                      <path fill="currentColor" d="M160 32C71.6 32 0 103.6 0 192c0 88.4 71.6 160 160 160s160-71.6 160-160S248.4 32 160 32zM0 192C0 103.6 71.6 32 160 32c88.4 0 160 71.6 160 160s-71.6 160-160 160z"/>
                    </svg>
                    <span>{method}</span>
                    {isEditing && (
                      <button 
                        onClick={() => handleRemovePaymentMethod(method)}
                        className="ml-1 p-0.5 rounded-full hover:bg-muted-foreground/20"
                        aria-label="Remover método de pagamento"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-2 h-2">
                          <path fill="currentColor" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 214.7 54.6 109.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 