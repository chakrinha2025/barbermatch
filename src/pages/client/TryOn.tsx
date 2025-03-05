<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RotateCcw, Download, Scissors, Heart, Share2, Grid3X3, X, Filter, Sparkles, Info, AlertCircle, Check, ChevronRight, User, ThumbsDown, Shuffle, ThumbsUp, Clock, Save, RefreshCw, Loader2 } from 'lucide-react';
import { calcWidthPercentage } from '@/lib/animations';
import { apiService } from '@/api/api.service';
import { arService, Hairstyle, VirtualTryOn } from '@/api/ar.service';
import { faceRecognition, FaceDetectionResult } from '@/lib/ar/FaceRecognition';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { supabase } from '@/api/supabase-client';
=======

import React, { useState, useRef, useEffect } from 'react';
import { Camera, Save, RotateCcw, Sliders, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import TrendCard from "@/components/TrendCard";

const BEARD_STYLES = [
  { id: 'style1', name: 'Barba Completa', image: '/images/style-1.jpg' },
  { id: 'style2', name: 'Barba Curta', image: '/images/style-2.jpg' },
  { id: 'style3', name: 'Barba Desenhada', image: '/images/style-3.jpg' },
  { id: 'style4', name: 'Goatee', image: '/public/images/style-1.jpg' },
  { id: 'style5', name: 'Bigode', image: '/public/images/style-2.jpg' },
];

const HAIR_STYLES = [
  { id: 'hairstyle1', name: 'Degradê', image: '/public/hairstyle-1.png' },
  { id: 'hairstyle2', name: 'Texturizado', image: '/public/hairstyle-2.png' },
  { id: 'hairstyle3', name: 'Pompadour', image: '/public/hairstyle-3.png' },
  { id: 'hairstyle4', name: 'Undercut', image: '/public/hairstyle-4.png' },
  { id: 'hairstyle5', name: 'Comb Over', image: '/public/hairstyle-5.png' },
  { id: 'hairstyle6', name: 'Crew Cut', image: '/public/hairstyle-6.png' },
];
>>>>>>> fa272d7a703d73d4299e60c1dd52a39636e49c0e

// Componente principal
const TryOn = () => {
<<<<<<< HEAD
  // Estados para gerenciar a aplicação
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedHairstyle, setSelectedHairstyle] = useState<Hairstyle | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [filter, setFilter] = useState<'all' | 'corte' | 'barba'>('all');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showProcessingStatus, setShowProcessingStatus] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [faceDetection, setFaceDetection] = useState<FaceDetectionResult | null>(null);
  const [hairstyles, setHairstyles] = useState<Hairstyle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [faceShape, setFaceShape] = useState<string | null>(null);
  const [recommendedStyles, setRecommendedStyles] = useState<Hairstyle[]>([]);
  const [savedTryOns, setSavedTryOns] = useState<any[]>([]);
  const [showSavedTryOns, setShowSavedTryOns] = useState(false);
  const [isSavingTryOn, setIsSavingTryOn] = useState(false);
  const [tryOnFeedback, setTryOnFeedback] = useState<'liked' | 'disliked' | 'neutral' | null>(null);
  const { user } = useAuth();

  // Referências para os elementos DOM
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);

  // Filtra os estilos com base no filtro atual
  const filteredStyles = hairstyles.filter(style => {
    if (filter === 'all') return true;
    return style.category === filter;
  });

  // Carregamento inicial dos estilos e modelos de IA
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Carregar modelos de reconhecimento facial
        await faceRecognition.loadModels();
        
        // Buscar estilos de corte do Supabase
        const hairstylesData = await arService.getAllHairstyles();
        setHairstyles(hairstylesData);
        
        // Buscar experimentações salvas do cliente atual
        const currentUser = apiService.getCurrentUser();
        if (currentUser) {
          const savedTryOnsData = await arService.getClientVirtualTryOns(currentUser.id);
          setSavedTryOns(savedTryOnsData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao inicializar:', error);
        toast.error('Houve um erro ao carregar os recursos necessários');
        setIsLoading(false);
      }
    };
    
    initializeApp();
  }, []);

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
          toast.error('Não foi possível acessar a câmera');
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

  // Atualiza as recomendações quando o formato do rosto é detectado
  useEffect(() => {
    if (faceShape && hairstyles.length > 0) {
      const recommended = faceRecognition.recommendHairstyles(faceShape, hairstyles);
      setRecommendedStyles(recommended);
    }
  }, [faceShape, hairstyles]);

  // Funções de gerenciamento de imagens e processamento
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string);
        setResultImage(null);
        
        // Processar a detecção facial na imagem carregada
        await detectFacesInImage(e.target.result as string);
