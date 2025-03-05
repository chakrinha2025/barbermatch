import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import { BARBER_ICONS, svgToDataURI } from '../../assets/particles';

// Definição do tipo de partícula temática
type ParticleType = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
  color: THREE.Color;
  alpha: number;
  texture: number; // Índice para o tipo de textura/ícone
  rotationSpeed: number;
  rotation: number;
};

interface BarberParticlesProps {
  density?: number; // Controla a quantidade de partículas
  speed?: number;   // Velocidade da animação
  color1?: string;  // Cor primária (azul por padrão)
  color2?: string;  // Cor secundária (cyan por padrão)
  className?: string;
}

const BarberParticles: React.FC<BarberParticlesProps> = ({
  density = 1.0,
  speed = 1.0,
  color1 = '#0066cc',
  color2 = '#00ccff',
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<ParticleType[]>([]);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const animationFrameRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Efeito para criar e inicializar a cena 3D
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Limpeza de recursos anteriores se existirem
    if (rendererRef.current) {
      containerRef.current.removeChild(rendererRef.current.domElement);
      rendererRef.current.dispose();
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Definir cores com base no tema
    const primaryColor = isDark ? color1 : '#003366';
    const secondaryColor = isDark ? color2 : '#0088cc';
    
    // Inicialização da cena 3D
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    // Criar cena
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Criar câmera
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;
    
    // Criar renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Carregar texturas com SVGs de barbearia
    const textureLoader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    const iconKeys = Object.keys(BARBER_ICONS) as (keyof typeof BARBER_ICONS)[];
    
    // Carrega cada ícone SVG como uma textura
    const loadTexturePromises = iconKeys.map(key => {
      const svgDataURI = svgToDataURI(BARBER_ICONS[key]);
      return new Promise<THREE.Texture>((resolve) => {
        textureLoader.load(svgDataURI, (texture) => {
          resolve(texture);
        }, undefined, () => {
          // Fallback para textura padrão em caso de erro
          const canvas = document.createElement('canvas');
          canvas.width = 64;
          canvas.height = 64;
          const context = canvas.getContext('2d');
          if (context) {
            context.beginPath();
            context.arc(32, 32, 16, 0, Math.PI * 2);
            context.fillStyle = 'white';
            context.fill();
          }
          resolve(new THREE.CanvasTexture(canvas));
        });
      });
    });
    
    // Adicionar uma textura circular simples como opção
    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = 64;
    circleCanvas.height = 64;
    const circleContext = circleCanvas.getContext('2d');
    if (circleContext) {
      circleContext.beginPath();
      circleContext.arc(32, 32, 16, 0, Math.PI * 2);
      circleContext.fillStyle = 'white';
      circleContext.fill();
      
      const circleTexture = new THREE.CanvasTexture(circleCanvas);
      textures.push(circleTexture);
    }
    
    // Preparar a cena enquanto espera as texturas carregarem
    Promise.all(loadTexturePromises).then(loadedTextures => {
      textures.push(...loadedTextures);
      texturesRef.current = textures;
      
      // Criar partículas
      const particleCount = Math.floor(700 * density);
      const particles: ParticleType[] = [];
      const mainColor = new THREE.Color(primaryColor);
      const altColor = new THREE.Color(secondaryColor);
      
      // Grupo para conter todas as partículas
      const particleGroup = new THREE.Group();
      scene.add(particleGroup);
      
      for (let i = 0; i < particleCount; i++) {
        // Posição inicial - partículas ao redor do centro
        const distance = Math.random() * 10 + 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        
        const x = distance * Math.sin(theta) * Math.cos(phi);
        const y = distance * Math.sin(theta) * Math.sin(phi);
        const z = distance * Math.cos(theta);
        
        // Velocidade - direção para fora do centro
        const velocity = new THREE.Vector3(x, y, z);
        velocity.normalize();
        velocity.multiplyScalar(Math.random() * 0.2 * speed + 0.05);
        
        // Cor - mistura entre as duas cores principais
        const color = Math.random() > 0.6 ? altColor.clone() : mainColor.clone();
        
        // Criar objeto de partícula
        const particle: ParticleType = {
          position: new THREE.Vector3(x, y, z),
          velocity,
          size: Math.random() * 1.5 + 0.5,
          color,
          alpha: Math.random() * 0.5 + 0.5,
          texture: Math.floor(Math.random() * textures.length),
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          rotation: Math.random() * Math.PI * 2
        };
        
        particles.push(particle);
        
        // Criar mesh para a partícula
        const material = new THREE.SpriteMaterial({
          map: textures[particle.texture],
          transparent: true,
          color: particle.color,
          opacity: particle.alpha,
        });
        
        const sprite = new THREE.Sprite(material);
        sprite.position.set(particle.position.x, particle.position.y, particle.position.z);
        sprite.scale.set(particle.size, particle.size, 1);
        sprite.userData = { index: i };
        
        particleGroup.add(sprite);
      }
      
      particlesRef.current = particles;
      
      // Adicionar iluminação ambiente
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      // Adicionar ponto de luz no centro
      const pointLight = new THREE.PointLight(primaryColor, 1, 100);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);
      
      // Função de animação
      const animate = () => {
        // Atualizar cada partícula
        particleGroup.children.forEach((child, index) => {
          if (index < particles.length) {
            const particle = particles[index];
            
            // Mover a partícula
            particle.position.add(particle.velocity);
            
            // Girar a partícula
            particle.rotation += particle.rotationSpeed;
            
            // Atualizar a mesh da partícula
            child.position.copy(particle.position);
            child.rotation.z = particle.rotation;
            
            // Se a partícula saiu do campo de visão, reiniciá-la
            if (
              particle.position.length() > 100 ||
              Math.random() < 0.001
            ) {
              // Recriar no centro
              const distance = Math.random() * 5;
              const theta = Math.random() * Math.PI * 2;
              const phi = Math.random() * Math.PI * 2;
              
              const x = distance * Math.sin(theta) * Math.cos(phi);
              const y = distance * Math.sin(theta) * Math.sin(phi);
              const z = distance * Math.cos(theta);
              
              particle.position.set(x, y, z);
              
              // Nova direção
              const velocity = new THREE.Vector3(x, y, z);
              velocity.normalize();
              velocity.multiplyScalar(Math.random() * 0.2 * speed + 0.05);
              particle.velocity = velocity;
              
              // Atualizar cor e tamanho
              if (Math.random() > 0.6) {
                particle.color = altColor.clone();
              } else {
                particle.color = mainColor.clone();
              }
              
              particle.texture = Math.floor(Math.random() * textures.length);
              particle.size = Math.random() * 1.5 + 0.5;
              particle.alpha = Math.random() * 0.5 + 0.5;
              
              // Atualizar material
              if (child instanceof THREE.Sprite) {
                const material = child.material as THREE.SpriteMaterial;
                material.map = textures[particle.texture];
                material.color = particle.color;
                material.opacity = particle.alpha;
                
                child.scale.set(particle.size, particle.size, 1);
              }
            }
          }
        });
        
        // Girar a câmera lentamente ao redor da cena
        const time = Date.now() * 0.0001;
        camera.position.x = Math.sin(time) * 50;
        camera.position.z = Math.cos(time) * 50;
        camera.lookAt(0, 0, 0);
        
        // Renderizar a cena
        renderer.render(scene, camera);
        
        // Continuar animação
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      // Iniciar animação
      animate();
    });
    
    // Ajustar tamanho ao redimensionar janela
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Limpar recursos ao desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      // Liberar texturas
      texturesRef.current.forEach(texture => texture.dispose());
      
      // Liberar materiais e geometrias
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) {
              object.geometry.dispose();
            }
            
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [density, speed, color1, color2, isDark]);
  
  return (
    <div
      ref={containerRef}
      className={`barber-particles-background ${className || ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    />
  );
};

export default BarberParticles; 