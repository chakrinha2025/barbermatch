import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RotateCcw, Download, Scissors, Heart, Share2, Grid3X3, X, Filter, Sparkles, Info, AlertCircle } from 'lucide-react';
import { calcWidthPercentage } from '@/lib/animations';

// Tipos
interface HairstyleOption {
  id: number;
  name: string;
  image: string;
  category: 'corte' | 'barba';
  popular: boolean;
  new: boolean;
}

// Dados mockados
const HAIRSTYLE_OPTIONS: HairstyleOption[] = [
  {
    id: 1,
    name: "Degradê Clássico",
    image: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: 'corte',
    popular: true,
    new: false
  },
  {
    id: 2,
    name: "Undercut Moderno",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: 'corte',
    popular: true,
    new: false
  },
  {
    id: 3,
    name: "Pompadour",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: 'corte',
    popular: false,
    new: true
  },
  {
    id: 4,
    name: "Corte Militar",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: 'corte',
    popular: false,
    new: false
  },
  {
    id: 5,
    name: "Barba Cheia",
    image: "https://images.unsplash.com/photo-1592647420148-bfcc177e2117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: 'barba',
    popular: true,
    new: false
  },
  {
    id: 6,
    name: "Barba Curta Aparada",
    image: "https://images.unsplash.com/photo-1473172707857-f9e276582ab6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: 'barba',
    popular: true,
    new: false
  },
  {
    id: 7,
    name: "Barba Estilo Lenhador",
    image: "https://images.unsplash.com/photo-1552822468-6c14fb04c8e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: 'barba',
    popular: false,
    new: false
  },
  {
    id: 8,
    name: "Cavanhaque Moderno",
    image: "https://images.unsplash.com/photo-1621605810052-80936654d313?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: 'barba',
    popular: false,
    new: true
  }
];

