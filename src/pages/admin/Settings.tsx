import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminSettings: React.FC = () => {
  // Configurações gerais
  const [appName, setAppName] = useState<string>("BarberMatch");
  const [appDescription, setAppDescription] = useState<string>(
    "Plataforma para conectar clientes a barbeiros e barbearias, utilizando Inteligência Artificial e Realidade Aumentada."
  );
  const [contactEmail, setContactEmail] = useState<string>("contato@barbermatch.com");
  const [theme, setTheme] = useState<string>("system");
  
  // Configurações de notificações
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [smsNotifications, setSmsNotifications] = useState<boolean>(false);
  
  // Configurações de segurança
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false);
  const [passwordPolicy, setPasswordPolicy] = useState<string>("strong");
  const [sessionTimeout, setSessionTimeout] = useState<string>("30");
  
  // Configurações de APIs
  const [googleApiKey, setGoogleApiKey] = useState<string>("****************************************");
  const [stripeApiKey, setStripeApiKey] = useState<string>("sk_test_********************************");

  const handleSaveGeneral = () => {
    toast.success("Configurações gerais salvas com sucesso!");
  };

  const handleSaveNotifications = () => {
    toast.success("Configurações de notificações salvas com sucesso!");
  };

  const handleSaveSecurity = () => {
    toast.success("Configurações de segurança salvas com sucesso!");
  };

  const handleSaveApi = () => {
    toast.success("Configurações de API salvas com sucesso!");
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Configurações do Sistema</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="api">Integrações API</TabsTrigger>
        </TabsList>
        
        {/* Configurações Gerais */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as informações básicas do seu aplicativo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="app-name">Nome do Aplicativo</Label>
                <Input 
                  id="app-name" 
                  value={appName} 
                  onChange={(e) => setAppName(e.target.value)} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="app-description">Descrição</Label>
                <Textarea 
                  id="app-description" 
                  value={appDescription} 
                  onChange={(e) => setAppDescription(e.target.value)} 
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email de Contato</Label>
                <Input 
                  id="contact-email" 
                  type="email" 
                  value={contactEmail} 
                  onChange={(e) => setContactEmail(e.target.value)} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="theme">Tema Padrão</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveGeneral}>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Notificações */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Gerencie como e quando as notificações são enviadas aos usuários.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Notificações por Email</h4>
                  <p className="text-sm text-muted-foreground">
                    Habilitar notificações por email para todos os usuários
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Notificações Push</h4>
                  <p className="text-sm text-muted-foreground">
                    Habilitar notificações push no aplicativo móvel
                  </p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Notificações SMS</h4>
                  <p className="text-sm text-muted-foreground">
                    Habilitar notificações por SMS para lembretes importantes
                  </p>
                </div>
                <Switch 
                  checked={smsNotifications} 
                  onCheckedChange={setSmsNotifications} 
                />
              </div>
              
              <Button onClick={handleSaveNotifications}>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Segurança */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Configure as políticas de segurança do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Autenticação de Dois Fatores</h4>
                  <p className="text-sm text-muted-foreground">
                    Exigir autenticação de dois fatores para todos os usuários
                  </p>
                </div>
                <Switch 
                  checked={twoFactorAuth} 
                  onCheckedChange={setTwoFactorAuth} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password-policy">Política de Senha</Label>
                <Select value={passwordPolicy} onValueChange={setPasswordPolicy}>
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Selecione uma política" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weak">Básica (mínimo 6 caracteres)</SelectItem>
                    <SelectItem value="medium">Média (8+ caracteres, letras e números)</SelectItem>
                    <SelectItem value="strong">Forte (8+ caracteres, letras, números e caracteres especiais)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="session-timeout">Tempo de Expiração da Sessão (minutos)</Label>
                <Input 
                  id="session-timeout" 
                  type="number" 
                  value={sessionTimeout} 
                  onChange={(e) => setSessionTimeout(e.target.value)} 
                />
              </div>
              
              <Button onClick={handleSaveSecurity}>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de API */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Integrações API</CardTitle>
              <CardDescription>
                Configure as chaves de API para serviços externos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="google-api">Google Maps API Key</Label>
                <Input 
                  id="google-api" 
                  type="password" 
                  value={googleApiKey} 
                  onChange={(e) => setGoogleApiKey(e.target.value)} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="stripe-api">Stripe API Key</Label>
                <Input 
                  id="stripe-api" 
                  type="password" 
                  value={stripeApiKey} 
                  onChange={(e) => setStripeApiKey(e.target.value)} 
                />
              </div>
              
              <Button onClick={handleSaveApi}>Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings; 