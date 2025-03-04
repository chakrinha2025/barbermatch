import { useState, useRef, useEffect } from 'react';
import { Camera, Scissors, ArrowRight, RefreshCw, Camera as CameraIcon, Download, CheckCircle, X, TrendingUp, Award, ThumbsUp, Zap, Store, Users, CreditCard, CalendarDays, ChartBar, Star } from 'lucide-react';
import { animationClasses } from '@/lib/animations';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HAIRSTYLES = [
  { id: 1, name: 'Degradê Clássico', image: '/hairstyle-1.png', popularity: 98 },
  { id: 2, name: 'Pompadour Moderno', image: '/hairstyle-2.png', popularity: 95 },
  { id: 3, name: 'Undercut Lateral', image: '/hairstyle-3.png', popularity: 93 },
  { id: 4, name: 'Crew Cut', image: '/hairstyle-4.png', popularity: 90 },
  { id: 5, name: 'Militar Texturizado', image: '/hairstyle-5.png', popularity: 87 },
  { id: 6, name: 'Slick Back', image: '/hairstyle-6.png', popularity: 85 },
];

const POPULARES = [
  { id: 1, nome: 'Corte Moderno', imagem: '/corte-moderno.jpg', avaliacao: 4.9 },
  { id: 2, nome: 'Barba Estilizada', imagem: '/barba-estilizada.jpg', avaliacao: 4.8 },
  { id: 3, nome: 'Fade Clássico', imagem: '/fade-classico.jpg', avaliacao: 4.7 },
];

const BENEFICIOS_BARBEARIAS = [
  { icon: <Users size={24} />, titulo: 'Aumento de Clientela', descricao: 'Média de 30% mais clientes no primeiro mês' },
  { icon: <CreditCard size={24} />, titulo: 'Receita Ampliada', descricao: 'Aumento médio de 25% no faturamento' },
  { icon: <CalendarDays size={24} />, titulo: 'Agendamentos Eficientes', descricao: 'Redução de 70% em faltas e cancelamentos' },
  { icon: <ChartBar size={24} />, titulo: 'Análises Detalhadas', descricao: 'Dashboard exclusivo com métricas de desempenho' }
];

