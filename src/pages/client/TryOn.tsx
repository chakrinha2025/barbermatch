import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { calcWidthPercentage } from '@/lib/animations';

const TryOn = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [beardStyle, setBeardStyle] = useState('style1.png');
  const [hairColor, setHairColor] = useState('#000000');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    };

    getVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoRef]);

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
      }
    }
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Experimente um novo visual</h1>

      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded-lg shadow-md"
          style={{ display: photo ? 'none' : 'block', filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)` }}
        />
        <canvas
          ref={canvasRef}
          className="rounded-lg shadow-md absolute top-0 left-0"
          style={{ display: photo ? 'block' : 'none' }}
        />
        {photo && (
          <div className="absolute top-2 left-2 flex space-x-2">
            <Avatar>
              <AvatarImage src={photo} />
              <AvatarFallback>Foto</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" onClick={() => setPhoto(null)}>
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 flex space-x-4">
        <Button onClick={takePhoto} disabled={photo !== null}>
          Capturar Foto
        </Button>
        <Sheet open={isFilterVisible} onOpenChange={setIsFilterVisible}>
          <SheetTrigger asChild>
            <Button variant="outline">
              Filtros e Ajustes
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
                Salvar
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Opções de Customização</h2>

        <div className="mb-4">
          <Label htmlFor="beardStyle" className="block text-sm font-medium text-gray-700">
            Estilo de Barba
          </Label>
          <select
            id="beardStyle"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={beardStyle}
            onChange={(e) => setBeardStyle(e.target.value)}
          >
            <option value="style1.png">Estilo 1</option>
            <option value="style2.png">Estilo 2</option>
            <option value="style3.png">Estilo 3</option>
          </select>
        </div>

        <div className="mb-4">
          <Label htmlFor="hairColor" className="block text-sm font-medium text-gray-700">
            Cor do Cabelo
          </Label>
          <input
            type="color"
            id="hairColor"
            className="mt-1 w-full h-10 rounded-md shadow-sm"
            value={hairColor}
            onChange={(e) => setHairColor(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TryOn;
