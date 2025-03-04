import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-bold mt-4 mb-2">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe ou
          foi movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="px-6 py-3 rounded-full bg-primary text-white font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <Home size={18} />
            Voltar ao Início
          </Link>
          
          <Link 
            to="/#virtual-try-on" 
            className="px-6 py-3 rounded-full border border-input bg-background font-medium hover:bg-accent transition-colors"
          >
            Experimente Virtual
          </Link>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">Sobre</Link>
          <Link to="/download" className="text-sm text-muted-foreground hover:text-primary">Download</Link>
          <Link to="/#features" className="text-sm text-muted-foreground hover:text-primary">Recursos</Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary">Preços</Link>
          <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">Entrar</Link>
        </div>
      </div>
    </div>
  );
}
