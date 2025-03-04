import { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  User,
  Calendar,
  Phone,
  Mail,
  Scissors,
  Star,
  Plus,
  Clock,
  Filter,
  UserPlus,
  X
} from 'lucide-react';

// Dados simulados - em produção viriam de uma API
const INITIAL_CLIENTS = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(41) 99999-1234',
    visits: 8,
    lastVisit: '2023-08-28',
    appointments: [
      { id: 101, date: '2023-08-28', service: 'Corte + Barba', price: 55, rating: 5 },
      { id: 102, date: '2023-07-15', service: 'Degradê', price: 40, rating: 4 },
      { id: 103, date: '2023-06-03', service: 'Corte Masculino', price: 35, rating: 5 }
    ],
    preferences: 'Prefere cortes mais curtos nas laterais. Gosta de conversar sobre futebol.'
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    phone: '(41) 98765-4321',
    visits: 5,
    lastVisit: '2023-09-05',
    appointments: [
      { id: 201, date: '2023-09-05', service: 'Barba', price: 25, rating: 5 },
      { id: 202, date: '2023-08-10', service: 'Corte + Barba', price: 55, rating: 4 },
      { id: 203, date: '2023-07-01', service: 'Barba', price: 25, rating: 5 }
    ],
    preferences: 'Prefere que a barba seja bem aparada. Sensível a produtos com álcool.'
  },
  {
    id: 3,
    name: 'Roberto Santos',
    email: 'roberto.santos@email.com',
    phone: '(41) 97777-8888',
    visits: 2,
    lastVisit: '2023-09-10',
    appointments: [
      { id: 301, date: '2023-09-10', service: 'Degradê', price: 40, rating: 5 },
      { id: 302, date: '2023-08-15', service: 'Corte Masculino', price: 35, rating: 4 }
    ],
    preferences: 'Primeira visita. Comentou que gostou do atendimento.'
  },
  {
    id: 4,
    name: 'Lucas Mendes',
    email: 'lucas.mendes@email.com',
    phone: '(41) 96666-5555',
    visits: 10,
    lastVisit: '2023-09-08',
    appointments: [
      { id: 401, date: '2023-09-08', service: 'Corte Masculino', price: 35, rating: 4 },
      { id: 402, date: '2023-08-22', service: 'Hidratação', price: 30, rating: 5 },
      { id: 403, date: '2023-07-30', service: 'Corte + Barba', price: 55, rating: 5 }
    ],
    preferences: 'Cliente fiel. Gosta de produtos para barba. Aniversário em 15/10.'
  },
  {
    id: 5,
    name: 'André Costa',
    email: 'andre.costa@email.com',
    phone: '(41) 95555-4444',
    visits: 3,
    lastVisit: '2023-09-12',
    appointments: [
      { id: 501, date: '2023-09-12', service: 'Hidratação', price: 30, rating: 4 },
      { id: 502, date: '2023-08-05', service: 'Corte Masculino', price: 35, rating: 4 },
      { id: 503, date: '2023-07-10', service: 'Corte Masculino', price: 35, rating: 3 }
    ],
    preferences: 'Prefere agendamentos no período da tarde. Sensível a certos shampoos.'
  }
];

// Interface para o tipo de atendimento
interface Appointment {
  id: number;
  date: string;
  service: string;
  price: number;
  rating: number;
}

// Interface para o tipo de cliente
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  visits: number;
  lastVisit: string;
  appointments: Appointment[];
  preferences: string;
}

