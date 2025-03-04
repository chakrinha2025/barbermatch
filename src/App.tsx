import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Páginas Públicas
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Download from "./pages/Download";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import DataProcessing from "./pages/DataProcessing";
import Pricing from "./pages/Pricing";

// Layouts
import ClientLayout from "./layouts/ClientLayout";
import BarberLayout from "./layouts/BarberLayout";
import AdminLayout from "./layouts/AdminLayout";
import BarberShopOwnerLayout from "./layouts/BarberShopOwnerLayout";
import PublicLayout from "./layouts/PublicLayout";

// Área do Cliente
import ClientDashboard from "./pages/client/Dashboard";
import ClientAppointments from "./pages/client/Appointments";
import ClientFindBarbers from "./pages/client/FindBarbers";
import ClientTryOn from "./pages/client/TryOn";
import ClientProfile from "./pages/client/Profile";

// Autenticação e Perfil
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import BarberShopOwnerLogin from "./pages/auth/BarberShopOwnerLogin";
import EmailVerification from "./pages/auth/EmailVerification";
import PhoneVerification from "./pages/auth/PhoneVerification";

// Área do Barbeiro/Barbearia
import BarberDashboard from "./pages/barber/Dashboard";
import BarberAppointments from "./pages/barber/Appointments";
import BarberServices from "./pages/barber/Services";
import BarberStatistics from "./pages/barber/Statistics";
import BarberSettings from "./pages/barber/Settings";
import BarberClients from "./pages/barber/Clients";
import BarberProfile from "./pages/barber/Profile";
import BarberShopOnboarding from "./pages/barber/BarberShopOnboarding";

// Área do Dono de Barbearia
import BarberShopOwnerDashboard from "./pages/barber_shop_owner/Dashboard";

// Área Administrativa
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminBarbers from "./pages/admin/Barbers";
import AdminBarberShops from "./pages/admin/BarberShops";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";
import AdminFinancial from "./pages/admin/Financial";

// Componentes
import PrivateRoute from "./components/PrivateRoute";
import TestBench from "./pages/TestBench";

// Importar novas páginas de recursos
import TrendAnalyzer from './pages/features/TrendAnalyzer';
import VirtualExperienceView from './pages/features/VirtualExperienceView';
import SmartBooking from './pages/features/SmartBooking';
import BusinessManagement from './pages/features/BusinessManagement';
import Features from './pages/Features';
import BarberFinder from './pages/features/BarberFinder';
import BarberChat from './pages/features/BarberChat';
import SmartScheduling from './pages/features/SmartScheduling';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Verificar preferência do tema salva ou usar preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDark = savedTheme 
      ? savedTheme === 'dark' 
      : prefersDark;
    
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Páginas Públicas */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/download" element={<Download />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/data-processing" element={<DataProcessing />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Autenticação */}
              <Route path="/login" element={<Login />} />
              <Route path="/barbershop-login" element={<BarberShopOwnerLogin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/email-verification" element={<EmailVerification />} />
              <Route path="/phone-verification" element={<PhoneVerification />} />
              <Route path="/barbershop-onboarding" element={<BarberShopOnboarding />} />
              
              {/* Página 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
            
            {/* Área do Cliente */}
            <Route path="/app" element={<PrivateRoute requiredRole="client"><ClientLayout /></PrivateRoute>}>
              <Route index element={<ClientDashboard />} />
              <Route path="appointments" element={<ClientAppointments />} />
              <Route path="find-barbers" element={<ClientFindBarbers />} />
              <Route path="try-on" element={<ClientTryOn />} />
              <Route path="profile" element={<ClientProfile />} />
            </Route>
            
            {/* Área do Barbeiro/Barbearia */}
            <Route path="/barber" element={<PrivateRoute requiredRole="barber"><BarberLayout /></PrivateRoute>}>
              <Route index element={<BarberDashboard />} />
              <Route path="appointments" element={<BarberAppointments />} />
              <Route path="services" element={<BarberServices />} />
              <Route path="statistics" element={<BarberStatistics />} />
              <Route path="clients" element={<BarberClients />} />
              <Route path="profile" element={<BarberProfile />} />
              <Route path="settings" element={<BarberSettings />} />
            </Route>
            
            {/* Área do Dono de Barbearia */}
            <Route path="/barbershop" element={<PrivateRoute requiredRole="barbershop_owner"><BarberShopOwnerLayout /></PrivateRoute>}>
              <Route index element={<BarberShopOwnerDashboard />} />
              <Route path="employees" element={<BarberShopOwnerDashboard />} />
              <Route path="appointments" element={<BarberShopOwnerDashboard />} />
              <Route path="services" element={<BarberShopOwnerDashboard />} />
              <Route path="financial" element={<BarberShopOwnerDashboard />} />
              <Route path="analytics" element={<BarberShopOwnerDashboard />} />
              <Route path="reports" element={<BarberShopOwnerDashboard />} />
              <Route path="settings" element={<BarberShopOwnerDashboard />} />
            </Route>
            
            {/* Área Administrativa */}
            <Route path="/admin" element={<PrivateRoute requiredRole="admin"><AdminLayout /></PrivateRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="barbers" element={<AdminBarbers />} />
              <Route path="barbershops" element={<AdminBarberShops />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="financial" element={<AdminFinancial />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* Página de Testes */}
            <Route path="/test-bench" element={<TestBench />} />
            
            {/* Novas rotas para recursos específicos */}
            <Route path="/recursos" element={<Features />} />
            <Route path="/recursos/analise-tendencias" element={<TrendAnalyzer />} />
            <Route path="/recursos/experiencia-virtual" element={<VirtualExperienceView />} />
            <Route path="/recursos/agendamento" element={<SmartBooking />} />
            <Route path="/recursos/gestao-negocio" element={<BusinessManagement />} />
            <Route path="/recursos/descoberta-barbeiros" element={<BarberFinder />} />
            <Route path="/recursos/chat-barbeiros" element={<BarberChat />} />
            <Route path="/recursos/agendamento-inteligente" element={<SmartScheduling />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