const TryOn = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedHairstyle, setSelectedHairstyle] = useState<HairstyleOption | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [filter, setFilter] = useState<'all' | 'corte' | 'barba'>('all');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showProcessingStatus, setShowProcessingStatus] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtra os estilos com base no filtro atual
  const filteredStyles = HAIRSTYLE_OPTIONS.filter(style => {
    if (filter === 'all') return true;
    return style.category === filter;
  });

  // Inicializa a câmera quando o usuário optar por tirar uma foto
  useEffect(() => {
    if (showCamera) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: 'user'
            } 
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Erro ao acessar a câmera:', error);
          setShowCamera(false);
        }
      };
      
      startCamera();
      
      // Limpa a stream da câmera quando o componente é desmontado
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }
  }, [showCamera]);

  // Funções de gerenciamento de imagens e processamento
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string);
        setResultImage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageDataUrl = canvas.toDataURL('image/png');
        setUploadedImage(imageDataUrl);
        setShowCamera(false);
        setResultImage(null);
        
        // Limpa a stream da câmera
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }
    }
  };

  const resetImage = () => {
    setUploadedImage(null);
    setResultImage(null);
    setSelectedHairstyle(null);
  };

  const downloadResult = () => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `barbermatch-tryout-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectHairstyle = (hairstyle: HairstyleOption) => {
    setSelectedHairstyle(hairstyle);
    if (uploadedImage) {
      processImage(hairstyle);
    }
  };

  // Simula processamento de IA para aplicar o corte/barba
  const processImage = (hairstyle: HairstyleOption) => {
    setIsProcessing(true);
    setShowProcessingStatus(true);
    setProcessingProgress(0);
    
    // Simula o progresso do processamento
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 300);
    
    // Simula o tempo de processamento
    setTimeout(() => {
      // Na vida real, aqui chamaria uma API que processa a imagem usando IA
      // Por enquanto, apenas mostra a imagem do estilo como resultado
      setResultImage(hairstyle.image);
      setIsProcessing(false);
      setProcessingProgress(100);
      
      // Esconde a barra de progresso após um breve momento
      setTimeout(() => {
        setShowProcessingStatus(false);
      }, 1500);
      
      clearInterval(progressInterval);
    }, 3000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    setShowCamera(true);
  };

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  return (
    <div className="pb-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Experimentar Cortes</h1>
          <p className="text-muted-foreground">
            Experimente diferentes cortes de cabelo e barba virtualmente
          </p>
        </div>
        <button 
          className="flex items-center px-3 py-1.5 bg-muted rounded-md hover:bg-muted/80 transition-colors"
          onClick={toggleInfoModal}
          aria-label="Informações sobre como usar esta ferramenta"
        >
          <Info size={18} className="mr-1.5" />
          <span>Como funciona</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Painel Esquerdo - Upload e Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Área de Visualização */}
          <div className="bg-card rounded-lg shadow-sm overflow-hidden">
            {!uploadedImage && !showCamera ? (
              <div className="h-[500px] flex flex-col items-center justify-center p-6 text-center">
                <Upload size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Faça upload da sua foto
                </h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Carregue uma imagem frontal clara do seu rosto para melhores resultados. 
                  Recomendamos uma foto com iluminação adequada e fundo neutro.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center"
                    onClick={triggerFileInput}
                  >
                    <Upload size={18} className="mr-2" />
                    Fazer Upload
                  </button>
                  <button 
                    className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors flex items-center justify-center"
                    onClick={openCamera}
                  >
                    <Camera size={18} className="mr-2" />
                    Usar Câmera
                  </button>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    aria-label="Fazer upload de imagem para experimentar cortes"
                    title="Selecione uma foto sua para experimentar os cortes"
                  />
                </div>
              </div>
            ) : showCamera ? (
              <div className="relative h-[500px] flex items-center justify-center bg-black">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="max-h-full max-w-full"
                ></video>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <button 
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                    onClick={takePhoto}
                    aria-label="Tirar foto"
                  >
                    <Camera size={20} />
                  </button>
                </div>
                
                <button 
                  className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:bg-background/60 transition-colors"
                  onClick={() => setShowCamera(false)}
                  aria-label="Fechar câmera"
                >
                  <X size={20} />
                </button>
                
                <canvas ref={canvasRef} className="hidden"></canvas>
              </div>
            ) : (
              <div className="relative h-[500px] flex items-center justify-center bg-black">
                {resultImage ? (
                  <img 
                    src={resultImage} 
                    alt="Resultado da simulação"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <img 
                    src={uploadedImage} 
                    alt="Imagem carregada"
                    className="max-h-full max-w-full object-contain"
                  />
                )}
                
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                    <Sparkles size={48} className="text-primary animate-pulse mb-4" />
                    <h3 className="text-white text-lg font-medium mb-2">Processando sua imagem...</h3>
                    <p className="text-white/70 mb-4">Nosso algoritmo de IA está aplicando o estilo selecionado</p>
                    <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-primary transition-all duration-300 rounded-full ${calcWidthPercentage(processingProgress, 100)}`}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    className="p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:bg-background/60 transition-colors"
                    onClick={resetImage}
                    aria-label="Redefinir imagem"
                  >
                    <RotateCcw size={20} />
                  </button>
                  
                  {resultImage && (
                    <button 
                      className="p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:bg-background/60 transition-colors"
                      onClick={downloadResult}
                      aria-label="Baixar resultado"
                    >
                      <Download size={20} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Controles e Ações (apenas se houver imagem) */}
          {uploadedImage && resultImage && (
            <div className="bg-card p-4 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-medium">
                    {selectedHairstyle?.name || 'Estilo aplicado'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedHairstyle?.category === 'corte' ? 'Corte de cabelo' : 'Estilo de barba'}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border rounded-md hover:bg-muted transition-colors flex items-center">
                    <Heart size={16} className="mr-1.5" />
                    Salvar
                  </button>
                  <button className="px-3 py-1.5 border rounded-md hover:bg-muted transition-colors flex items-center">
                    <Share2 size={16} className="mr-1.5" />
                    Compartilhar
                  </button>
                  <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center">
                    <Scissors size={16} className="mr-1.5" />
                    Agendar Corte
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Barra de processamento flutuante */}
          {showProcessingStatus && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card shadow-lg rounded-lg p-3 z-50 flex items-center w-72">
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">Processando</span>
                  <span className="text-xs">{processingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-primary transition-all duration-300 rounded-full ${calcWidthPercentage(processingProgress, 100)}`}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Painel Direito - Estilos Disponíveis */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Estilos Disponíveis</h2>
            
            <div className="flex">
              <button 
                className={`px-3 py-1 text-sm rounded-l-md ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setFilter('all')}
              >
                Todos
              </button>
              <button 
                className={`px-3 py-1 text-sm ${filter === 'corte' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setFilter('corte')}
              >
                Cortes
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-r-md ${filter === 'barba' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => setFilter('barba')}
              >
                Barbas
              </button>
            </div>
          </div>
          
          <div className="overflow-y-auto pr-2 max-h-[600px] grid grid-cols-2 gap-3">
            {filteredStyles.map(style => (
              <div 
                key={style.id}
                className={`relative rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedHairstyle?.id === style.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => selectHairstyle(style)}
              >
                <img 
                  src={style.image} 
                  alt={style.name}
                  className="w-full h-40 object-cover"
                />
                
                {style.new && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Novo
                  </div>
                )}
                
                {style.popular && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Popular
                  </div>
                )}
                
                <div className="p-2">
                  <h3 className="font-medium text-sm">{style.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {style.category === 'corte' ? 'Corte de cabelo' : 'Estilo de barba'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mensagem caso não tenha feito upload de imagem */}
          {!uploadedImage && (
            <div className="rounded-lg border border-dashed p-4 bg-muted/50 text-center">
              <AlertCircle size={24} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Envie uma foto sua para experimentar estes estilos
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de Informações */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Como Experimentar Cortes</h2>
                <button
                  className="text-muted-foreground hover:text-foreground" 
                  onClick={toggleInfoModal}
                  aria-label="Fechar informações"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Envie sua foto</h3>
                    <p className="text-sm text-muted-foreground">
                      Faça upload de uma foto frontal do seu rosto ou use a câmera para tirar uma foto instantaneamente. Para melhores resultados, use uma foto com boa iluminação e fundo neutro.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Escolha um estilo</h3>
                    <p className="text-sm text-muted-foreground">
                      Navegue pelos estilos disponíveis e clique em um para aplicá-lo à sua foto. Você pode filtrar entre cortes de cabelo e estilos de barba.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Visualize o resultado</h3>
                    <p className="text-sm text-muted-foreground">
                      Nossa tecnologia de IA aplicará o estilo escolhido à sua foto. Aguarde alguns instantes para o processamento ser concluído.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-3">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium">Salve ou agende</h3>
                    <p className="text-sm text-muted-foreground">
                      Se gostar do resultado, você pode baixar a imagem, salvá-la na sua conta ou agendar diretamente com um barbeiro para obter o estilo escolhido.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-blue-50 text-blue-800 rounded-md flex items-start">
                <Info size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Esta é uma ferramenta de simulação visual. Os resultados reais podem variar dependendo do seu tipo de cabelo, formato de rosto e habilidade do barbeiro. Recomendamos sempre consultar um profissional.
                </p>
              </div>
              
              <div className="mt-6 text-right">
                <button 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  onClick={toggleInfoModal}
                >
                  Entendi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryOn; 