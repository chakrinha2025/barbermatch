import { animationClasses } from '@/lib/animations';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export function Footer() {
  return (
    <footer className="bg-secondary py-12 md:py-16">
      <div className="container-tight">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${animationClasses.fadeIn}`}>
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <h2 className="text-xl font-bold mb-4">BarberMatch</h2>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Revolucionando a experiência de barbearia com tecnologia de IA e RA. Encontre seu estilo e barbeiro perfeitos.
            </p>
            <div className="flex space-x-4 mb-6">
              <Link to="/about" className="p-2 rounded-full bg-white/10 text-foreground/70 hover:text-primary hover:bg-white/20 transition-all" aria-label="Instagram">
                <Instagram size={18} />
              </Link>
              <Link to="/about" className="p-2 rounded-full bg-white/10 text-foreground/70 hover:text-primary hover:bg-white/20 transition-all" aria-label="Twitter">
                <Twitter size={18} />
              </Link>
              <Link to="/about" className="p-2 rounded-full bg-white/10 text-foreground/70 hover:text-primary hover:bg-white/20 transition-all" aria-label="Facebook">
                <Facebook size={18} />
              </Link>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Mail size={14} className="mr-2" />
              <span>contato@barbermatch.com</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone size={14} className="mr-2" />
              <span>(11) 9999-9999</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-primary text-sm">Início</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary text-sm">Sobre nós</Link></li>
              <li><a href="#features" className="text-muted-foreground hover:text-primary text-sm">Recursos</a></li>
              <li><a href="#test-tool" className="text-muted-foreground hover:text-primary text-sm">Experimentação Virtual</a></li>
              <li><a href="#find-barbers" className="text-muted-foreground hover:text-primary text-sm">Encontrar Barbeiros</a></li>
              <li><Link to="/download" className="text-muted-foreground hover:text-primary text-sm">Baixar App</Link></li>
              <li><Link to="/login" className="text-muted-foreground hover:text-primary text-sm">Entrar</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary text-sm">Sobre a empresa</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm">Política de Privacidade</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary text-sm">Termos de Uso</Link></li>
              <li><Link to="/cookies" className="text-muted-foreground hover:text-primary text-sm">Política de Cookies</Link></li>
              <li><Link to="/data-processing" className="text-muted-foreground hover:text-primary text-sm">Processamento de Dados</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BarberMatch. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacidade</Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary">Termos</Link>
              <Link to="/cookies" className="text-xs text-muted-foreground hover:text-primary">Cookies</Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
