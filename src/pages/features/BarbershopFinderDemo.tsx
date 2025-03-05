import React, { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Search, Star, Calendar, Scissors, ArrowLeft, Clock, Filter, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';

const mockBarbershops = [
  {
    id: 1,
    name: 'Barbearia Vintage',
    rating: 4.8,
    reviewCount: 124,
    distance: '1.2km',
    address: 'Rua das Flores, 123',
    imageUrl: 'https://placehold.co/600x400/222/fff?text=Barbearia+Vintage',
    services: ['Corte Moderno', 'Barba Completa', 'Tratamento Capilar'],
    priceRange: '$$',
    openSlots: 3
  },
  {
    id: 2,
    name: 'Corte & Estilo',
    rating: 4.6,
    reviewCount: 98,
    distance: '0.8km',
    address: 'Av. Principal, 500',
    imageUrl: 'https://placehold.co/600x400/222/fff?text=Corte+e+Estilo',
    services: ['Undercut', 'Barba', 'Coloração'],
    priceRange: '$$$',
    openSlots: 1
  },
  {
    id: 3,
    name: 'Barber Premium',
    rating: 4.9,
    reviewCount: 215,
    distance: '2.5km',
    address: 'Rua da Esquina, 78',
    imageUrl: 'https://placehold.co/600x400/222/fff?text=Barber+Premium',
    services: ['Corte Clássico', 'Barba Premium', 'Tratamentos'],
    priceRange: '$$$$',
    openSlots: 5
  }
];

const BarbershopFinderDemo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxDistance, setMaxDistance] = useState(5);
  const [minRating, setMinRating] = useState(4);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Container>
        <div className="py-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Home
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-2 text-slate-900">Encontre Barbearias</h1>
          <p className="text-xl text-slate-600 mb-8">
            Localize as melhores barbearias perto de você com filtros avançados
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Filtros</CardTitle>
                  <CardDescription>Refine sua busca</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Procurar</label>
                    <div className="relative mt-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                      <Input 
                        placeholder="Nome ou serviço..." 
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium flex justify-between">
                      <span>Distância máxima</span>
                      <span>{maxDistance}km</span>
                    </label>
                    <Slider 
                      className="mt-2" 
                      value={[maxDistance]} 
                      onValueChange={(vals) => setMaxDistance(vals[0])}
                      min={1}
                      max={10}
                      step={0.5}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium flex justify-between">
                      <span>Avaliação mínima</span>
                      <span>{minRating} <Star className="inline h-3 w-3 text-yellow-400 mb-0.5" /></span>
                    </label>
                    <Slider 
                      className="mt-2" 
                      value={[minRating]} 
                      onValueChange={(vals) => setMinRating(vals[0])}
                      min={1}
                      max={5}
                      step={0.1}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button className="w-full">
                      <Filter className="mr-2 h-4 w-4" /> Aplicar Filtros
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3 space-y-6">
              {mockBarbershops.map((barbershop) => (
                <Card key={barbershop.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto bg-slate-200">
                      <img 
                        src={barbershop.imageUrl} 
                        alt={barbershop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">{barbershop.name}</h3>
                          <div className="flex items-center mt-1 text-sm text-slate-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{barbershop.address} ({barbershop.distance})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <span className="font-bold text-lg">{barbershop.rating}</span>
                            <Star className="h-5 w-5 ml-1 text-yellow-400" fill="currentColor" />
                          </div>
                          <div className="text-xs text-slate-500">{barbershop.reviewCount} avaliações</div>
                          <Badge variant="outline" className="mt-2">{barbershop.priceRange}</Badge>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {barbershop.services.map((service, i) => (
                            <Badge key={i} variant="secondary">
                              <Scissors className="h-3 w-3 mr-1" />
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
                        <div className="text-sm text-green-600 font-medium flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{barbershop.openSlots} horários disponíveis hoje</span>
                        </div>
                        <Button>
                          <Calendar className="mr-2 h-4 w-4" /> Agendar Agora
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BarbershopFinderDemo; 