=======
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [beardStyle, setBeardStyle] = useState('style1');
  const [hairStyle, setHairStyle] = useState('hairstyle1');
  const [hairColor, setHairColor] = useState('#000000');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('hairstyles');
  const [savedLooks, setSavedLooks] = useState<Array<{id: string, image: string, name: string}>>([]);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
        toast({
          title: "Erro de Acesso à Câmera",
          description: "Não conseguimos acessar sua câmera. Verifique as permissões do navegador.",
          variant: "destructive"
        });
>>>>>>> fa272d7a703d73d4299e60c1dd52a39636e49c0e
      }
    };

    getVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const detectFacesInImage = async (imageDataUrl: string) => {
    try {
      const img = new Image();
      img.src = imageDataUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // Usar nossa biblioteca de detecção facial
      const detection = await faceRecognition.detectFaces(img, {
        withLandmarks: true,
        determineFaceShape: true
      });
      
      if (detection.detections.length === 0) {
        toast.error('Nenhum rosto detectado na imagem. Por favor, tente outra foto.');
        return;
      }
      
      setFaceDetection(detection);
      if (detection.faceShape) {
        setFaceShape(detection.faceShape);
        toast.info(`Formato de rosto detectado: ${detection.faceShape}`);
      }
      
    } catch (error) {
      console.error('Erro na detecção facial:', error);
      toast.error('Erro ao processar reconhecimento facial');
    }
  };

  const takePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');
        setPhoto(dataUrl);
        
<<<<<<< HEAD
        const imageDataUrl = canvas.toDataURL('image/png');
        setUploadedImage(imageDataUrl);
        setShowCamera(false);
        setResultImage(null);
        
        // Processar a detecção facial na foto tirada
        await detectFacesInImage(imageDataUrl);
        
        // Limpa a stream da câmera
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
=======
        toast({
          title: "Foto Capturada",
          description: "Sua foto foi capturada com sucesso!",
        });
>>>>>>> fa272d7a703d73d4299e60c1dd52a39636e49c0e
      }
    }
  };

