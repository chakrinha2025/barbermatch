import React from 'react';
import { useLocation } from 'react-router-dom';
import BarberParticles from './BarberParticles';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  excludedPaths?: string[];
}

/**
 * Este componente adiciona o background de partículas estilo espacial em todas as páginas do site
 * (exceto nas rotas especificadas em excludedPaths)
 */
const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ 
  children, 
  excludedPaths = [
    // Rotas de dashboard que não devem ter o background
    '/client/dashboard',
    '/barber/dashboard',
    '/barbershop/dashboard',
    '/admin/dashboard',
    '/admin',
    '/client/profile',
    '/barber/profile',
  ] 
}) => {
  const location = useLocation();
  
  // Verifica se a rota atual está na lista de exclusões
  const shouldShowBackground = !excludedPaths.some(path => 
    location.pathname.startsWith(path)
  );
  
  // Paletas de cores baseadas no tema da barbearia
  const colorPalettes = {
    blue: {
      primary: '#1a365d',   // Azul escuro
      secondary: '#2b6cb0'  // Azul médio
    },
    purple: {
      primary: '#44337a',   // Roxo escuro
      secondary: '#805ad5'  // Roxo médio
    },
    barber: {
      primary: '#1e3a8a',   // Azul barbeiro tradicional
      secondary: '#3b82f6'  // Azul claro
    }
  };
  
  // Escolher a paleta (pode ser alterado conforme preferência)
  const selectedPalette = colorPalettes.barber;
  
  return (
    <>
      {shouldShowBackground && (
        <BarberParticles 
          color1={selectedPalette.primary}
          color2={selectedPalette.secondary}
          density={1.2}
          speed={0.8}
        />
      )}
      {children}
    </>
  );
};

export default BackgroundWrapper; 