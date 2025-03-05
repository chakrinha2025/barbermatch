
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Wand2, UserCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VirtualExperienceView = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <p className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
          <Sparkles size={14} className="mr-2" />
          Experiência Virtual
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Experimente Cortes Antes de <span className="text-primary">Escolher</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Utilize nossa tecnologia de realidade aumentada para visualizar como diferentes estilos de cabelo e barba ficariam em você.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Visualização em Tempo Real</h2>
          <p className="text-muted-foreground">
            Nossa tecnologia de ponta permite que você veja como novos cortes de cabelo e estilos de barba ficariam em você antes mesmo de sentar na cadeira do barbeiro.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 rounded-full p-2 mt-1">
                <Camera size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Foto ou Câmera</h3>
                <p className="text-muted-foreground">Use sua câmera ou faça upload de uma foto para começar</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 rounded-full p-2 mt-1">
                <Wand2 size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Aplicação em Tempo Real</h3>
                <p className="text-muted-foreground">Veja instantaneamente como o estilo fica em você</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 rounded-full p-2 mt-1">
                <UserCheck size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Ajuste Perfeito</h3>
                <p className="text-muted-foreground">Nossa IA adapta o estilo ao formato do seu rosto</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/app/try-on">
              <Button className="w-full sm:w-auto gap-2">
                Experimentar Agora <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/recursos">
              <Button variant="outline" className="w-full sm:w-auto">
                Outros Recursos
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="rounded-xl overflow-hidden shadow-xl border border-border">
          <img 
            src="/images/hairstyle-3d-1.jpg" 
            alt="Virtual Try-On Preview" 
            className="w-full h-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/800x600?text=Realidade+Aumentada";
            }}
          />
        </div>
      </div>
      
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Como Funciona</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
            Processo simples em três etapas para experimentar seu novo visual
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-border">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <CardTitle>Tire uma Foto</CardTitle>
              <CardDescription>
                Use sua câmera ou faça upload de uma imagem existente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/images/real-person-haircut.jpg" 
                alt="Capture your face" 
                className="w-full h-40 object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x300?text=Foto";
                }}
              />
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <CardTitle>Escolha um Estilo</CardTitle>
              <CardDescription>
                Navegue por uma biblioteca de estilos de cabelo e barba
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/images/hairstyle-examples/hairstyle-example-1.jpg" 
                alt="Select a style" 
                className="w-full h-40 object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x300?text=Estilos";
                }}
              />
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <CardTitle>Veja o Resultado</CardTitle>
              <CardDescription>
                Visualize como o estilo fica em você e salve para compartilhar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img 
                src="/images/hairstyle-3d-2.jpg" 
                alt="See the result" 
                className="w-full h-40 object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x300?text=Resultado";
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Estilos Populares</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
            Explore os cortes mais populares que você pode experimentar
          </p>
        </div>
        
        <Tabs defaultValue="hair" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="hair">Cabelo</TabsTrigger>
            <TabsTrigger value="beard">Barba</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hair" className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={`hair-${index}`} className="overflow-hidden">
                <img 
                  src={`/images/hairstyle-examples/hairstyle-example-${index + 1}.jpg`} 
                  alt={`Hairstyle ${index + 1}`} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/200x300?text=Cabelo";
                  }}
                />
                <CardFooter className="p-3">
                  <p className="text-sm font-medium">Estilo de Cabelo {index + 1}</p>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="beard" className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={`beard-${index}`} className="overflow-hidden">
                <img 
                  src={`/images/style-${(index % 3) + 1}.jpg`} 
                  alt={`Beard style ${index + 1}`} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/200x300?text=Barba";
                  }}
                />
                <CardFooter className="p-3">
                  <p className="text-sm font-medium">Estilo de Barba {index + 1}</p>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <Link to="/app/try-on">
            <Button size="lg" className="gap-2">
              Experimentar em Você <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VirtualExperienceView;
