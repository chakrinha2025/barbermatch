import { useState, useRef, useEffect } from 'react';
import { Camera, Scissors, ArrowRight, RefreshCw, Camera as CameraIcon, Download, CheckCircle, X } from 'lucide-react';
import { animationClasses } from '@/lib/animations';

const HAIRSTYLES = [
  { id: 1, name: 'Degradê Clássico', image: '/hairstyle-1.png' },
  { id: 2, name: 'Pompadour Moderno', image: '/hairstyle-2.png' },
  { id: 3, name: 'Undercut Lateral', image: '/hairstyle-3.png' },
  { id: 4, name: 'Crew Cut', image: '/hairstyle-4.png' },
  { id: 5, name: 'Militar Texturizado', image: '/hairstyle-5.png' },
  { id: 6, name: 'Slick Back', image: '/hairstyle-6.png' },
];

export function VirtualTryOnTool() {
  const [activeHairstyle, setActiveHairstyle] = useState(1);
  const [cameraActive, setCameraActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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

  return (
    <section id="test-tool" className="section-padding bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
      <div className="container-tight">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Teste Agora Mesmo
          </div>
          <h2 className="heading-2 mb-4">
            Experimente a Tecnologia <span className="text-gradient">BarberMatch</span>
          </h2>
          <p className="sub-heading max-w-2xl mx-auto">
            Use sua webcam para testar nosso sistema de visualização virtual de cortes em tempo real.
            Tenha uma prévia da experiência completa disponível no aplicativo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 items-start">
          <div className={`lg:col-span-2 space-y-6 ${animationClasses.fadeIn}`}>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Scissors className="text-primary" size={20} />
                Estilos Disponíveis
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {HAIRSTYLES.map((style) => (
                  <button
                    key={style.id}
                    className={`p-3 rounded-lg transition-all text-left flex items-center gap-3 ${
                      activeHairstyle === style.id
                        ? 'bg-primary text-white'
                        : 'bg-white/70 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20'
                    }`}
                    onClick={() => setActiveHairstyle(style.id)}
                  >
                    <div className="w-8 h-8 bg-secondary rounded-full flex-shrink-0"></div>
                    <span className="font-medium">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Dicas</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Posicione seu rosto no centro do quadro</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Certifique-se de ter boa iluminação</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Remova óculos ou chapéus para melhores resultados</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span>Experimente diferentes ângulos para ver o resultado</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={`lg:col-span-5 ${animationClasses.fadeIn}`} style={{ animationDelay: '200ms' }}>
            <div className="aspect-video rounded-xl glass overflow-hidden relative">
              {!cameraActive && !preview && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <CameraIcon size={48} className="text-primary mb-4 animate-float" />
                  <h3 className="text-xl font-bold mb-2">Experimente Virtual</h3>
                  <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                    Permita o acesso à sua câmera para testar diferentes estilos de corte com nossa 
                    tecnologia de realidade aumentada.
                  </p>
                  <button 
                    onClick={startCamera}
                    className="bg-primary text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-premium-hover"
                  >
                    <Camera size={18} />
                    <span>Ativar Câmera</span>
                  </button>
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
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                    <button 
                      onClick={captureImage}
                      className="bg-primary text-white p-3 rounded-full shadow-premium-hover hover:bg-primary/90 transition-colors"
                    >
                      <Camera size={24} />
                    </button>
                    
                    <button 
                      onClick={stopCamera}
                      className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 rounded-full glass text-sm font-medium flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span>Câmera Ativa</span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full glass text-sm">
                      <span>Estilo: {HAIRSTYLES.find(s => s.id === activeHairstyle)?.name}</span>
                    </div>
                  </div>
                </>
              )}

              {preview && (
                <>
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  
                  {processing && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
                      <RefreshCw size={40} className="text-white animate-spin mb-4" />
                      <p className="text-white font-medium">Aplicando estilo com IA...</p>
                    </div>
                  )}

                  {!processing && (
                    <>
                      <div className="absolute top-4 left-4 right-4 flex justify-between">
                        <div className="px-3 py-1 rounded-full glass text-sm">
                          <span>Estilo aplicado: {HAIRSTYLES.find(s => s.id === activeHairstyle)?.name}</span>
                        </div>

                        <div className="flex gap-2">
                          <button className="p-2 rounded-full glass text-primary hover:bg-white/30 transition-colors">
                            <Download size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                        <button 
                          onClick={resetPreview}
                          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <RefreshCw size={24} />
                        </button>
                        
                        <button 
                          onClick={stopCamera}
                          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <X size={24} />
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {cameraActive && (
              <div className="mt-4 bg-secondary/30 p-4 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> Esta é uma versão simplificada da tecnologia. Para acessar 
                  todos os recursos, incluindo análise facial avançada e maior variedade de cortes, 
                  baixe o aplicativo completo.
                </p>
              </div>
            )}

            {!cameraActive && !preview && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white dark:bg-white/5 p-4 rounded-xl flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Camera size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Teste Virtual</h4>
                    <p className="text-xs text-muted-foreground">Visualize cortes em tempo real</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-white/5 p-4 rounded-xl flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Scissors size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">6+ Estilos</h4>
                    <p className="text-xs text-muted-foreground">Escolha entre diversos cortes</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-white/5 p-4 rounded-xl flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Download size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Salve Resultados</h4>
                    <p className="text-xs text-muted-foreground">Compartilhe seu visual</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/download"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-premium-hover inline-flex mx-auto"
          >
            Acesse Todos os Recursos <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default VirtualTryOnTool;
