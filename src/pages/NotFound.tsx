
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { animationClasses } from "@/lib/animations";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Erro: Usuário tentou acessar rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className={`text-center max-w-md px-6 ${animationClasses.scaleIn}`}>
        <span className="inline-block text-9xl font-bold text-primary mb-4">404</span>
        <h1 className="text-3xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
        >
          <Home size={18} />
          <span>Voltar ao Início</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
