
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { animationClasses } from '@/lib/animations';
import { ThemeToggle } from './ThemeToggle';
import { Link } from 'react-router-dom';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Início', href: '/' },
  { label: 'Experimentar Virtual', href: '#virtual-try-on' },
  { label: 'Barbeiros', href: '#find-barbers' },
  { label: 'Recursos', href: '#features' },
  { label: 'Baixar App', href: '/download' },
  { label: 'Sobre', href: '/about' },
];

export function Header() {
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
        isScrolled ? 'py-3 glass shadow-sm' : 'py-5 bg-transparent'
      } ${animationClasses.slideDown}`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">BarberMatch</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            link.href.startsWith('#') ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary smooth-transform"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary smooth-transform"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden">
            <div className="flex flex-col p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary">BarberMatch</span>
                <button
                  className="p-2 text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Fechar menu"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  link.href.startsWith('#') ? (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 hover:text-primary smooth-transform"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-lg font-medium text-foreground/80 hover:text-primary smooth-transform"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
