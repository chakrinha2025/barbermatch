
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

const TryOn = () => {
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

  const takePhoto = () => {
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
        
        toast({
          title: "Foto Capturada",
          description: "Sua foto foi capturada com sucesso!",
        });
      }
    }
  };

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
  };

  return (
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
    </div>
  );
};

export default TryOn;
