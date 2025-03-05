import React from 'react';
import FallingIconsBackground from './ui/backgrounds/FallingIconsBackground';

interface BackgroundProviderProps {
  children: React.ReactNode;
}

/**
 * Componente que envolve a aplicação e adiciona o fundo animado com ícones de barbearia
 * O fundo não será exibido em rotas de dashboard conforme configurado no FallingIconsBackground
 */
const BackgroundProvider: React.FC<BackgroundProviderProps> = ({ children }) => {
  return (
    <>
      <FallingIconsBackground 
        density={45}          // Aumentando a densidade dos ícones para efeito mais chamativo
        speed={7}             // Velocidade um pouco maior para movimento mais dinâmico  
        withTrails={true}     // Mantendo os rastros como cometas
        trailColor="#ff6a00"  // Cor laranja mais vibrante para os rastros
        iconColor="#ffffff"   // Cor branca para os ícones
        sizes={[25, 45]}      // Tamanho maior dos ícones para melhor visibilidade
      />
      {children}
    </>
  );
};

export default BackgroundProvider; 