import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Star, Filter, Clock, Scissors, CalendarCheck, ArrowRight, Loader2, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

import { apiService } from '@/api/api.service';
import { appointmentService } from '@/api/appointments.service';
import { barberService, Barber, Service } from '@/api/barbers.service';

const CLIENT_LOCATION = {
  lat: -25.4284,
  lng: -49.2733 // Coordenadas de Curitiba
};

const SERVICES_FILTER = [
  { value: 'todos', label: 'Todos os serviços' },
  { value: 'corte', label: 'Corte de cabelo' },
  { value: 'barba', label: 'Barba' },
  { value: 'combo', label: 'Combo (Corte + Barba)' },
  { value: 'sobrancelha', label: 'Sobrancelha' },
  { value: 'coloracao', label: 'Coloração' },
  { value: 'spa', label: 'Tratamentos/Spa' },
];

const FindBarbers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [filteredBarbers, setFilteredBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [schedulingAppointment, setSchedulingAppointment] = useState(false);
  
  // Filtros
  const [filters, setFilters] = useState({
    service: 'todos',
    maxDistance: 10,
    minRating: 3.5,
    maxPrice: 150,
    cityFilter: '',
  });

  useEffect(() => {
    fetchBarbers();
  }, []);
  
  // Filtrar barbeiros quando os filtros mudarem
  useEffect(() => {
    if (barbers.length > 0) {
      applyFilters();
    }
  }, [filters, searchTerm, barbers]);
  
  const fetchBarbers = async () => {
    try {
      setIsLoading(true);
      
      // Usar serviço de barbeiros com mock de dados
      // Em uma aplicação real, descomentaria este código
      // const response = await barberService.getBarbers({
      //   service: filters.service !== 'todos' ? filters.service : undefined,
      //   city: filters.cityFilter || undefined,
      //   minRating: filters.minRating,
      //   maxPrice: filters.maxPrice,
      //   search: searchTerm || undefined
      // });
      // setBarbers(response);
      
      // Simulando resposta da API
      setTimeout(() => {
        const mockBarbers: Barber[] = [
          {
            id: 'b1',
            name: 'Carlos Silva',
            email: 'carlos.silva@example.com',
            photo: 'https://i.pravatar.cc/150?img=33',
            phone: '(41) 98765-4321',
            rating: 4.8,
            reviewCount: 124,
            specialties: ['Degradê', 'Barba'],
            barbershop: {
              id: 'bs1',
              name: 'Barbearia Vintage',
              address: 'Rua das Flores, 123',
              city: 'Curitiba',
              state: 'PR',
            },
            services: [
              { id: 's1', name: 'Corte Masculino', price: 50, duration: 30 },
              { id: 's2', name: 'Barba', price: 35, duration: 20 },
              { id: 's3', name: 'Corte + Barba', price: 75, duration: 45 },
            ]
          },
          {
            id: 'b2',
            name: 'Roberto Alves',
            email: 'roberto.alves@example.com',
            photo: 'https://i.pravatar.cc/150?img=68',
            phone: '(41) 98877-6655',
            rating: 4.5,
            reviewCount: 98,
            specialties: ['Cortes Sociais', 'Navalhado'],
            barbershop: {
              id: 'bs2',
              name: 'Barber Shop Premium',
              address: 'Av. República, 1001',
              city: 'Curitiba',
              state: 'PR',
            },
            services: [
              { id: 's4', name: 'Corte Masculino', price: 60, duration: 30 },
              { id: 's5', name: 'Barba', price: 40, duration: 25 },
              { id: 's6', name: 'Corte + Barba', price: 90, duration: 50 },
            ]
          },
          {
            id: 'b3',
            name: 'André Mendes',
            email: 'andre.mendes@example.com',
            photo: 'https://i.pravatar.cc/150?img=12',
            phone: '(41) 91234-5678',
            rating: 4.9,
            reviewCount: 156,
            specialties: ['Degradê', 'Barba Estilizada', 'Tratamentos'],
            barbershop: {
              id: 'bs3',
              name: 'Elite Barber',
              address: 'R. Visconde do Rio Branco, 456',
              city: 'Curitiba',
              state: 'PR',
            },
            services: [
              { id: 's7', name: 'Corte Premium', price: 75, duration: 40 },
              { id: 's8', name: 'Barba Estilizada', price: 50, duration: 30 },
              { id: 's9', name: 'Combo VIP', price: 120, duration: 60 },
              { id: 's10', name: 'Sobrancelha', price: 30, duration: 15 },
            ]
          },
          {
            id: 'b4',
            name: 'Fernando Costa',
            email: 'fernando.costa@example.com',
            photo: 'https://i.pravatar.cc/150?img=42',
            phone: '(41) 92345-6789',
            rating: 4.7,
            reviewCount: 87,
            specialties: ['Cortes Modernos', 'Coloração'],
            barbershop: {
              id: 'bs4',
              name: 'Modern Cuts',
              address: 'Av. Cândido de Abreu, 789',
              city: 'Curitiba',
              state: 'PR',
            },
            services: [
              { id: 's11', name: 'Corte Moderno', price: 65, duration: 35 },
              { id: 's12', name: 'Barba Moderna', price: 45, duration: 25 },
              { id: 's13', name: 'Coloração', price: 100, duration: 90 },
            ]
          },
        ];
        
        setBarbers(mockBarbers);
        setFilteredBarbers(mockBarbers);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao buscar barbeiros:', error);
      toast.error('Erro ao buscar barbeiros. Tente novamente.');
      setIsLoading(false);
    }
  };
  
  const applyFilters = () => {
    let result = [...barbers];
    
    // Filtrar por termo de busca
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(barber =>
        barber.name.toLowerCase().includes(search) ||
        barber.specialties.some(s => s.toLowerCase().includes(search)) ||
        barber.barbershop?.name.toLowerCase().includes(search) ||
        barber.barbershop?.city.toLowerCase().includes(search)
      );
    }
    
    // Filtrar por tipo de serviço
    if (filters.service !== 'todos') {
      result = result.filter(barber =>
        barber.services?.some(service => 
          service.name.toLowerCase().includes(filters.service.toLowerCase())
        ) ||
        barber.specialties.some(specialty => 
          specialty.toLowerCase().includes(filters.service.toLowerCase())
        )
      );
    }
    
    // Filtrar por cidade
    if (filters.cityFilter) {
      result = result.filter(barber => 
        barber.barbershop?.city.toLowerCase() === filters.cityFilter.toLowerCase()
      );
    }
    
    // Filtrar por avaliação mínima
    result = result.filter(barber => barber.rating >= filters.minRating);
    
    // Filtrar por preço máximo
    result = result.filter(barber => {
      const services = barber.services || [];
      return services.some(service => service.price <= filters.maxPrice);
    });
    
    setFilteredBarbers(result);
  };
  
  const handleFilterChange = (name: string, value: any) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const resetFilters = () => {
    setFilters({
      service: 'todos',
      maxDistance: 10,
      minRating: 3.5,
      maxPrice: 150,
      cityFilter: '',
    });
    setSearchTerm('');
  };
  
  const openAppointmentDialog = (barber: Barber) => {
    setSelectedBarber(barber);
    setSelectedService(null);
    setSelectedSlot(null);
    setSelectedDate(new Date());
    setAppointmentDialogOpen(true);
    
    // Carregar horários disponíveis
    fetchAvailableSlots(barber.id, format(new Date(), 'yyyy-MM-dd'));
  };
  
  const fetchAvailableSlots = async (barberId: string, date: string) => {
    try {
      setLoadingSlots(true);
      
      // Em uma aplicação real, chamaríamos a API através do serviço
      // const availability = await barberService.getBarberAvailability(barberId, date);
      // setAvailableSlots(availability.availableSlots);
      
      // Simulando resposta da API
      setTimeout(() => {
        const slots = [
          '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
          '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
        ];
        setAvailableSlots(slots);
        setLoadingSlots(false);
      }, 800);
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error);
      toast.error('Erro ao buscar horários disponíveis');
      setLoadingSlots(false);
    }
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (!date || !selectedBarber) return;
    
    setSelectedDate(date);
    setSelectedSlot(null);
    
    // Atualizar horários disponíveis para a nova data
    fetchAvailableSlots(selectedBarber.id, format(date, 'yyyy-MM-dd'));
  };
  
  const handleScheduleAppointment = async () => {
    if (!selectedBarber || !selectedDate || !selectedSlot || !selectedService) {
      toast.error('Por favor, selecione todos os campos necessários');
      return;
    }
    
    try {
      setSchedulingAppointment(true);
      
      const appointmentData = {
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedSlot,
        duration: selectedService.duration,
        barber_id: selectedBarber.id,
        service_id: selectedService.id,
        barbershop_id: selectedBarber.barbershop?.id,
        notes: '', // Poderíamos adicionar um campo para observações
      };
      
      // Em uma aplicação real, enviaríamos para a API
      // await appointmentService.createAppointment(appointmentData);
      
      // Simulando a requisição
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Agendamento realizado com sucesso!');
      setAppointmentDialogOpen(false);
      
      // Redirecionar para a página de agendamentos
      navigate('/app/appointments');
    } catch (error) {
      console.error('Erro ao agendar:', error);
      toast.error('Erro ao realizar agendamento. Tente novamente.');
    } finally {
      setSchedulingAppointment(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Encontre Barbeiros</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nome, especialidade ou cidade..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              onClick={() => setSearchTerm('')}
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setFilterDialogOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Buscando os melhores barbeiros para você...</p>
        </div>
      ) : filteredBarbers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBarbers.map((barber) => (
            <Card 
              key={barber.id} 
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardHeader className="p-0">
                <div className="aspect-[3/1] bg-gradient-to-r from-primary/20 to-primary/5"></div>
                <div className="px-6 pb-3 pt-0 -mt-12 flex items-start justify-between">
                  <Avatar className="h-20 w-20 border-4 border-background">
                    <AvatarImage src={barber.photo} />
                    <AvatarFallback>{barber.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Badge className="mt-14 flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20">
                    <Star className="h-3 w-3 fill-primary" />
                    {barber.rating} ({barber.reviewCount})
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="px-6 pb-3 pt-0">
                <CardTitle className="text-xl">{barber.name}</CardTitle>
                
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1 shrink-0" />
                  <span className="truncate">
                    {barber.barbershop?.name} • {barber.barbershop?.city}, {barber.barbershop?.state}
                  </span>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium">Especialidades:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {barber.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="font-normal">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium">Serviços:</p>
                  <div className="space-y-2 mt-2">
                    {barber.services?.slice(0, 3).map((service) => (
                      <div key={service.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <Scissors className="h-3 w-3 text-muted-foreground" />
                          <span>{service.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>R$ {service.price.toFixed(2)}</span>
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{service.duration} min</span>
                        </div>
                      </div>
                    ))}
                    
                    {(barber.services?.length || 0) > 3 && (
                      <div className="text-xs text-muted-foreground text-center">
                        + {(barber.services?.length || 0) - 3} outros serviços
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <Separator />
              
              <CardFooter className="p-4">
                <Button 
                  className="w-full"
                  onClick={() => openAppointmentDialog(barber)}
                >
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  Agendar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg p-8 text-center">
          <div className="rounded-full bg-muted h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhum barbeiro encontrado</h3>
          <p className="text-muted-foreground mb-6">Não encontramos resultados para os filtros selecionados.</p>
          
          <Button variant="outline" onClick={resetFilters}>
            Limpar filtros
          </Button>
        </div>
      )}
      
      {/* Dialog de Filtros */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filtrar Resultados</DialogTitle>
            <DialogDescription>
              Refine sua busca para encontrar o barbeiro ideal
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Serviço</label>
              <Select 
                value={filters.service} 
                onValueChange={(value) => handleFilterChange('service', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES_FILTER.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Cidade</label>
              <Select 
                value={filters.cityFilter} 
                onValueChange={(value) => handleFilterChange('cityFilter', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as cidades</SelectItem>
                  <SelectItem value="curitiba">Curitiba</SelectItem>
                  <SelectItem value="sao jose dos pinhais">São José dos Pinhais</SelectItem>
                  <SelectItem value="colombo">Colombo</SelectItem>
                  <SelectItem value="pinhais">Pinhais</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Distância máxima</label>
                <span className="text-sm text-muted-foreground">{filters.maxDistance} km</span>
              </div>
              <Slider 
                value={[filters.maxDistance]} 
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => handleFilterChange('maxDistance', value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Avaliação mínima</label>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Star className="h-3 w-3 fill-primary mr-1" />
                  {filters.minRating}
                </span>
              </div>
              <Slider 
                value={[filters.minRating]} 
                min={1}
                max={5}
                step={0.5}
                onValueChange={(value) => handleFilterChange('minRating', value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Preço máximo</label>
                <span className="text-sm text-muted-foreground">R$ {filters.maxPrice}</span>
              </div>
              <Slider 
                value={[filters.maxPrice]} 
                min={20}
                max={300}
                step={10}
                onValueChange={(value) => handleFilterChange('maxPrice', value[0])}
              />
            </div>
          </div>
          
          <DialogFooter className="flex sm:justify-between">
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="hidden sm:flex"
            >
              Limpar filtros
            </Button>
            <Button onClick={() => setFilterDialogOpen(false)}>
              Aplicar filtros
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog de Agendamento */}
      <Dialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Agendar Horário</DialogTitle>
            <DialogDescription>
              {selectedBarber && (
                <>Agendamento com {selectedBarber.name} na {selectedBarber.barbershop?.name}</>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBarber && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 py-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Selecione um serviço:</h3>
                  <div className="space-y-2">
                    {selectedBarber.services?.map((service) => (
                      <div 
                        key={service.id} 
                        className={`p-3 border rounded-md cursor-pointer hover:border-primary transition-colors ${selectedService?.id === service.id ? 'border-primary bg-primary/5' : ''}`}
                        onClick={() => setSelectedService(service)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{service.duration} min</span>
                            </div>
                          </div>
                          <p className="font-medium">R$ {service.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Selecione uma data:</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    locale={ptBR}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="rounded-md border"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Selecione um horário:</h3>
                
                {loadingSlots ? (
                  <div className="flex flex-col items-center justify-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-sm text-muted-foreground">Carregando horários disponíveis...</p>
                  </div>
                ) : availableSlots.length > 0 ? (
                  <ScrollArea className="h-72 rounded-md border p-4">
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          className={`py-2 text-center rounded-md border transition-colors ${selectedSlot === slot ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted'}`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 border rounded-md">
                    <Clock className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-medium">Nenhum horário disponível</p>
                    <p className="text-sm text-muted-foreground mt-1">Tente selecionar outra data</p>
                  </div>
                )}
                
                <div className="mt-8 space-y-4">
                  <h3 className="font-medium">Resumo:</h3>
                  
                  {selectedService && selectedDate && selectedSlot ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Serviço:</span>
                        <span className="font-medium">{selectedService.name}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Data:</span>
                        <span className="font-medium">
                          {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Horário:</span>
                        <span className="font-medium">{selectedSlot}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b">
                        <span className="text-muted-foreground">Duração:</span>
                        <span className="font-medium">{selectedService.duration} minutos</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="font-medium">Valor Total:</span>
                        <span className="font-bold">R$ {selectedService.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      Selecione um serviço, data e horário para visualizar o resumo.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setAppointmentDialogOpen(false)}
              disabled={schedulingAppointment}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleScheduleAppointment}
              disabled={!selectedService || !selectedDate || !selectedSlot || schedulingAppointment}
            >
              {schedulingAppointment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Agendando...
                </>
              ) : (
                <>
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Confirmar Agendamento
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FindBarbers; 