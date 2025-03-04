
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import EmailVerification from './pages/auth/EmailVerification';
import PhoneVerification from './pages/auth/PhoneVerification';
import BarberShopOwnerLogin from './pages/auth/BarberShopOwnerLogin';
import BarberChat from './pages/features/BarberChat';
import TrendAnalyzer from './pages/features/TrendAnalyzer';
import SmartBooking from './pages/features/SmartBooking';
import BarberFinder from './pages/features/BarberFinder';
import VirtualExperience from './pages/features/VirtualExperience';
import BusinessManagement from './pages/features/BusinessManagement';
import VirtualExperienceView from './pages/features/VirtualExperienceView';
import SmartScheduling from './pages/features/SmartScheduling';
import BarberProfile from './pages/client/BarberProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/barbershop-login" element={<BarberShopOwnerLogin />} />
        
        {/* Feature Pages */}
        <Route path="/features/barber-chat" element={<BarberChat />} />
        <Route path="/features/trend-analyzer" element={<TrendAnalyzer />} />
        <Route path="/features/smart-booking" element={<SmartBooking />} />
        <Route path="/features/barber-finder" element={<BarberFinder />} />
        <Route path="/features/virtual-experience" element={<VirtualExperience />} />
        <Route path="/features/business-management" element={<BusinessManagement />} />
        <Route path="/features/virtual-experience-view" element={<VirtualExperienceView />} />
        <Route path="/features/smart-scheduling" element={<SmartScheduling />} />
        
        {/* Client Routes */}
        <Route path="/barbeiros/:id" element={<BarberProfile />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
