
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import { animationClasses } from '@/lib/animations';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        isScrolled ? 'py-2 bg-background/80 backdrop-blur-xl shadow-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className={animationClasses.fadeIn}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium hover:text-primary transition-colors">
            Início
          </Link>
          <Link to="#features" className="font-medium hover:text-primary transition-colors">
            Recursos
          </Link>
          <Link to="#virtual-try-on" className="font-medium hover:text-primary transition-colors">
            Experimentar
          </Link>
          <Link to="#download" className="font-medium hover:text-primary transition-colors">
            Download
          </Link>
          <Link to="/about" className="font-medium hover:text-primary transition-colors">
            Sobre
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/download"
            className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-premium-hover"
          >
            Baixar App
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 p-4">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              to="/"
              className="py-2 px-4 hover:bg-muted rounded-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="#features"
              className="py-2 px-4 hover:bg-muted rounded-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Recursos
            </Link>
            <Link
              to="#virtual-try-on"
              className="py-2 px-4 hover:bg-muted rounded-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Experimentar
            </Link>
            <Link
              to="#download"
              className="py-2 px-4 hover:bg-muted rounded-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Download
            </Link>
            <Link
              to="/about"
              className="py-2 px-4 hover:bg-muted rounded-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/download"
              className="mt-4 bg-primary text-white py-3 px-4 rounded-xl font-medium text-center shadow-premium-hover"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Baixar App
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
