import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './falling-icons.css';

// Lista dos caminhos de dashboard onde o fundo NÃO deve aparecer
const DASHBOARD_PATHS = [
  '/client/dashboard',
  '/barber/dashboard',
  '/barbershop/dashboard',
  '/admin/dashboard',
  '/admin',
  '/barber',
  '/client',
  '/barbershop'
];

interface FallingIconsBackgroundProps {
  density?: number; // 1-100 - Densidade dos ícones
  speed?: number; // 1-10 - Velocidade da queda
  withTrails?: boolean; // Se deve ter rastros
  trailColor?: string; // Cor dos rastros
  iconColor?: string; // Cor dos ícones
  sizes?: number[]; // Tamanhos dos ícones [min, max]
}

const FallingIconsBackground: React.FC<FallingIconsBackgroundProps> = ({
  density = 30,
  speed = 5,
  withTrails = true,
  trailColor = "#ffa500",
  iconColor = "#ffffff",
  sizes = [15, 35],
}) => {
  const location = useLocation();
  const [shouldRender, setShouldRender] = useState(true);
  const [icons, setIcons] = useState<JSX.Element[]>([]);
  
  // Verifica se está em uma tela de dashboard
  useEffect(() => {
    const isDashboard = DASHBOARD_PATHS.some(path => 
      location.pathname.startsWith(path)
    );
    setShouldRender(!isDashboard);
  }, [location]);

  // Cria os ícones com base na densidade
  useEffect(() => {
    if (!shouldRender) return;
    
    const newIcons: JSX.Element[] = [];
    const iconTypes = [
      '✂️', // Tesoura 
      '💈', // Poste de barbeiro
      '🪒', // Navalha
      '💇‍♂️', // Homem cortando cabelo
      '💇‍♀️', // Mulher cortando cabelo
      '🧔‍♂️', // Homem com barba
      '💆‍♂️', // Massagem facial
      '💅', // Manicure
      '👨‍🦰', // Homem com cabelo ruivo
      '👨‍🦱', // Homem com cabelo cacheado
      '👨‍🦳', // Homem com cabelo branco
      '👨‍🦲', // Homem careca
      '🧴', // Loção
      '💪', // Braço musculoso (estilo)
      '🔥', // Fogo (tendência)
      '⭐', // Estrela (avaliação)
    ];

    // Efeitos especiais personalizados
    const createSvgIcon = (type: string) => {
      const colors = ['#ffa500', '#ff4500', '#8a2be2', '#20b2aa', '#ff6347'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      switch(type) {
        case 'scissors':
          return (
            <div className="svg-icon" style={{ color: randomColor }}>
              ✂️
            </div>
          );
        case 'razor':
          return (
            <div className="svg-icon" style={{ color: randomColor }}>
              🪒
            </div>
          );
        case 'comb':
          return (
            <div className="svg-icon" style={{ color: randomColor }}>
              <span style={{ fontSize: '1.2em' }}>〰️</span>
            </div>
          );
        default:
          return null;
      }
    };
    
    const speedVariation = ['slow', 'medium', 'fast'];
    const sizeVariation = ['small', 'medium', 'large'];
    
    for (let i = 0; i < density; i++) {
      // 20% de chance de ser um ícone SVG personalizado
      const useSvgIcon = Math.random() < 0.2;
      let iconContent;
      
      if (useSvgIcon) {
        const svgTypes = ['scissors', 'razor', 'comb'];
        const randomSvgType = svgTypes[Math.floor(Math.random() * svgTypes.length)];
        iconContent = createSvgIcon(randomSvgType);
      } else {
        const randomIcon = iconTypes[Math.floor(Math.random() * iconTypes.length)];
        iconContent = randomIcon;
      }
      
      const randomLeft = Math.random() * 100;
      const randomDelay = Math.random() * 30; // Aumentado para maior variação
      const randomSpeed = speedVariation[Math.floor(Math.random() * speedVariation.length)];
      const randomSize = sizeVariation[Math.floor(Math.random() * sizeVariation.length)];
      
      const hasGlow = Math.random() < 0.3; // 30% de chance de ter brilho especial
      const hasRotation = Math.random() < 0.7; // 70% de chance de ter rotação
      const rotationClass = hasRotation ? 'with-rotation' : '';
      const glowClass = hasGlow ? 'with-glow' : '';
      
      newIcons.push(
        <div 
          key={i}
          className={`falling-icon ${randomSize} ${randomSpeed} ${withTrails ? 'with-trail' : ''} ${rotationClass} ${glowClass}`}
          style={{
            left: `${randomLeft}%`,
            animationDelay: `${randomDelay}s`,
            fontSize: `${Math.floor(Math.random() * (sizes[1] - sizes[0]) + sizes[0])}px`,
            '--trail-color': hasGlow ? '#ffcc00' : trailColor, // Rastros dourados para ícones com brilho
            '--falling-speed': `${speed * 2}s`
          } as React.CSSProperties}
        >
          {iconContent}
        </div>
      );
    }
    
    setIcons(newIcons);
  }, [density, speed, withTrails, trailColor, iconColor, sizes, shouldRender]);

  // Se não deve renderizar, não renderiza nada
  if (!shouldRender) {
    return null;
  }

  return (
    <div className="barber-icons-background">
      {icons}
    </div>
  );
};

export default FallingIconsBackground; 