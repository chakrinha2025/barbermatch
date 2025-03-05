import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Plus, Pencil, Trash2, Search, ScissorsLineDashed, Clock, DollarSign,
  AlertCircle, Filter, MoreVertical, Check, X
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

// Tipos
interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  isActive: boolean;
  imageUrl?: string;
}

// Dados mockados
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Corte Masculino Básico',
    description: 'Corte tradicional com tesoura e máquina',
    duration: 30,
    price: 35,
    category: 'corte',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=300'
  },
  {
    id: '2',
    name: 'Corte Degradê',
    description: 'Corte com degradê nas laterais e nuca',
    duration: 40,
    price: 45,
    category: 'corte',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=300'
  },
  {
    id: '3',
    name: 'Barba Completa',
    description: 'Aparo, modelagem e hidratação da barba',
    duration: 25,
    price: 30,
    category: 'barba',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300'
  },
  {
    id: '4',
    name: 'Corte + Barba',
    description: 'Combo de corte masculino e barba completa',
    duration: 60,
    price: 70,
    category: 'combo',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300'
  },
  {
    id: '5',
    name: 'Coloração',
    description: 'Aplicação de tintura para cabelo',
    duration: 90,
    price: 120,
    category: 'tratamento',
    isActive: false,
    imageUrl: 'https://images.unsplash.com/photo-1523263685509-57c1d050d19b?auto=format&fit=crop&w=300'
  },
  {
    id: '6',
    name: 'Hidratação Capilar',
    description: 'Tratamento para hidratação profunda dos fios',
    duration: 45,
    price: 50,
    category: 'tratamento',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1551218372-748155a0c6ae?auto=format&fit=crop&w=300'
  },
];

const categoryOptions = [
  { value: 'corte', label: 'Corte de Cabelo' },
  { value: 'barba', label: 'Barba' },
  { value: 'combo', label: 'Combos' },
  { value: 'tratamento', label: 'Tratamentos' },
  { value: 'outro', label: 'Outros' },
];

const BarberShopServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingService, setDeletingService] = useState<Service | null>(null);
  
  // Novo serviço
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    duration: 30,
    price: 0,
    category: 'corte',
    isActive: true,
    imageUrl: ''
  });
  
  // Efeito para carregar os serviços
  useEffect(() => {
    // Simulação de carregamento de dados do servidor
    setTimeout(() => {
      setServices(mockServices);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Filtrar serviços
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !categoryFilter || service.category === categoryFilter;
    
    const matchesStatus = showInactive ? true : service.isActive;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Resetar o formulário de novo serviço
  const resetNewServiceForm = () => {
    setNewService({
      name: '',
      description: '',
      duration: 30,
      price: 0,
      category: 'corte',
      isActive: true,
      imageUrl: ''
    });
  };
  
  // Adicionar novo serviço
  const handleAddService = () => {
    if (!newService.name || newService.price <= 0 || newService.duration <= 0) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    const newServiceWithId: Service = {
      ...newService,
      id: `${services.length + 1}`
    };
    
    setServices([...services, newServiceWithId]);
    toast.success('Serviço adicionado com sucesso!');
    setIsAddDialogOpen(false);
    resetNewServiceForm();
  };
  
  // Atualizar serviço
  const handleUpdateService = () => {
    if (!editingService) return;
    
    const updatedServices = services.map(service => 
      service.id === editingService.id ? editingService : service
    );
    
    setServices(updatedServices);
    toast.success('Serviço atualizado com sucesso!');
    setEditingService(null);
  };
  
  // Excluir serviço
  const handleDeleteService = () => {
    if (!deletingService) return;
    
    const updatedServices = services.filter(service => service.id !== deletingService.id);
    setServices(updatedServices);
    
    toast.success('Serviço excluído com sucesso!');
    setDeletingService(null);
  };
  
  // Alternar status de ativo/inativo
  const toggleServiceStatus = (id: string) => {
    const updatedServices = services.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    );
    
    setServices(updatedServices);
    
    const service = services.find(s => s.id === id);
    if (service) {
      toast.success(`Serviço ${service.isActive ? 'desativado' : 'ativado'} com sucesso!`);
    }
  };
  
  // Funções auxiliares
  const getCategoryLabel = (value: string) => {
    return categoryOptions.find(cat => cat.value === value)?.label || 'Outro';
  };
  
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Serviços da Barbearia</h1>
            <p className="text-muted-foreground">Gerencie os serviços oferecidos pela sua barbearia</p>
          </div>
          <Button className="sm:self-end" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Adicionar Serviço
          </Button>
        </div>
      </motion.div>
      
      {/* Filtros e Buscas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome ou descrição..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={categoryFilter || ''}
                  onValueChange={(value) => setCategoryFilter(value || null)}
                >
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      {categoryFilter ? getCategoryLabel(categoryFilter) : 'Todas as categorias'}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    {categoryOptions.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-inactive" 
                    checked={showInactive}
                    onCheckedChange={(checked) => setShowInactive(checked as boolean)}
                  />
                  <label
                    htmlFor="show-inactive"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mostrar inativos
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Lista de Serviços */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredServices.length} {filteredServices.length === 1 ? 'serviço encontrado' : 'serviços encontrados'}
            </p>
            <TabsList>
              <TabsTrigger value="grid">Grade</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Visualização em Grade */}
          <TabsContent value="grid">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-40 bg-muted animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-5 w-2/3 bg-muted animate-pulse rounded mb-2" />
                      <div className="h-4 w-full bg-muted animate-pulse rounded-sm mb-3" />
                      <div className="flex justify-between">
                        <div className="h-5 w-1/3 bg-muted animate-pulse rounded" />
                        <div className="h-5 w-1/4 bg-muted animate-pulse rounded" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <ScissorsLineDashed className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Nenhum serviço encontrado</h3>
                <p className="text-muted-foreground mt-1">
                  Tente ajustar seus filtros ou adicione um novo serviço.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredServices.map((service) => (
                  <Card key={service.id} className={`overflow-hidden ${!service.isActive && 'opacity-70'}`}>
                    {service.imageUrl && (
                      <div className="h-40 overflow-hidden relative">
                        <img 
                          src={service.imageUrl} 
                          alt={service.name} 
                          className="w-full h-full object-cover"
                        />
                        {!service.isActive && (
                          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <Badge variant="destructive">Inativo</Badge>
                          </div>
                        )}
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold truncate">{service.name}</h3>
                        <Badge variant="secondary">{getCategoryLabel(service.category)}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">R$ {service.price}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{service.duration} min</span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setEditingService(service)}>
                              <Pencil className="h-4 w-4 mr-2" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleServiceStatus(service.id)}>
                              {service.isActive ? (
                                <>
                                  <X className="h-4 w-4 mr-2" /> Desativar
                                </>
                              ) : (
                                <>
                                  <Check className="h-4 w-4 mr-2" /> Ativar
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setDeletingService(service)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Visualização em Lista */}
          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                    <p className="mt-2 text-sm text-muted-foreground">Carregando serviços...</p>
                  </div>
                ) : filteredServices.length === 0 ? (
                  <div className="text-center py-12">
                    <ScissorsLineDashed className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Nenhum serviço encontrado</h3>
                    <p className="text-muted-foreground mt-1">
                      Tente ajustar seus filtros ou adicione um novo serviço.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Duração</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              {service.imageUrl && (
                                <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                                  <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div>
                                <div>{service.name}</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">{service.description}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{getCategoryLabel(service.category)}</Badge>
                          </TableCell>
                          <TableCell>{service.duration} min</TableCell>
                          <TableCell>R$ {service.price}</TableCell>
                          <TableCell>
                            <Badge variant={service.isActive ? "success" : "destructive"}>
                              {service.isActive ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => setEditingService(service)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => toggleServiceStatus(service.id)}>
                                {service.isActive ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setDeletingService(service)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      {/* Dialog para Adicionar Serviço */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Serviço</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do serviço que sua barbearia oferece.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Serviço*</Label>
              <Input
                id="name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                placeholder="Ex: Corte Degradê"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Descreva o serviço..."
                className="resize-none"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Preço (R$)*</Label>
                <Input
                  id="price"
                  type="number"
                  value={newService.price || ''}
                  onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duração (min)*</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newService.duration || ''}
                  onChange={(e) => setNewService({ ...newService, duration: Number(e.target.value) })}
                  placeholder="30"
                  min="5"
                  step="5"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria*</Label>
              <Select
                value={newService.category}
                onValueChange={(value) => setNewService({ ...newService, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                value={newService.imageUrl || ''}
                onChange={(e) => setNewService({ ...newService, imageUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={newService.isActive}
                onCheckedChange={(checked) => setNewService({ ...newService, isActive: checked })}
              />
              <Label htmlFor="active">Serviço ativo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => {
              setIsAddDialogOpen(false);
              resetNewServiceForm();
            }}>
              Cancelar
            </Button>
            <Button onClick={handleAddService}>Adicionar Serviço</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para Editar Serviço */}
      <Dialog open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Editar Serviço</DialogTitle>
            <DialogDescription>
              Atualize os detalhes do serviço.
            </DialogDescription>
          </DialogHeader>
          {editingService && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome do Serviço*</Label>
                <Input
                  id="edit-name"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="resize-none"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Preço (R$)*</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingService.price || ''}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-duration">Duração (min)*</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={editingService.duration || ''}
                    onChange={(e) => setEditingService({ ...editingService, duration: Number(e.target.value) })}
                    min="5"
                    step="5"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Categoria*</Label>
                <Select
                  value={editingService.category}
                  onValueChange={(value) => setEditingService({ ...editingService, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-imageUrl">URL da Imagem</Label>
                <Input
                  id="edit-imageUrl"
                  value={editingService.imageUrl || ''}
                  onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={editingService.isActive}
                  onCheckedChange={(checked) => setEditingService({ ...editingService, isActive: checked })}
                />
                <Label htmlFor="edit-active">Serviço ativo</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditingService(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateService}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para Confirmação de Exclusão */}
      <Dialog open={!!deletingService} onOpenChange={(open) => !open && setDeletingService(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          {deletingService && (
            <div className="py-4">
              <div className="flex items-center bg-muted/50 p-4 rounded-lg mb-4">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                <div>
                  <p className="font-medium">{deletingService.name}</p>
                  <p className="text-sm text-muted-foreground">R$ {deletingService.price} • {deletingService.duration} min</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Se este serviço está associado a agendamentos existentes, 
                considere desativá-lo em vez de excluí-lo permanentemente.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeletingService(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteService}>
              Excluir Permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BarberShopServices; 