export function VirtualTryOnTool() {
  const [activeTab, setActiveTab] = useState<'camera' | 'modelos' | 'populares' | 'barbearias'>('camera');
  const [activeHairstyle, setActiveHairstyle] = useState(1);
  const [cameraActive, setCameraActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [modelo3DAtivo, setModelo3DAtivo] = useState(1);
  const [girando, setGirando] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Efeito para girar automaticamente o modelo 3D
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (girando) {
      interval = setInterval(() => {
        setModelo3DAtivo(prev => prev >= 4 ? 1 : prev + 1);
      }, 2500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [girando]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      alert("Não foi possível acessar sua câmera. Por favor, verifique as permissões.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      setPreview(null);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/png');
    setPreview(dataUrl);
    
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
    }, 2000);
  };

  const resetPreview = () => {
    setPreview(null);
  };

  const renderBarbeariasTab = () => (
    <div className="relative overflow-hidden rounded-xl glass p-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 opacity-20">
          <Scissors className="w-48 h-48 text-primary rotate-45" />
        </div>
        <div className="absolute bottom-10 left-0 opacity-10">
          <Store className="w-56 h-56 text-primary" />
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Store size={16} className="mr-2" />
            Para Barbearias
          </div>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Star size={16} className="mr-2" />
            Plataforma Premium
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Transforme sua Barbearia com Tecnologia</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            A plataforma completa que conecta sua barbearia a novos clientes, otimiza a gestão do negócio e aumenta sua lucratividade.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {BENEFICIOS_BARBEARIAS.map((beneficio, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/10 hover:border-primary/30 transition-all hover:shadow-premium-hover"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {beneficio.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{beneficio.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{beneficio.descricao}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/barbershop-login?tab=register"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-premium-hover w-full sm:w-auto"
          >
            Cadastre sua Barbearia <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/pricing"
            className="border px-6 py-3 rounded-full font-medium flex items-center justify-center hover:bg-white/5 transition-colors w-full sm:w-auto"
          >
            Conhecer os Planos
          </Link>
        </motion.div>
      </div>
    </div>
  );

  const renderCameraTab = () => (
    <div className="relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="aspect-video rounded-xl glass overflow-hidden relative"
      >
        <canvas ref={canvasRef} className="hidden" />
        
        {!cameraActive && !preview && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                <Camera className="h-10 w-10 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-center mb-4">Experimente cortes virtualmente</h3>
              <p className="text-center text-muted-foreground mb-6">
                Ative sua câmera para experimentar diferentes estilos e encontrar seu corte perfeito
              </p>
              
              <button
              onClick={startCamera}
                className="flex items-center justify-center gap-2 bg-primary text-white font-medium px-6 py-3 rounded-full hover:bg-primary/90 transition-colors w-full sm:w-auto mx-auto"
              >
                <Camera className="h-4 w-4" />
                Ativar Câmera
              </button>
            </motion.div>
          </div>
        )}

        {cameraActive && !preview && (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <button 
                onClick={captureImage}
                className="bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-all"
                aria-label="Capturar foto"
                title="Capturar foto"
              >
                <CameraIcon className="h-6 w-6" />
              </button>
              
              <button 
                onClick={stopCamera}
                className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all"
                aria-label="Encerrar câmera"
                title="Encerrar câmera"
              >
                <X className="h-6 w-6" />
                  </button>
            </div>

            <div className="absolute top-4 right-4">
              <motion.div 
                className="glass px-3 py-1.5 rounded-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-xs font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Câmera ativa
                </span>
              </motion.div>
            </div>
          </>
        )}

        {preview && (
          <div className="relative w-full h-full">
            <img 
              src={preview} 
              alt="Captura da câmera" 
              className="w-full h-full object-cover"
            />
            
            {processing ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                <p className="text-white">Processando imagem...</p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/60 to-transparent">
                  <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Estilo #3: Undercut Lateral
                  </h3>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                  <button
                    onClick={resetPreview}
                    className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Tentar Outro
                  </button>
                  
                  <button
                    onClick={() => console.log("Download")}
                    className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-all flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Salvar
                  </button>
                </div>
                
                <div className="absolute top-4 right-4">
                  <motion.div
                    className="glass px-4 py-2 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-sm font-medium flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Match encontrado!
                    </span>
                  </motion.div>
                </div>
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderModelosTab = () => (
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 p-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] relative"
              animate={{ 
                rotate: girando ? [0, 360] : 0 
              }}
              transition={{ 
                duration: girando ? 20 : 0,
                ease: "linear",
                repeat: girando ? Infinity : 0 
              }}
            >
              <img 
                src={`/images/head-model-${modelo3DAtivo}.png`} 
                alt="Modelo 3D" 
                className="w-full h-full object-contain filter drop-shadow-glow"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/300?text=3D+Model";
                }}
              />
            </motion.div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
            <button
              onClick={() => setGirando(!girando)}
              className={`px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 transition-all ${
                girando 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <RefreshCw className="h-4 w-4" />
              {girando ? 'Parar Rotação' : 'Girar Modelo'}
            </button>
                </div>
              </div>
        
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-primary/10">
            <h3 className="font-medium text-lg mb-4">Estilos Populares</h3>
            
            <div className="space-y-4">
              {HAIRSTYLES.slice(0, 4).map((style) => (
                <div 
                  key={style.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    modelo3DAtivo === style.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => setModelo3DAtivo(style.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                      {modelo3DAtivo === style.id 
                        ? <CheckCircle className="h-5 w-5 text-primary" />
                        : <Scissors className="h-5 w-5 text-muted-foreground" />
                      }
                    </div>
                    <div>
                      <h4 className="font-medium">{style.name}</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {style.popularity}% popularidade
                </div>
              </div>
          </div>
                  
                  {modelo3DAtivo === style.id && (
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                      Ativo
                    </span>
                  )}
                </div>
          ))}
        </div>
        
            <Link 
              to="/login"
              className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
            >
              Ver todos os estilos
              <ArrowRight className="h-3 w-3" />
            </Link>
      </div>
      
          <Link 
            to="/register"
            className="block text-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-premium-hover"
          >
            Experimente com sua Foto
          </Link>
      </div>
      </div>
    </div>
  );

  const renderPopularesTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {POPULARES.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: item.id * 0.1 }}
          className="rounded-xl overflow-hidden glass border border-white/10 hover:border-primary/30 transition-all hover:shadow-premium-hover"
        >
          <div className="h-48 bg-secondary/30">
            <img 
              src={item.imagem} 
              alt={item.nome}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/300x200?text=${item.nome}`;
              }}
            />
              </div>
              
          <div className="p-4">
            <h3 className="font-bold text-lg">{item.nome}</h3>
            
            <div className="flex items-center mt-2 mb-4">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={`${i < Math.floor(item.avaliacao) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} mr-1`} 
                />
              ))}
              <span className="text-sm ml-1">{item.avaliacao}</span>
            </div>
            
            <Link
              to="/login"
              className="block text-center bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors text-sm"
            >
              Ver Detalhes
            </Link>
            </div>
          </motion.div>
        ))}
    </div>
  );

  return (
    <section id="test-tool" className="section-padding bg-gradient-to-r from-primary/5 via-background to-primary/5">
      <div className="container-tight">
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Scissors size={14} className="mr-2" />
            Experimente Antes de Cortar
          </div>
          <h2 className="heading-2 mb-4">Experiência de <span className="text-gradient">Próximo Nível</span></h2>
          <p className="sub-heading max-w-2xl mx-auto">
            Use nossa tecnologia de realidade aumentada para experimentar diferentes estilos e encontrar o corte perfeito para você
          </p>
        </div>

        <div className="rounded-2xl glass-muted p-8 overflow-hidden relative">
          {/* Background elements decorativos */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
            <motion.div 
              className="absolute -top-20 -right-20 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.05, 0.1, 0.05],
                x: [0, -30, 0],
                y: [0, 30, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 15,
                ease: "easeInOut" 
              }}
            />
            
            <motion.div 
              className="absolute -bottom-32 -left-16 w-96 h-96 bg-secondary opacity-10 rounded-full filter blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1], 
                opacity: [0.05, 0.15, 0.05],
                x: [0, 40, 0],
                y: [0, -20, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 20,
                ease: "easeInOut",
                delay: 1 
              }}
            />
          </div>
          
          {/* Tabs */}
          <div className="relative z-10">
            <div className="flex overflow-x-auto no-scrollbar space-x-2 p-1 mb-6 justify-center">
            <button
              onClick={() => setActiveTab('camera')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'camera' 
                    ? 'bg-primary text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Experimentar Virtual</span>
            </button>
            
            <button
              onClick={() => setActiveTab('modelos')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'modelos' 
                    ? 'bg-primary text-white' 
                    : 'bg-white/10 hover:bg-white/20'
              }`}
            >
                <Scissors className="w-4 h-4" />
                <span>Modelos 3D</span>
            </button>
            
            <button
              onClick={() => setActiveTab('populares')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'populares' 
                    ? 'bg-primary text-white' 
                    : 'bg-white/10 hover:bg-white/20'
              }`}
            >
                <Award className="w-4 h-4" />
                <span>Mais Populares</span>
              </button>
              
              <button
                onClick={() => setActiveTab('barbearias')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'barbearias' 
                    ? 'bg-primary text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Para Barbearias</span>
            </button>
          </div>
          
            <div className="mt-6">
            {activeTab === 'camera' && renderCameraTab()}
            {activeTab === 'modelos' && renderModelosTab()}
            {activeTab === 'populares' && renderPopularesTab()}
              {activeTab === 'barbearias' && renderBarbeariasTab()}
            </div>
          </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
            to="/register"
            className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-full font-medium shadow-premium-hover hover:bg-primary/90 transition-colors gap-2"
            >
            Experimente Agora <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
      </div>
    </section>
  );
}

export default VirtualTryOnTool;