<<<<<<< HEAD
  const resetImage = () => {
    setUploadedImage(null);
    setResultImage(null);
    setSelectedHairstyle(null);
    setFaceDetection(null);
    setFaceShape(null);
    setTryOnFeedback(null);
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

  const selectHairstyle = (hairstyle: Hairstyle) => {
    setSelectedHairstyle(hairstyle);
    if (uploadedImage && faceDetection) {
      processImage(hairstyle);
    } else if (uploadedImage) {
      toast.warning('Por favor, aguarde a detecção facial ser concluída');
    } else {
      toast.warning('Por favor, carregue uma imagem ou tire uma foto primeiro');
    }
  };

  // Processa a imagem para aplicar o estilo selecionado
  const processImage = async (hairstyle: Hairstyle) => {
    if (!uploadedImage || !faceDetection) return;
    
    setIsProcessing(true);
    setShowProcessingStatus(true);
    setProcessingProgress(0);
    
    try {
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
      
      // Criar imagem com o estilo a ser aplicado
      const hairstyleImage = new Image();
      hairstyleImage.crossOrigin = "anonymous";
      hairstyleImage.setAttribute('data-category', hairstyle.category);
      
      // Usar a primeira imagem da lista
      const imageUrl = hairstyle.image_urls && hairstyle.image_urls.length > 0 
        ? hairstyle.image_urls[0] 
        : 'https://via.placeholder.com/400?text=Estilo+Indisponível';
      
      hairstyleImage.src = imageUrl;
      
      await new Promise((resolve) => {
        hairstyleImage.onload = resolve;
      });
      
      // Criar uma imagem da foto do usuário
      const userImage = new Image();
      userImage.src = uploadedImage;
      
      await new Promise((resolve) => {
        userImage.onload = resolve;
      });
      
      // Preparar o canvas para renderização
      const canvas = resultCanvasRef.current;
      if (!canvas) {
        throw new Error('Canvas não encontrado');
      }
      
      canvas.width = userImage.width;
      canvas.height = userImage.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Não foi possível obter o contexto 2D do canvas');
      }
      
      // Desenhar a imagem do usuário
      ctx.drawImage(userImage, 0, 0, canvas.width, canvas.height);
      
      // Aplicar o estilo usando nosso serviço de AR
      await faceRecognition.applyHairstyleOverlay(canvas, faceDetection, hairstyleImage);
      
      // Obter a imagem resultante
      const resultDataUrl = canvas.toDataURL('image/png');
      setResultImage(resultDataUrl);
      
      // Incrementar a popularidade do estilo
      await arService.incrementHairstylePopularity(hairstyle.id);
      
      setIsProcessing(false);
      setProcessingProgress(100);
      
      // Esconde a barra de progresso após um breve momento
      setTimeout(() => {
        setShowProcessingStatus(false);
      }, 1500);
      
      clearInterval(progressInterval);
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      toast.error('Houve um erro ao aplicar o estilo');
      setIsProcessing(false);
      setShowProcessingStatus(false);
    }
  };

  const saveTryOn = async () => {
    if (!resultImage || !selectedHairstyle || !user) {
      toast.error('Nenhuma experimentação para salvar');
      return;
    }
    
    setIsSavingTryOn(true);
    
    try {
      // Buscar o cliente ID a partir do user ID
      const { data: clientData } = await apiService.getCurrentUser();
      
      if (!clientData?.id) {
        throw new Error('Cliente não encontrado');
      }
      
      // Obter cliente_id a partir do user_id atual
      const clientId = clientData.id;
      
      // Salvar na tabela de try-ons
      await arService.saveVirtualTryOn({
        client_id: clientId,
        hairstyle_id: selectedHairstyle.id,
        result_image_url: resultImage,
        face_data: faceShape ? { face_shape: faceShape } : null,
        is_saved: true,
        feedback: tryOnFeedback as 'liked' | 'disliked' | 'neutral' | null,
      });
      
      toast.success('Experimentação salva com sucesso!');
      
      // Atualizar a lista de experimentações salvas
      const savedTryOnsData = await arService.getClientVirtualTryOns(clientId);
      setSavedTryOns(savedTryOnsData);
    } catch (error) {
      console.error('Erro ao salvar experimentação:', error);
      toast.error('Não foi possível salvar a experimentação');
    } finally {
      setIsSavingTryOn(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    setShowCamera(true);
  };

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
=======
  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
  };

  const saveLook = () => {
    if (photo) {
      const newLook = {
        id: `look-${Date.now()}`,
        image: photo,
        name: `Look ${savedLooks.length + 1}`
      };
      
      setSavedLooks([...savedLooks, newLook]);
      
      toast({
        title: "Look Salvo",
        description: "Seu visual foi salvo na galeria!",
      });
    }
  };

  const selectBeardStyle = (styleId: string) => {
    setBeardStyle(styleId);
    
    toast({
      title: "Estilo de Barba Alterado",
      description: `Novo estilo aplicado: ${BEARD_STYLES.find(style => style.id === styleId)?.name}`,
    });
  };

  const selectHairStyle = (styleId: string) => {
    setHairStyle(styleId);
    
    toast({
      title: "Estilo de Cabelo Alterado",
      description: `Novo estilo aplicado: ${HAIR_STYLES.find(style => style.id === styleId)?.name}`,
    });
>>>>>>> fa272d7a703d73d4299e60c1dd52a39636e49c0e
  };

  const toggleSavedTryOns = () => {
    setShowSavedTryOns(!showSavedTryOns);
  };

  const provideFeedback = async (feedback: 'liked' | 'disliked' | 'neutral') => {
    setTryOnFeedback(feedback);
    
    // Se já foi salvo, atualizar o feedback no banco de dados
    if (savedTryOns.length > 0 && resultImage) {
      const latestTryOn = savedTryOns[0];
      if (latestTryOn.id) {
        try {
          await arService.updateTryOnFeedback(latestTryOn.id, feedback);
          toast.success('Feedback registrado. Obrigado!');
        } catch (error) {
          console.error('Erro ao atualizar feedback:', error);
        }
      }
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 text-foreground">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Experimente Cortes Virtualmente
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Modificar a seção da webcam/upload para usar motion */}
          <motion.div 
            className="flex-1 bg-card rounded-xl shadow-lg overflow-hidden"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Sua Imagem</h2>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={openCamera}
                    disabled={isProcessing}
                  >
                    <Camera size={16} className="mr-1" />
                    Câmera
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={triggerFileInput}
                    disabled={isProcessing}
                  >
                    <Upload size={16} className="mr-1" />
                    Upload
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
              
              {/* Container da webcam */}
              <div className="relative flex-1 flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg overflow-hidden bg-black/10">
                <AnimatePresence mode="wait">
                  {!uploadedImage && !showCamera && (
                    <motion.div 
                      key="upload-prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center p-8"
                    >
                      <Image className="mx-auto mb-4 opacity-50" size={48} />
                      <p className="text-muted-foreground">
                        Tire uma foto ou faça upload de uma imagem para começar
                      </p>
                    </motion.div>
                  )}
                  
                  {showCamera && (
                    <motion.div 
                      key="webcam-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-full flex items-center justify-center"
                      style={{ minHeight: '300px' }}
                    >
                      <Webcam
                        audio={false}
                        ref={videoRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode: 'user' }}
                        className="max-h-full max-w-full"
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-full w-12 h-12"
                        onClick={takePhoto}
                        disabled={isProcessing}
                      >
                        <Camera size={24} />
                      </Button>
                    </motion.div>
                  )}
                  
                  {uploadedImage && !showCamera && (
                    <motion.div 
                      key="image-preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="max-h-full max-w-full"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-4 right-4"
                        onClick={resetImage}
                        disabled={isProcessing}
                      >
                        <RefreshCw size={16} className="mr-1" />
                        Nova foto
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Overlay de loading durante detecção/processamento */}
                <AnimatePresence>
                  {(isProcessing) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Loader2 size={40} className="text-primary" />
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-white"
                      >
                        Aplicando corte...
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Info sobre formato de rosto */}
              <AnimatePresence>
                {faceShape && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-4 p-4 bg-primary/10 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <User size={18} className="text-primary" />
                      <h3 className="font-medium">Formato de Rosto Detectado</h3>
                    </div>
                    <p className="mt-1 capitalize text-sm">
                      {faceShape === 'oval' && 'Oval'}
                      {faceShape === 'round' && 'Redondo'}
                      {faceShape === 'square' && 'Quadrado'}
                      {faceShape === 'heart' && 'Coração'}
                      {faceShape === 'long' && 'Alongado'}
                      {faceShape === 'diamond' && 'Diamante'}
                      {faceShape === 'triangle' && 'Triangular'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Recomendamos cortes compatíveis com seu formato de rosto
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Seção de resultado e catálogo */}
          <motion.div 
            className="flex-1 bg-card rounded-xl shadow-lg overflow-hidden"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="p-6 flex flex-col h-full">
              <h2 className="text-xl font-bold mb-4">Escolha um Corte</h2>
              
              {/* Catálogo de cortes de cabelo */}
              <div className="grid grid-cols-2 gap-3 mb-6 overflow-y-auto max-h-56">
                <AnimatePresence>
                  {hairstyles.map((hairstyle, index) => (
                    <motion.div
                      key={hairstyle.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => selectHairstyle(hairstyle)}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedHairstyle?.id === hairstyle.id
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={hairstyle.image_urls[0]}
                        alt={hairstyle.name}
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-2 text-xs">
                        <h3 className="font-medium truncate">{hairstyle.name}</h3>
                        {hairstyle.face_shape_compatibility?.includes(faceShape || '') && (
                          <span className="text-xs text-green-500 flex items-center mt-1">
                            <Check size={12} className="mr-1" /> Recomendado
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Resultado do try-on */}
              <div className="flex-1 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center overflow-hidden bg-black/10">
                <AnimatePresence mode="wait">
                  {!resultImage && (
                    <motion.div
                      key="result-placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center p-8"
                    >
                      <Scissors className="mx-auto mb-4 opacity-50" size={48} />
                      <p className="text-muted-foreground">
                        Seu resultado aparecerá aqui
                      </p>
                    </motion.div>
                  )}
                  
                  {resultImage && (
                    <motion.div
                      key="result-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={resultImage}
                        alt="Result"
                        className="max-h-full max-w-full"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Botões de ação */}
              <div className="mt-4 flex gap-2 justify-end">
                {resultImage && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex gap-2"
                    >
                      <Button
                        variant="outline"
                        onClick={downloadResult}
                        disabled={!resultImage || isProcessing}
                      >
                        <Download size={16} className="mr-1" />
                        Baixar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={toggleSavedTryOns}
                        disabled={isProcessing}
                      >
                        <Clock size={16} className="mr-1" />
                        Histórico
                      </Button>
                      <Button
                        onClick={saveTryOn}
                        disabled={!resultImage || isProcessing || isSavingTryOn}
                      >
                        {isSavingTryOn ? (
                          <>
                            <Loader2 size={16} className="mr-1 animate-spin" />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save size={16} className="mr-1" />
                            Salvar
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Seção de feedback */}
        <AnimatePresence>
          {resultImage && !tryOnFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-card rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4">O que achou deste estilo?</h2>
              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                  onClick={() => provideFeedback('disliked')}
                >
                  <ThumbsDown size={16} className="mr-2" />
                  Não gostei
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-orange-200 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950"
                  onClick={() => provideFeedback('neutral')}
                >
                  <Shuffle size={16} className="mr-2" />
                  Neutro
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-green-200 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950"
                  onClick={() => provideFeedback('liked')}
                >
                  <ThumbsUp size={16} className="mr-2" />
                  Adorei
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Modal com informações */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={toggleInfoModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card max-w-md w-full rounded-xl shadow-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Info size={20} className="text-primary mr-2" />
                Como usar o Experimento Virtual
              </h2>
              <div className="space-y-3">
                <p>1. Tire uma foto usando a webcam ou faça upload de uma imagem</p>
                <p>2. Nosso sistema detectará automaticamente seu rosto</p>
                <p>3. Escolha um dos cortes disponíveis no catálogo</p>
                <p>4. Veja como você ficaria com o novo visual</p>
                <p>5. Salve ou compartilhe os resultados que você gostar</p>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={toggleInfoModal}>Entendi</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Modal de histórico */}
      <AnimatePresence>
        {showSavedTryOns && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={toggleSavedTryOns}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card max-w-2xl w-full rounded-xl shadow-xl p-6 max-h-[80vh] overflow-auto"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Clock size={20} className="text-primary mr-2" />
                Seus Experimentos Salvos
              </h2>
              
              {savedTryOns.length === 0 ? (
                <div className="text-center py-12">
                  <Save size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Você ainda não tem experimentos salvos
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {savedTryOns.map((tryOn, index) => (
                    <motion.div
                      key={tryOn.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-background rounded-lg overflow-hidden border border-border"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={tryOn.result_image_url || ''}
                          alt="Saved try-on"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-medium mb-1">{tryOn.hairstyle?.name || 'Corte'}</p>
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(tryOn.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex justify-between">
                          <Badge
                            variant="outline"
                            className={
                              tryOn.feedback === 'liked'
                                ? 'border-green-200 text-green-600'
                                : tryOn.feedback === 'disliked'
                                ? 'border-red-200 text-red-600'
                                : 'border-orange-200 text-orange-600'
                            }
                          >
                            {tryOn.feedback === 'liked'
                              ? 'Adorei'
                              : tryOn.feedback === 'disliked'
                              ? 'Não gostei'
                              : 'Neutro'}
                          </Badge>
                          <Button size="sm" variant="ghost" onClick={() => downloadSavedTryOn(tryOn)}>
                            <Download size={14} />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <Button onClick={toggleSavedTryOns}>Fechar</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
=======
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Experimente um novo visual</h1>

      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna da Câmera */}
        <div className="md:col-span-2">
          <div className="relative rounded-xl overflow-hidden bg-black shadow-lg border border-muted">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-auto rounded-lg"
              style={{ display: photo ? 'none' : 'block', filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)` }}
            />
            <canvas
              ref={canvasRef}
              className="w-full h-auto rounded-lg"
              style={{ display: photo ? 'block' : 'none' }}
            />
            
            {/* Overlay com os estilos aplicados */}
            {(photo || videoRef.current) && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {beardStyle && (
                  <img 
                    src={BEARD_STYLES.find(style => style.id === beardStyle)?.image} 
                    alt="Beard Style" 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1/3 opacity-70"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
                {hairStyle && (
                  <img 
                    src={HAIR_STYLES.find(style => style.id === hairStyle)?.image} 
                    alt="Hair Style" 
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/3 opacity-70"
                    style={{ filter: `brightness(1) opacity(0.7) hue-rotate(${hairColor !== '#000000' ? '45deg' : '0deg'})` }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
              </div>
            )}
            
            {photo && (
              <div className="absolute top-2 left-2 flex space-x-2">
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                  Capturado
                </Badge>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <Button 
              onClick={takePhoto} 
              disabled={photo !== null}
              className="gap-2"
            >
              <Camera className="h-4 w-4" /> Capturar Foto
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setPhoto(null)}
              disabled={photo === null}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" /> Nova Foto
            </Button>
            
            <Sheet open={isFilterVisible} onOpenChange={setIsFilterVisible}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Sliders className="h-4 w-4" /> Filtros e Ajustes
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-[425px]">
                <SheetHeader>
                  <SheetTitle>Ajustes de Imagem</SheetTitle>
                  <SheetDescription>
                    Personalize a aparência da sua foto.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="brightness">Brilho</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="brightness"
                        defaultValue={[brightness]}
                        max={200}
                        min={0}
                        step={1}
                        onValueChange={(value) => setBrightness(value[0])}
                      />
                      <Input
                        type="number"
                        value={brightness}
                        className="w-16"
                        onChange={(e) => setBrightness(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contrast">Contraste</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="contrast"
                        defaultValue={[contrast]}
                        max={200}
                        min={0}
                        step={1}
                        onValueChange={(value) => setContrast(value[0])}
                      />
                      <Input
                        type="number"
                        value={contrast}
                        className="w-16"
                        onChange={(e) => setContrast(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="saturate">Saturação</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="saturate"
                        defaultValue={[saturate]}
                        max={200}
                        min={0}
                        step={1}
                        onValueChange={(value) => setSaturate(value[0])}
                      />
                      <Input
                        type="number"
                        value={saturate}
                        className="w-16"
                        onChange={(e) => setSaturate(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="secondary" onClick={resetFilters}>
                    Resetar
                  </Button>
                  <Button onClick={() => setIsFilterVisible(false)}>
                    Aplicar
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button 
              variant="default" 
              onClick={saveLook}
              disabled={photo === null}
              className="gap-2"
            >
              <Save className="h-4 w-4" /> Salvar Look
            </Button>
          </div>
          
          {/* Looks Salvos */}
          {savedLooks.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Seus looks salvos</h3>
              <ScrollArea className="h-24 w-full">
                <div className="flex space-x-4 p-1">
                  {savedLooks.map((look) => (
                    <div key={look.id} className="flex flex-col items-center">
                      <Avatar className="h-16 w-16 border-2 border-muted hover:border-primary cursor-pointer transition-all">
                        <AvatarImage src={look.image} alt={look.name} />
                        <AvatarFallback>{look.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs mt-1">{look.name}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
        
        {/* Coluna de Opções de Customização */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold mb-4">Opções de Estilo</h2>
          
          <Tabs defaultValue="hairstyles" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="hairstyles">Cabelo</TabsTrigger>
              <TabsTrigger value="beards">Barba</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hairstyles" className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="hairColor" className="block text-sm font-medium mb-2">
                  Cor do Cabelo
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    id="hairColor"
                    className="w-14 h-10 p-1 rounded-md"
                    value={hairColor}
                    onChange={(e) => setHairColor(e.target.value)}
                  />
                  <span className="text-sm text-muted-foreground">{hairColor}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {HAIR_STYLES.map(style => (
                  <Card 
                    key={style.id}
                    className={`overflow-hidden cursor-pointer transition-all ${
                      hairStyle === style.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:bg-accent'
                    }`}
                    onClick={() => selectHairStyle(style.id)}
                  >
                    <div className="h-24 bg-muted relative">
                      <img 
                        src={style.image} 
                        alt={style.name} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/100x100?text=Estilo";
                        }}
                      />
                      {hairStyle === style.id && (
                        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-2">
                      <p className="text-xs font-medium">{style.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="beards" className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {BEARD_STYLES.map(style => (
                  <Card 
                    key={style.id}
                    className={`overflow-hidden cursor-pointer transition-all ${
                      beardStyle === style.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:bg-accent'
                    }`}
                    onClick={() => selectBeardStyle(style.id)}
                  >
                    <div className="h-24 bg-muted relative">
                      <img 
                        src={style.image} 
                        alt={style.name} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/100x100?text=Barba";
                        }}
                      />
                      {beardStyle === style.id && (
                        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-2">
                      <p className="text-xs font-medium">{style.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Recomendações</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Baseadas no seu histórico e formato de rosto:
            </p>
            
            <TrendCard
              title="Popularidade do Estilo"
              value="Alta"
              icon={<Camera className="h-4 w-4" />}
              trend={12}
              description="Aumento nas últimas semanas"
            />
            
            <Button className="w-full mt-4" variant="outline">
              Ver Tutorial de Estilo
            </Button>
          </div>
        </div>
      </div>
>>>>>>> fa272d7a703d73d4299e60c1dd52a39636e49c0e
    </div>
  );
};

export default TryOn;
