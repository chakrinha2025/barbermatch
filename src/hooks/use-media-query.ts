import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Definir o valor inicial
    setMatches(mediaQuery.matches);
    
    // Criar um listener para mudanças
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Adicionar o listener
    mediaQuery.addEventListener("change", handler);
    
    // Remover o listener na limpeza
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
} 