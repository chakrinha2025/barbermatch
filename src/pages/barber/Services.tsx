import { useState, useEffect } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save, 
  X, 
  DollarSign,
  Clock,
  Search,
  Sparkles,
  Tag,
  Filter,
  ArrowUpDown,
  ChevronDown,
  Loader2
} from 'lucide-react';
import barberService, { Service as ServiceType } from '@/api/barber';
import { useToast } from '@/components/ui/use-toast';

// Categorias disponíveis
const CATEGORIES = [
  { id: 'cortes', name: 'Cortes' },
  { id: 'barba', name: 'Barba' },
  { id: 'tratamentos', name: 'Tratamentos' },
  { id: 'combos', name: 'Combos' },
  { id: 'outros', name: 'Outros' }
];

type SortField = 'name' | 'price' | 'duration' | 'category';
type SortOrder = 'asc' | 'desc';

// Interface para o estado de edição
interface EditingState {
  id: number | null;
  name: string;
  price: number;
  duration: number;
  description: string;
  category: string;
  popular: boolean;
}

const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editing, setEditing] = useState<EditingState>({
    id: null,
    name: '',
    price: 0,
    duration: 0,
    description: '',
    category: 'cortes',
    popular: false
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const { toast } = useToast();

  // Carregar serviços ao inicializar
  useEffect(() => {
    loadServices();
  }, []);

  // Carregar serviços da API
  const loadServices = async () => {
    try {
      setIsLoading(true);
      const data = await barberService.getServices();
      setServices(data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      toast({
        title: 'Erro ao carregar serviços',
        description: 'Não foi possível carregar a lista de serviços. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Alternar entre expandir/recolher um serviço na visualização mobile
  const toggleExpandService = (id: number) => {
    setExpandedServiceId(expandedServiceId === id ? null : id);
  };

  // Ordenar serviços
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Aplicar filtros e ordenação aos serviços
  const getFilteredServices = () => {
    // Filtrar por busca e categoria
    let filtered = services.filter(service => 
      (service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       service.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === null || service.category === selectedCategory) &&
      (!showOnlyPopular || service.popular)
    );
    
    // Ordenar serviços
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'duration':
          comparison = a.duration - b.duration;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return filtered;
  };

  const filteredServices = getFilteredServices();

  // Iniciar edição de um serviço
  const handleEdit = (service: ServiceType) => {
    setEditing({
      id: service.id,
      name: service.name,
      price: service.price,
      duration: service.duration,
      description: service.description,
      category: service.category,
      popular: service.popular
    });
    setIsAddingNew(false);
  };

  // Iniciar adição de um novo serviço
  const handleAddNew = () => {
    setEditing({
      id: null,
      name: '',
      price: 0,
      duration: 30,
      description: '',
      category: 'cortes',
      popular: false
    });
    setIsAddingNew(true);
  };

  // Cancelar edição ou adição
  const handleCancel = () => {
    setEditing({
      id: null,
      name: '',
      price: 0,
      duration: 0,
      description: '',
      category: 'cortes',
      popular: false
    });
    setIsAddingNew(false);
  };

  // Salvar edição ou novo serviço
  const handleSave = async () => {
    if (editing.name.trim() === '' || editing.price <= 0 || editing.duration <= 0) {
      toast({
        title: 'Preencha todos os campos',
        description: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSaving(true);
      
      if (isAddingNew) {
        // Adicionar novo serviço
        const serviceData = {
          name: editing.name,
          price: editing.price,
          duration: editing.duration,
          description: editing.description,
          category: editing.category,
          popular: editing.popular
        };
        
        const newService = await barberService.createService(serviceData);
        setServices(prev => [...prev, newService]);
        
        toast({
          title: 'Serviço adicionado',
          description: `O serviço "${newService.name}" foi adicionado com sucesso.`
        });
      } else if (editing.id !== null) {
        // Atualizar serviço existente
        const serviceData = {
          name: editing.name,
          price: editing.price,
          duration: editing.duration,
          description: editing.description,
          category: editing.category,
          popular: editing.popular
        };
        
        const updatedService = await barberService.updateService(editing.id, serviceData);
        setServices(prev => prev.map(service => 
          service.id === editing.id ? updatedService : service
        ));
        
        toast({
          title: 'Serviço atualizado',
          description: `O serviço "${updatedService.name}" foi atualizado com sucesso.`
        });
      }

      // Limpar estado de edição
      handleCancel();
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      toast({
        title: 'Erro ao salvar serviço',
        description: 'Ocorreu um erro ao salvar as alterações. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Excluir um serviço
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await barberService.deleteService(id);
        setServices(services.filter(service => service.id !== id));
        
        toast({
          title: 'Serviço excluído',
          description: 'O serviço foi excluído com sucesso.'
        });
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
        toast({
          title: 'Erro ao excluir serviço',
          description: 'Não foi possível excluir o serviço. Tente novamente.',
          variant: 'destructive'
        });
      }
    }
  };

  // Alternar status de destaque (popular)
  const togglePopular = async (id: number) => {
    try {
      const service = services.find(s => s.id === id);
      if (!service) return;
      
      const updatedService = await barberService.toggleServicePopular(id, !service.popular);
      
      setServices(services.map(service => 
        service.id === id ? updatedService : service
      ));
      
      toast({
        title: updatedService.popular ? 'Serviço destacado' : 'Destaque removido',
        description: updatedService.popular
          ? `O serviço "${updatedService.name}" agora está destacado como popular.`
          : `O destaque do serviço "${updatedService.name}" foi removido.`
      });
    } catch (error) {
      console.error('Erro ao atualizar status popular do serviço:', error);
      toast({
        title: 'Erro ao atualizar serviço',
        description: 'Não foi possível atualizar o status de destaque do serviço.',
        variant: 'destructive'
      });
    }
  };

  // Renderização do formulário de edição/adição
  const renderForm = () => (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">
        {isAddingNew ? 'Adicionar Novo Serviço' : 'Editar Serviço'}
      </h3>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nome do Serviço</label>
          <input
            type="text"
            value={editing.name}
            onChange={e => setEditing({...editing, name: e.target.value})}
            className="w-full px-3 py-2 border rounded-md bg-background"
            placeholder="Ex: Corte Masculino"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Categoria</label>
          <select
            value={editing.category}
            onChange={e => setEditing({...editing, category: e.target.value})}
            className="w-full px-3 py-2 border rounded-md bg-background"
            aria-label="Categoria do serviço"
          >
            {CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Preço (R$)</label>
          <input
            type="number"
            value={editing.price}
            onChange={e => setEditing({...editing, price: Number(e.target.value)})}
            className="w-full px-3 py-2 border rounded-md bg-background"
            min="0"
            step="5"
            placeholder="Ex: 35,00"
            title="Preço do serviço"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Duração (minutos)</label>
          <input
            type="number"
            value={editing.duration}
            onChange={e => setEditing({...editing, duration: Number(e.target.value)})}
            className="w-full px-3 py-2 border rounded-md bg-background"
            min="5"
            step="5"
            placeholder="Ex: 30"
            title="Duração do serviço em minutos"
          />
        </div>
        
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-medium">Descrição</label>
          <textarea
            value={editing.description}
            onChange={e => setEditing({...editing, description: e.target.value})}
            className="w-full px-3 py-2 border rounded-md bg-background"
            rows={2}
            placeholder="Breve descrição do serviço..."
          />
        </div>
        
        <div className="sm:col-span-2">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={editing.popular}
              onChange={e => setEditing({...editing, popular: e.target.checked})}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Marcar como serviço popular/destacado</span>
            <Sparkles size={16} className="text-yellow-500" />
          </label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 border rounded-md hover:bg-muted flex items-center"
          disabled={isSaving}
        >
          <X size={16} className="mr-1" />
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center"
          disabled={isSaving}
        >
          {isSaving ? (
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
        </button>
      </div>
    </div>
  );

  // Obter o nome da categoria a partir do ID
  const getCategoryName = (categoryId: string) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.name : 'Desconhecida';
  };

  // Renderizar conteúdo da tabela
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <Loader2 size={30} className="animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Carregando serviços...</p>
        </div>
      );
    }

    if (filteredServices.length === 0) {
      return (
        <div className="text-center py-12 bg-card border rounded-lg">
          <p className="text-muted-foreground">
            {services.length === 0 
              ? 'Nenhum serviço cadastrado. Adicione seu primeiro serviço!' 
              : 'Nenhum serviço encontrado com os filtros atuais.'}
          </p>
          {services.length > 0 && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setShowOnlyPopular(false);
              }}
              className="mt-2 text-primary hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="bg-card border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-sm">
                <button 
                  className="flex items-center hover:text-foreground" 
                  onClick={() => toggleSort('name')}
                >
                  Serviço
                  <ArrowUpDown size={14} className="ml-1" />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm hidden md:table-cell">Descrição</th>
              <th className="px-4 py-3 text-left font-medium text-sm hidden sm:table-cell">
                <button 
                  className="flex items-center hover:text-foreground" 
                  onClick={() => toggleSort('category')}
                >
                  Categoria
                  <ArrowUpDown size={14} className="ml-1" />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm">
                <button 
                  className="flex items-center hover:text-foreground" 
                  onClick={() => toggleSort('duration')}
                >
                  Duração
                  <ArrowUpDown size={14} className="ml-1" />
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium text-sm">
                <button 
                  className="flex items-center hover:text-foreground" 
                  onClick={() => toggleSort('price')}
                >
                  Preço
                  <ArrowUpDown size={14} className="ml-1" />
                </button>
              </th>
              <th className="px-4 py-3 text-right font-medium text-sm">Ações</th>
            </tr>
          </thead>
          
          <tbody>
            {filteredServices.map(service => (
              <tr 
                key={service.id} 
                className={`border-t border-border hover:bg-muted/30 ${service.popular ? 'bg-yellow-50 dark:bg-yellow-950/20' : ''}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <span className="font-medium">{service.name}</span>
                    {service.popular && (
                      <Sparkles size={16} className="ml-2 text-yellow-500" />
                    )}
                    <button 
                      className="ml-2 sm:hidden text-muted-foreground" 
                      onClick={() => toggleExpandService(service.id)}
                      aria-label={expandedServiceId === service.id ? "Recolher detalhes" : "Expandir detalhes"}
                    >
                      <ChevronDown 
                        size={16} 
                        className={`transform transition-transform ${expandedServiceId === service.id ? 'rotate-180' : ''}`} 
                      />
                    </button>
                  </div>
                  
                  {/* Conteúdo expandido para mobile */}
                  {expandedServiceId === service.id && (
                    <div className="mt-2 text-sm text-muted-foreground sm:hidden">
                      <p>{service.description}</p>
                      <p className="mt-1">
                        <Tag size={14} className="inline mr-1" />
                        {getCategoryName(service.category)}
                      </p>
                    </div>
                  )}
                </td>
                
                <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                  {service.description}
                </td>
                
                <td className="px-4 py-3 text-sm hidden sm:table-cell">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {getCategoryName(service.category)}
                  </span>
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <Clock size={14} className="mr-1 text-muted-foreground" />
                    {service.duration} min
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm font-medium">
                    <DollarSign size={14} className="mr-1 text-muted-foreground" />
                    R$ {service.price}
                  </div>
                </td>
                
                <td className="px-4 py-3 text-right space-x-1">
                  <button
                    onClick={() => togglePopular(service.id)}
                    className={`p-1.5 rounded-md ${service.popular ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
                    title={service.popular ? "Remover destaque" : "Destacar como popular"}
                  >
                    <Sparkles size={16} />
                  </button>
                  
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-1.5 bg-muted text-muted-foreground hover:text-foreground rounded-md"
                    title="Editar serviço"
                  >
                    <Pencil size={16} />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-1.5 bg-muted text-red-600 hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-300 rounded-md"
                    title="Excluir serviço"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>
          <p className="text-muted-foreground">
            Gerencie os serviços oferecidos na sua barbearia
          </p>
        </div>
        
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center"
          disabled={isAddingNew || editing.id !== null || isLoading}
        >
          <Plus size={16} className="mr-1" />
          Novo Serviço
        </button>
      </div>
      
      {/* Formulário de Edição/Adição */}
      {(isAddingNew || editing.id !== null) && renderForm()}
      
      {/* Filtros e Busca */}
      <div className="bg-card border rounded-lg p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Buscar serviços..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory || ''}
              onChange={e => setSelectedCategory(e.target.value || null)}
              className="px-3 py-2 border rounded-md bg-background"
              aria-label="Filtrar por categoria"
              disabled={isLoading}
            >
              <option value="">Todas as categorias</option>
              {CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setShowOnlyPopular(!showOnlyPopular)}
              className={`flex items-center gap-1 px-3 py-2 border rounded-md ${showOnlyPopular ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}
              aria-label={showOnlyPopular ? "Mostrar todos os serviços" : "Mostrar apenas serviços populares"}
              disabled={isLoading}
            >
              <Sparkles size={16} />
              <span className="text-sm">Populares</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <Filter size={14} className="mr-1" />
          <span>
            {isLoading 
              ? 'Carregando serviços...' 
              : `${filteredServices.length} serviço${filteredServices.length !== 1 ? 's' : ''} encontrado${filteredServices.length !== 1 ? 's' : ''}`
            }
          </span>
        </div>
      </div>
      
      {/* Lista de Serviços */}
      {renderContent()}
    </div>
  );
};

export default Services; 