// Componente para exibir as estrelas de avaliação
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}
        />
      ))}
    </div>
  );
};

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'visits' | 'lastVisit'>('lastVisit');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedClientId, setExpandedClientId] = useState<number | null>(null);
  const [isAddingNewNote, setIsAddingNewNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  
  // Filtrar clientes com base na busca
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );
  
  // Ordenar clientes
  const sortedClients = [...filteredClients].sort((a, b) => {
    let compareA, compareB;
    
    // Determinar os valores a serem comparados
    if (sortBy === 'name') {
      compareA = a.name;
      compareB = b.name;
    } else if (sortBy === 'visits') {
      compareA = a.visits;
      compareB = b.visits;
    } else { // lastVisit
      compareA = new Date(a.lastVisit).getTime();
      compareB = new Date(b.lastVisit).getTime();
    }
    
    // Comparar baseado na direção da ordenação
    if (sortDirection === 'asc') {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });
  
  // Alternar a direção da ordenação
  const toggleSortDirection = (field: 'name' | 'visits' | 'lastVisit') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };
  
  // Calcular a data no formato DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };
  
  // Alternar a expansão de um cliente
  const toggleClientExpansion = (clientId: number) => {
    setExpandedClientId(expandedClientId === clientId ? null : clientId);
  };
  
  // Adicionar uma nova nota às preferências do cliente
  const addNoteToClient = (clientId: number) => {
    if (newNote.trim() === '') return;
    
    setClients(clients.map(client => 
      client.id === clientId 
        ? { ...client, preferences: client.preferences ? `${client.preferences}\n\n${newNote}` : newNote } 
        : client
    ));
    
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient({
        ...selectedClient,
        preferences: selectedClient.preferences 
          ? `${selectedClient.preferences}\n\n${newNote}` 
          : newNote
      });
    }
    
    setNewNote('');
    setIsAddingNewNote(false);
  };
  
  // Exibir detalhes do cliente selecionado
  const showClientDetails = (client: Client) => {
    setSelectedClient(client);
  };
  
  // Fechar detalhes do cliente
  const closeClientDetails = () => {
    setSelectedClient(null);
    setIsAddingNewNote(false);
    setNewNote('');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground">
          Gerencie seus clientes e veja o histórico de atendimentos
        </p>
      </div>
      
      {/* Barra de pesquisa e ações */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Buscar por nome, email ou telefone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 px-3 py-2 border rounded-md bg-muted/30 hover:bg-muted"
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filtrar</span>
          </button>
          
          <button
            className="flex items-center gap-1 px-3 py-2 border bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <UserPlus size={16} />
            <span className="hidden sm:inline">Novo Cliente</span>
          </button>
        </div>
      </div>
      
      {/* Lista de Clientes */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-sm">
                  <button 
                    className="flex items-center"
                    onClick={() => toggleSortDirection('name')}
                  >
                    Cliente
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transform transition-transform ${
                        sortBy === 'name' && sortDirection === 'asc' ? 'rotate-180' : ''
                      } ${sortBy !== 'name' ? 'opacity-50' : ''}`} 
                    />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm hidden md:table-cell">Contato</th>
                <th className="px-4 py-3 text-left font-medium text-sm">
                  <button 
                    className="flex items-center"
                    onClick={() => toggleSortDirection('visits')}
                  >
                    Visitas
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transform transition-transform ${
                        sortBy === 'visits' && sortDirection === 'asc' ? 'rotate-180' : ''
                      } ${sortBy !== 'visits' ? 'opacity-50' : ''}`} 
                    />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">
                  <button 
                    className="flex items-center"
                    onClick={() => toggleSortDirection('lastVisit')}
                  >
                    Última Visita
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transform transition-transform ${
                        sortBy === 'lastVisit' && sortDirection === 'asc' ? 'rotate-180' : ''
                      } ${sortBy !== 'lastVisit' ? 'opacity-50' : ''}`} 
                    />
                  </button>
                </th>
                <th className="px-4 py-3 text-right font-medium text-sm">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedClients.length > 0 ? (
                sortedClients.map(client => (
                  <tr 
                    key={client.id} 
                    className="hover:bg-muted/20 cursor-pointer"
                    onClick={() => showClientDetails(client)}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium">{client.name}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Phone size={14} className="mr-1" />
                        {client.phone}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <Mail size={14} className="mr-1" />
                        {client.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Scissors size={16} className="mr-2 text-muted-foreground" />
                        <span>{client.visits}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-muted-foreground" />
                        <span>{formatDate(client.lastVisit)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleClientExpansion(client.id);
                        }}
                        className="p-1 rounded-md hover:bg-muted text-primary"
                        aria-label={expandedClientId === client.id ? "Ocultar histórico" : "Ver histórico"}
                      >
                        <ChevronDown 
                          size={18} 
                          className={`transform transition-transform ${
                            expandedClientId === client.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                    {searchQuery 
                      ? 'Nenhum cliente encontrado para esta busca.' 
                      : 'Nenhum cliente cadastrado. Adicione seu primeiro cliente!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal de Detalhes do Cliente */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold">Detalhes do Cliente</h3>
                <button 
                  onClick={closeClientDetails}
                  className="p-1 rounded-md hover:bg-muted"
                  aria-label="Fechar"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Informações de Contato */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4">
                      <User size={24} />
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium">{selectedClient.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center text-sm">
                          <Phone size={14} className="mr-1 text-muted-foreground" />
                          {selectedClient.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail size={14} className="mr-1 text-muted-foreground" />
                          {selectedClient.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Estatísticas */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <div className="text-muted-foreground text-sm">Total de Visitas</div>
                    <div className="text-xl font-bold mt-1">{selectedClient.visits}</div>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <div className="text-muted-foreground text-sm">Última Visita</div>
                    <div className="text-lg font-medium mt-1">{formatDate(selectedClient.lastVisit)}</div>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-lg text-center">
                    <div className="text-muted-foreground text-sm">Avaliação Média</div>
                    <div className="mt-2 flex justify-center">
                      <RatingStars rating={
                        Math.round(selectedClient.appointments.reduce((sum, apt) => sum + apt.rating, 0) / 
                        selectedClient.appointments.length)
                      } />
                    </div>
                  </div>
                </div>
                
                {/* Preferências e Observações */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Preferências e Observações</h4>
                    {!isAddingNewNote && (
                      <button
                        onClick={() => setIsAddingNewNote(true)}
                        className="text-sm text-primary flex items-center"
                      >
                        <Plus size={14} className="mr-1" />
                        Adicionar Nota
                      </button>
                    )}
                  </div>
                  
                  {isAddingNewNote ? (
                    <div className="space-y-2">
                      <textarea
                        value={newNote}
                        onChange={e => setNewNote(e.target.value)}
                        placeholder="Digite uma nova observação..."
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        rows={3}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setIsAddingNewNote(false)}
                          className="px-3 py-1 text-sm border rounded-md"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => addNoteToClient(selectedClient.id)}
                          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md"
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/30 p-3 rounded-lg text-sm whitespace-pre-line">
                      {selectedClient.preferences || 'Nenhuma observação registrada.'}
                    </div>
                  )}
                </div>
                
                {/* Histórico de Atendimentos */}
                <div>
                  <h4 className="font-medium mb-2">Histórico de Atendimentos</h4>
                  {selectedClient.appointments.length > 0 ? (
                    <div className="space-y-3">
                      {selectedClient.appointments.map(apt => (
                        <div key={apt.id} className="bg-card border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{apt.service}</div>
                              <div className="text-sm text-muted-foreground mt-1 flex items-center">
                                <Calendar size={14} className="mr-1" />
                                {formatDate(apt.date)}
                                <Clock size={14} className="ml-3 mr-1" />
                                {/* Horário fictício para exemplo */}
                                {`${Math.floor(Math.random() * 12 + 9)}:${Math.random() > 0.5 ? '00' : '30'}`}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">R$ {apt.price.toFixed(2)}</div>
                              <div className="mt-1">
                                <RatingStars rating={apt.rating} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      Nenhum atendimento registrado para este cliente.
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeClientDetails}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients; 