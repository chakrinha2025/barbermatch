
import { animationClasses } from '@/lib/animations';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary py-12 md:py-16">
      <div className="container">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${animationClasses.fadeIn}`}>
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">BarberMatch</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Revolucionando a experiência de barbearia com tecnologia de IA e RA. Encontre seu estilo e barbeiro perfeitos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary text-sm">Início</Link></li>
              <li><a href="#features" className="text-muted-foreground hover:text-primary text-sm">Recursos</a></li>
              <li><a href="#virtual-try-on" className="text-muted-foreground hover:text-primary text-sm">Experimentação Virtual</a></li>
              <li><a href="#find-barbers" className="text-muted-foreground hover:text-primary text-sm">Encontrar Barbeiros</a></li>
              <li><Link to="/download" className="text-muted-foreground hover:text-primary text-sm">Baixar App</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
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
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacidade</Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary">Termos</Link>
              <Link to="/cookies" className="text-xs text-muted-foreground hover:text-primary">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
