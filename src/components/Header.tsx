import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  LogIn, 
  User, 
  Scissors, 
  Store, 
  TrendingUp, 
  Sparkles, 
  Calendar,
  BarChart,
  MapPin,
  Clock,
  MessageSquare,
  Star,
  Smartphone,
  ChevronRight,
  Users,
  Zap,
  BadgePercent,
  Cpu,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeToggle from './ThemeToggle';
import { AnimatedLogo } from './ui/animated-logo';
import './header/styles.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (anchorId: string) => {
    if (isHomePage) {
      document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${anchorId}`);
    }
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="header-logo">
          <AnimatedLogo size="sm" variant="default" />
          <span className="logo-text">BarberMatch</span>
        </Link>

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

        <div className="header-actions">
          <button 
            onClick={toggleTheme} 
            className="action-button login-button"
            aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <Link to="/entrar" className="action-button login-button">
            <LogIn size={18} />
            <span>Entrar</span>
          </Link>
          
          <Link to="/cadastrar" className="action-button register-button">
            <User size={18} />
            <span>Cadastrar</span>
          </Link>
          
          <button 
            className="mobile-menu-button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link 
          to="/sobre" 
          className={`nav-link ${isActive('/sobre') ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Sobre
        </Link>
        <Link 
          to="/recursos" 
          className={`nav-link ${isActive('/recursos') ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Recursos
        </Link>
        <Link 
          to="/barbeiros" 
          className={`nav-link ${isActive('/barbeiros') ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Barbeiros
        </Link>
        <Link 
          to="/para-proprietarios" 
          className={`nav-link ${isActive('/para-proprietarios') ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Para Proprietários
        </Link>
        <Link 
          to="/planos" 
          className={`nav-link ${isActive('/planos') ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Planos
        </Link>
      </div>
    </header>
  );
};

export default Header;
