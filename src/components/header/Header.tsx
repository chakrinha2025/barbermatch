import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scissors, Sun, Moon, User, LogIn } from 'lucide-react';
import { useTheme } from 'next-themes';
import { AnimatedLogo } from '@/components/ui/animated-logo';
import './styles.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  
  // Efeito para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Função para verificar se um link está ativo
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Alternar tema claro/escuro
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <AnimatedLogo size="sm" variant="default" />
          <span className="logo-text">BarberMatch</span>
        </Link>
        
        {/* Menu de navegação desktop */}
        <nav className="nav-menu">
          <Link to="/sobre" className={`nav-link ${isActive('/sobre') ? 'active' : ''}`}>
            Sobre
          </Link>
          <Link to="/recursos" className={`nav-link ${isActive('/recursos') ? 'active' : ''}`}>
            Recursos
          </Link>
          <Link to="/barbeiros" className={`nav-link ${isActive('/barbeiros') ? 'active' : ''}`}>
            Barbeiros
          </Link>
          <Link to="/para-proprietarios" className={`nav-link ${isActive('/para-proprietarios') ? 'active' : ''}`}>
            Para Proprietários
          </Link>
          <Link to="/planos" className={`nav-link ${isActive('/planos') ? 'active' : ''}`}>
            Planos
          </Link>
        </nav>
        
        {/* Ações do header */}
        <div className="header-actions">
          {/* Botão de tema */}
          <button 
            onClick={toggleTheme} 
            className="action-button login-button"
            aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {/* Botão de login */}
          <Link to="/entrar" className="action-button login-button">
            <LogIn size={18} />
            <span>Entrar</span>
          </Link>
          
          {/* Botão de cadastro */}
          <Link to="/cadastrar" className="action-button register-button">
            <User size={18} />
            <span>Cadastrar</span>
          </Link>
          
          {/* Botão de menu mobile */}
          <button 
            className="mobile-menu-button" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link 
          to="/sobre" 
          className={`nav-link ${isActive('/sobre') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Sobre
        </Link>
        <Link 
          to="/recursos" 
          className={`nav-link ${isActive('/recursos') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Recursos
        </Link>
        <Link 
          to="/barbeiros" 
          className={`nav-link ${isActive('/barbeiros') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Barbeiros
        </Link>
        <Link 
          to="/para-proprietarios" 
          className={`nav-link ${isActive('/para-proprietarios') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Para Proprietários
        </Link>
        <Link 
          to="/planos" 
          className={`nav-link ${isActive('/planos') ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Planos
        </Link>
      </div>
    </header>
  );
};

export default Header; 