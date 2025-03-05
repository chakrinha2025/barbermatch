import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { AppLayout } from '@/layouts/AppLayout';

// Páginas públicas
import Home from '@/pages/Home';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import Download from '@/pages/Download';
import NotFound from '@/pages/NotFound';

// Páginas de autenticação
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import EmailVerification from '@/pages/auth/EmailVerification';
import PhoneVerification from '@/pages/auth/PhoneVerification';
import BarberShopOwnerLogin from '@/pages/auth/BarberShopOwnerLogin';

// Páginas da aplicação (cliente)
import ClientDashboard from '@/pages/client/Dashboard';
import FindBarbersPage from '@/pages/client/FindBarbers';
import TryOnPage from '@/pages/client/TryOn';
import AppointmentsPage from '@/pages/client/Appointments';
// Verificando se estes arquivos existem
// import AppointmentDetailsPage from '@/pages/client/AppointmentDetails';
// import NewAppointmentPage from '@/pages/client/NewAppointment';
import ChatPage from '@/pages/client/Chat';
import ChatDetailPage from '@/pages/client/ChatDetail';
import TrendsPage from '@/pages/client/Trends';
import ProfilePage from '@/pages/client/Profile';

// Páginas de recursos
import BarberChat from '@/pages/features/BarberChat';
import SmartScheduling from '@/pages/features/SmartScheduling';
import TrendAnalyzer from '@/pages/features/TrendAnalyzer';

// Páginas do barbeiro
import BarberDashboard from '@/pages/barber/Dashboard';
import Appointments from '@/pages/barber/Appointments';
import BarberProfile from '@/pages/barber/Profile';

// Util para checar autenticação
const isAuthenticated = () => {
  return localStorage.getItem('auth_token') !== null;
};

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    // Redirecionando para login e guardando a rota tentada para redirecionamento após login
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Componente para rotas que não devem ser acessadas quando já está autenticado
const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  if (isAuthenticated()) {
    // Se já está autenticado, redireciona para o dashboard
    return <Navigate to="/app" replace />;
  }
  
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/download" element={<Download />} />
      
      {/* Rotas de Autenticação */}
      <Route path="/login" element={
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      } />
      <Route path="/register" element={
        <PublicOnlyRoute>
          <Register />
        </PublicOnlyRoute>
      } />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/phone-verification" element={<PhoneVerification />} />
      <Route path="/barbershop-login" element={<BarberShopOwnerLogin />} />
      
      {/* Rotas de Demonstração de Features */}
      <Route path="/features/chat" element={<BarberChat />} />
      <Route path="/features/smart-scheduling" element={<SmartScheduling />} />
      <Route path="/features/trend-analyzer" element={<TrendAnalyzer />} />
      
      {/* Rotas Protegidas do Aplicativo (Cliente) */}
      <Route path="/app" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route index element={<ClientDashboard />} />
        <Route path="explore" element={<FindBarbersPage />} />
        <Route path="try-on" element={<TryOnPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        {/* Comentando rotas com componentes que ainda não existem */}
        {/* <Route path="appointments/:id" element={<AppointmentDetailsPage />} /> */}
        {/* <Route path="appointments/new" element={<NewAppointmentPage />} /> */}
        <Route path="chat" element={<ChatPage />} />
        <Route path="chat/:id" element={<ChatDetailPage />} />
        <Route path="chat/barber/:barberId" element={<ChatDetailPage />} />
        <Route path="trends" element={<TrendsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="barber/:barberId" element={<BarberProfile />} />
      </Route>
      
      {/* Rotas Protegidas do Barbeiro */}
      <Route path="/barber" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route index element={<BarberDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="profile" element={<BarberProfile />} />
      </Route>
      
      {/* Rota 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
} 