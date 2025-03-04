import { useState } from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Smartphone, 
  Mail, 
  Lock, 
  LogOut,
  Save,
  HelpCircle,
  CheckCircle
} from 'lucide-react';

// Dados simulados - em produção viriam de uma API
const INITIAL_SETTINGS = {
  theme: 'light',
  notifications: {
    email: true,
    push: true,
    sms: false,
    newAppointment: true,
    appointmentReminder: true,
    appointmentCancellation: true,
    reviews: true,
    marketing: false
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30
  },
  emailFrequency: 'daily'
};

const Settings = () => {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Alterar tema
  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setSettings({...settings, theme});
    
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    
    localStorage.setItem('theme', theme);
  };
  
  // Alterar notificações
  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value
      }
    });
  };
  
  // Alterar segurança
  const handleSecurityChange = (key: string, value: boolean | number) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [key]: value
      }
    });
  };
  
  // Alterar frequência de emails
  const handleEmailFrequencyChange = (frequency: string) => {
    setSettings({
      ...settings,
      emailFrequency: frequency
    });
  };
  
  // Salvar configurações
  const handleSaveSettings = () => {
    // Em produção, enviaria para a API
    localStorage.setItem('barberSettings', JSON.stringify(settings));
    
    setSuccessMessage('Configurações salvas com sucesso!');
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  // Logout
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    window.location.href = '/login';
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Ajuste suas preferências e configurações de conta
        </p>
      </div>
      
      {/* Mensagem de sucesso */}
      {successMessage && (
        <div className="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400 border border-green-200 dark:border-green-900 rounded-md p-4 flex items-center">
          <CheckCircle size={18} className="mr-2 text-green-600 dark:text-green-500" />
          {successMessage}
        </div>
      )}
      
      {/* Tema */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Tema</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleThemeChange('light')}
              className={`p-4 rounded-lg flex flex-col items-center gap-2 border-2 ${
                settings.theme === 'light' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-transparent hover:bg-muted'
              }`}
              aria-label="Tema claro"
            >
              <div className="w-12 h-12 bg-muted-foreground/10 rounded-full flex items-center justify-center">
                <Sun size={24} className="text-amber-500" />
              </div>
              <span className="font-medium">Claro</span>
            </button>
            
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-4 rounded-lg flex flex-col items-center gap-2 border-2 ${
                settings.theme === 'dark' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-transparent hover:bg-muted'
              }`}
              aria-label="Tema escuro"
            >
              <div className="w-12 h-12 bg-muted-foreground/10 rounded-full flex items-center justify-center">
                <Moon size={24} className="text-indigo-400" />
              </div>
              <span className="font-medium">Escuro</span>
            </button>
            
            <button
              onClick={() => handleThemeChange('system')}
              className={`p-4 rounded-lg flex flex-col items-center gap-2 border-2 ${
                settings.theme === 'system' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-transparent hover:bg-muted'
              }`}
              aria-label="Tema do sistema"
            >
              <div className="w-12 h-12 bg-muted-foreground/10 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 relative overflow-hidden">
                  <Sun size={16} className="absolute top-0 left-0 text-amber-500" />
                  <Moon size={16} className="absolute bottom-0 right-0 text-indigo-400" />
                </div>
              </div>
              <span className="font-medium">Sistema</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Notificações */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Notificações</h2>
        </div>
        
        <div className="divide-y">
          <div className="px-6 py-4">
            <h3 className="font-medium mb-4">Canais de Notificação</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail size={18} className="mr-3 text-muted-foreground" />
                  <span>Email</span>
                </div>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    className="sr-only peer"
                    title="Ativar notificações por email"
                    aria-label="Ativar notificações por email"
                  />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Smartphone size={18} className="mr-3 text-muted-foreground" />
                  <span>Notificações Push</span>
                </div>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) => handleNotificationChange('push', e.target.checked)}
                    className="sr-only peer"
                    title="Ativar notificações push"
                    aria-label="Ativar notificações push"
                  />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Smartphone size={18} className="mr-3 text-muted-foreground" />
                  <span>SMS</span>
                </div>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                    className="sr-only peer"
                    title="Ativar notificações por SMS"
                    aria-label="Ativar notificações por SMS"
                  />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <h3 className="font-medium mb-4">Tipos de Notificação</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Novos Agendamentos</p>
                  <p className="text-sm text-muted-foreground">Receba notificações quando um cliente agendar um serviço</p>
                </div>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.newAppointment}
                    onChange={(e) => handleNotificationChange('newAppointment', e.target.checked)}
                    className="sr-only peer"
                    title="Ativar notificações de novos agendamentos"
                    aria-label="Ativar notificações de novos agendamentos"
                  />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p>Lembretes de Agendamento</p>
                  <p className="text-sm text-muted-foreground">Receba lembretes de agendamentos próximos</p>
                </div>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.appointmentReminder}
                    onChange={(e) => handleNotificationChange('appointmentReminder', e.target.checked)}
                    className="sr-only peer"
                    title="Ativar lembretes de agendamento"
                    aria-label="Ativar lembretes de agendamento"
                  />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p>Cancelamentos</p>
                  <p className="text-sm text-muted-foreground">Receba notificações quando um cliente cancelar um agendamento</p>
                </div>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.appointmentCancellation}
                    onChange={(e) => handleNotificationChange('appointmentCancellation', e.target.checked)}
                    className="sr-only peer"
                    title="Ativar notificações de cancelamentos"
                    aria-label="Ativar notificações de cancelamentos"
                  />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p>Avaliações</p>
                  <p className="text-sm text-muted-foreground">Receba notificações quando receber avaliações de clientes</p>
                </div>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.reviews}
                    onChange={(e) => handleNotificationChange('reviews', e.target.checked)}
                    className="sr-only peer"
                    title="Ativar notificações de avaliações"
                    aria-label="Ativar notificações de avaliações"
                  />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p>Marketing</p>
                  <p className="text-sm text-muted-foreground">Receba dicas, novidades e atualizações da plataforma</p>
                </div>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.marketing}
                    onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
                    className="sr-only peer"
                    title="Ativar notificações de marketing"
                    aria-label="Ativar notificações de marketing"
                  />
                  <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <h3 className="font-medium mb-4">Frequência de Emails</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="emailFrequency" 
                  value="realtime" 
                  checked={settings.emailFrequency === 'realtime'} 
                  onChange={() => handleEmailFrequencyChange('realtime')}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                />
                <span className="ml-2">Tempo real</span>
              </label>
              
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="emailFrequency" 
                  value="daily" 
                  checked={settings.emailFrequency === 'daily'} 
                  onChange={() => handleEmailFrequencyChange('daily')}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                />
                <span className="ml-2">Resumo diário</span>
              </label>
              
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="emailFrequency" 
                  value="weekly" 
                  checked={settings.emailFrequency === 'weekly'} 
                  onChange={() => handleEmailFrequencyChange('weekly')}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                />
                <span className="ml-2">Resumo semanal</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Segurança */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Segurança</h2>
        </div>
        
        <div className="divide-y">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Autenticação de Dois Fatores</p>
                <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança para sua conta</p>
              </div>
              
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                  className="sr-only peer"
                  title="Ativar autenticação de dois fatores"
                  aria-label="Ativar autenticação de dois fatores"
                />
                <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <div>
              <p className="font-medium">Tempo Limite da Sessão</p>
              <p className="text-sm text-muted-foreground mb-4">Defina por quanto tempo você permanecerá logado sem atividade</p>
              
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', Number(e.target.value))}
                className="px-3 py-2 border rounded-md bg-background"
                aria-label="Selecione o tempo limite da sessão"
              >
                <option value={15}>15 minutos</option>
                <option value={30}>30 minutos</option>
                <option value={60}>1 hora</option>
                <option value={120}>2 horas</option>
                <option value={240}>4 horas</option>
              </select>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <button
              className="flex items-center text-red-500 hover:text-red-700"
              onClick={() => alert("Funcionalidade não implementada neste protótipo")}
              aria-label="Alterar senha"
            >
              <Lock size={16} className="mr-2" />
              <span>Alterar Senha</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Ações Finais */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center"
          >
            <Save size={16} className="mr-2" />
            Salvar Configurações
          </button>
        </div>
        
        <div className="space-x-4">
          <button
            onClick={() => alert("Funcionalidade não implementada neste protótipo")}
            className="px-4 py-2 border rounded-md hover:bg-muted flex items-center"
            aria-label="Obter ajuda"
          >
            <HelpCircle size={16} className="mr-2" />
            Ajuda
          </button>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center"
            aria-label="Sair da conta"
          >
            <LogOut size={16} className="mr-2" />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 