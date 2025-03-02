
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AnimatedLogo from './AnimatedLogo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-background/80 backdrop-blur-lg shadow-sm' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container-tight flex justify-between items-center">
        <Link to="/" className="z-10">
          <AnimatedLogo size={isScrolled ? 'small' : 'default'} />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/about" className="nav-link">Sobre</Link>
          <Link to="/download" className="nav-link">Download</Link>
          <a href="#features" className="nav-link">Recursos</a>
          <a href="#test-tool" className="nav-link">Testar</a>
          <a href="#find-barbers" className="nav-link">Barbeiros</a>
          
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-background/95 backdrop-blur-md z-40 transition-transform duration-300 transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}>
          <div className="container pt-20 px-6">
            <nav className="flex flex-col gap-4 text-lg">
              <Link 
                to="/about" 
                className="py-3 border-b border-muted hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                to="/download" 
                className="py-3 border-b border-muted hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download
              </Link>
              <a 
                href="#features" 
                className="py-3 border-b border-muted hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recursos
              </a>
              <a 
                href="#test-tool" 
                className="py-3 border-b border-muted hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testar
              </a>
              <a 
                href="#find-barbers" 
                className="py-3 border-b border-muted hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Barbeiros
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
