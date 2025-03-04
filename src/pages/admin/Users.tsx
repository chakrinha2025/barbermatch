import { useState } from 'react';
import { 
  Search, 
  Filter, 
  User, 
  UserCheck, 
  UserX, 
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Scissors,
  AlertTriangle,
  Check,
  X,
  Edit,
  Ban,
  ChevronsUpDown,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react';

// Tipos
interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: 'client' | 'barber';
  status: 'active' | 'pending' | 'suspended';
  registeredAt: string;
  location: string;
  appointments?: number;
  rating?: number;
  avatar?: string;
  lastLogin?: string;
  verified: boolean;
}

// Dados simulados
const MOCK_USERS: UserData[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    phone: '(11) 98765-4321',
    userType: 'client',
    status: 'active',
    registeredAt: '2023-05-12T10:30:00Z',
    location: 'São Paulo, SP',
    appointments: 8,
    lastLogin: '2023-11-02T14:25:00Z',
    verified: true,
    avatar: 'https://ui-avatars.com/api/?name=João+Silva&background=6366f1&color=fff'
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    email: 'carlos@barbeariavintage.com',
    phone: '(11) 99876-5432',
    userType: 'barber',
    status: 'active',
    registeredAt: '2023-03-20T09:15:00Z',
    location: 'São Paulo, SP',
    appointments: 145,
    rating: 4.8,
    lastLogin: '2023-11-04T11:30:00Z',
    verified: true,
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Oliveira&background=6366f1&color=fff'
  },
  {
    id: 3,
    name: 'Maria Santos',
    email: 'maria.santos@exemplo.com',
    phone: '(21) 97654-3210',
    userType: 'client',
    status: 'active',
    registeredAt: '2023-06-05T16:45:00Z',
    location: 'Rio de Janeiro, RJ',
    appointments: 3,
    lastLogin: '2023-10-28T09:15:00Z',
    verified: true,
    avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=6366f1&color=fff'
  },
  {
    id: 4,
    name: 'Elite Barber Shop',
    email: 'contato@elitebarbershop.com',
    phone: '(21) 3456-7890',
    userType: 'barber',
    status: 'pending',
    registeredAt: '2023-10-10T14:00:00Z',
    location: 'Rio de Janeiro, RJ',
    appointments: 0,
    rating: 0,
    verified: false,
    avatar: 'https://ui-avatars.com/api/?name=Elite+Barber&background=6366f1&color=fff'
  },
  {
    id: 5,
    name: 'Pedro Almeida',
    email: 'pedro.almeida@exemplo.com',
    phone: '(31) 98765-1234',
    userType: 'client',
    status: 'suspended',
    registeredAt: '2023-04-18T11:20:00Z',
    location: 'Belo Horizonte, MG',
    appointments: 2,
    lastLogin: '2023-09-15T16:40:00Z',
    verified: true,
    avatar: 'https://ui-avatars.com/api/?name=Pedro+Almeida&background=6366f1&color=fff'
  },
  {
    id: 6,
    name: 'Modern Cut Barbearia',
    email: 'contato@moderncut.com',
    phone: '(41) 3333-4444',
    userType: 'barber',
    status: 'active',
    registeredAt: '2023-02-15T10:10:00Z',
    location: 'Curitiba, PR',
    appointments: 105,
    rating: 4.6,
    lastLogin: '2023-11-03T17:20:00Z',
    verified: true,
    avatar: 'https://ui-avatars.com/api/?name=Modern+Cut&background=6366f1&color=fff'
  },
  {
    id: 7,
    name: 'Ana Beatriz',
    email: 'ana.beatriz@exemplo.com',
    phone: '(47) 99988-7766',
    userType: 'client',
    status: 'active',
    registeredAt: '2023-08-22T08:30:00Z',
    location: 'Florianópolis, SC',
    appointments: 1,
    lastLogin: '2023-10-29T20:15:00Z',
    verified: true,
    avatar: 'https://ui-avatars.com/api/?name=Ana+Beatriz&background=6366f1&color=fff'
  },
  {
    id: 8,
    name: 'Barber Kings',
    email: 'contato@barberkings.com',
    phone: '(31) 3434-5656',
    userType: 'barber',
    status: 'active',
    registeredAt: '2023-01-10T13:45:00Z',
    location: 'Belo Horizonte, MG',
    appointments: 118,
    rating: 4.7,
    lastLogin: '2023-11-04T08:50:00Z',
    verified: true,
    avatar: 'https://ui-avatars.com/api/?name=Barber+Kings&background=6366f1&color=fff'
  },
  {
    id: 9,
    name: 'Roberto Gomes',
    email: 'roberto.gomes@exemplo.com',
    phone: '(85) 98888-7777',
    userType: 'client',
    status: 'pending',
    registeredAt: '2023-10-30T15:20:00Z',
    location: 'Fortaleza, CE',
    appointments: 0,
    verified: false,
    avatar: 'https://ui-avatars.com/api/?name=Roberto+Gomes&background=6366f1&color=fff'
  },
  {
    id: 10,
    name: 'Gentleman\'s Club',
    email: 'contato@gentlemansclub.com',
    phone: '(61) 3939-2020',
    userType: 'barber',
    status: 'suspended',
    registeredAt: '2023-02-28T11:30:00Z',
    location: 'Brasília, DF',
    appointments: 98,
    rating: 4.8,
    lastLogin: '2023-10-15T14:10:00Z',
    verified: true,
    avatar: 'https://ui-avatars.com/api/?name=Gentlemans+Club&background=6366f1&color=fff'
  }
];

const Users = () => {
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'client' | 'barber'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'registeredAt' | 'appointments'>('registeredAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtrar usuários
  const filteredUsers = users.filter(user => {
    // Filtro de busca
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtro de status
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    // Filtro de tipo
    const matchesType = typeFilter === 'all' || user.userType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Ordenar usuários
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let compareValueA, compareValueB;
    
    if (sortBy === 'name') {
      compareValueA = a.name;
      compareValueB = b.name;
    } else if (sortBy === 'appointments') {
      compareValueA = a.appointments || 0;
      compareValueB = b.appointments || 0;
    } else { // registeredAt
      compareValueA = new Date(a.registeredAt).getTime();
      compareValueB = new Date(b.registeredAt).getTime();
    }
    
    // Ordenação ascendente ou descendente
    if (sortDirection === 'asc') {
      return compareValueA > compareValueB ? 1 : -1;
    } else {
      return compareValueA < compareValueB ? 1 : -1;
    }
  });
  
  // Alternar a direção da ordenação ou definir o campo de ordenação
  const toggleSort = (field: 'name' | 'registeredAt' | 'appointments') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc'); // Padrão: ordenação descendente ao trocar o campo
    }
  };
  
  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Mostrar detalhes do usuário
  const viewUserDetails = (user: UserData) => {
    setSelectedUser(user);
  };
  
  // Fechar modal de detalhes
  const closeUserDetails = () => {
    setSelectedUser(null);
  };
  
  // Suspender um usuário
  const suspendUser = (userId: number) => {
    if (window.confirm('Tem certeza que deseja suspender este usuário?')) {
      const updatedUsers = users.map(user => 
        user.id === userId 
          ? { ...user, status: 'suspended' as const } 
          : user
      );
      setUsers(updatedUsers);
      
      // Atualizar o usuário selecionado se estiver no modal
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, status: 'suspended' });
      }
    }
  };
  
  // Reativar um usuário
  const activateUser = (userId: number) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, status: 'active' as const } 
        : user
    );
    setUsers(updatedUsers);
    
    // Atualizar o usuário selecionado se estiver no modal
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, status: 'active' });
    }
  };
  
  // Verificar um usuário
  const verifyUser = (userId: number) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, verified: true, status: user.status === 'pending' ? 'active' as const : user.status } 
        : user
    );
    setUsers(updatedUsers);
    
    // Atualizar o usuário selecionado se estiver no modal
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ 
        ...selectedUser, 
        verified: true,
        status: selectedUser.status === 'pending' ? 'active' : selectedUser.status 
      });
    }
  };
  
  // Limpar todos os filtros
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
    setShowFilters(false);
  };
  
  // Obter ícone e cor do status
  const getStatusInfo = (status: UserData['status']) => {
    switch (status) {
      case 'active':
        return { icon: UserCheck, color: 'text-green-500 bg-green-50 dark:bg-green-950/30' };
      case 'pending':
        return { icon: AlertTriangle, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' };
      case 'suspended':
        return { icon: UserX, color: 'text-red-500 bg-red-50 dark:bg-red-950/30' };
      default:
        return { icon: User, color: 'text-gray-500 bg-gray-50 dark:bg-gray-900/30' };
    }
  };
  
  // Obter texto do status
  const getStatusText = (status: UserData['status']) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending':
        return 'Pendente';
      case 'suspended':
        return 'Suspenso';
      default:
        return 'Desconhecido';
    }
  };
  
  // Obter texto do tipo de usuário
  const getUserTypeText = (userType: UserData['userType']) => {
    return userType === 'client' ? 'Cliente' : 'Barbeiro';
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
        <p className="text-muted-foreground">
          Visualize, filtre e gerencie os usuários cadastrados na plataforma.
        </p>
      </div>
      
      {/* Barra de pesquisa e filtragem */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Buscar por nome, email, telefone ou localização..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
            />
          </div>
          
          <div className="flex gap-2 md:ml-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 border rounded-md bg-background hover:bg-muted"
              aria-label="Alternar filtros"
            >
              <Filter size={16} />
              <span>Filtros</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 border-destructive text-destructive border rounded-md hover:bg-destructive/10"
                aria-label="Limpar filtros"
              >
                Limpar
              </button>
            )}
          </div>
        </div>
        
        {/* Opções de filtro expansíveis */}
        {showFilters && (
          <div className="p-4 border rounded-md bg-card animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Usuário</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  aria-label="Filtrar por tipo de usuário"
                >
                  <option value="all">Todos</option>
                  <option value="client">Clientes</option>
                  <option value="barber">Barbeiros</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  aria-label="Filtrar por status"
                >
                  <option value="all">Todos</option>
                  <option value="active">Ativos</option>
                  <option value="pending">Pendentes</option>
                  <option value="suspended">Suspensos</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Ordenar por</label>
                <select
                  value={`${sortBy}-${sortDirection}`}
                  onChange={(e) => {
                    const [field, direction] = e.target.value.split('-');
                    setSortBy(field as any);
                    setSortDirection(direction as any);
                  }}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  aria-label="Ordenar por"
                >
                  <option value="name-asc">Nome (A-Z)</option>
                  <option value="name-desc">Nome (Z-A)</option>
                  <option value="registeredAt-desc">Data de registro (Mais recente)</option>
                  <option value="registeredAt-asc">Data de registro (Mais antigo)</option>
                  <option value="appointments-desc">Agendamentos (Maior)</option>
                  <option value="appointments-asc">Agendamentos (Menor)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Tabela de Usuários */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/40">
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button 
                    onClick={() => toggleSort('name')}
                    className="flex items-center"
                    aria-label="Ordenar por nome"
                  >
                    Usuário
                    <ChevronsUpDown 
                      size={16} 
                      className={`ml-1 transition-opacity ${
                        sortBy === 'name' ? 'opacity-100' : 'opacity-40'
                      }`} 
                    />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button 
                    onClick={() => toggleSort('registeredAt')}
                    className="flex items-center"
                    aria-label="Ordenar por data de registro"
                  >
                    Registro
                    <ChevronsUpDown 
                      size={16} 
                      className={`ml-1 transition-opacity ${
                        sortBy === 'registeredAt' ? 'opacity-100' : 'opacity-40'
                      }`} 
                    />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium hidden lg:table-cell">Localização</th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  <button 
                    onClick={() => toggleSort('appointments')}
                    className="flex items-center"
                    aria-label="Ordenar por agendamentos"
                  >
                    Agendamentos
                    <ChevronsUpDown 
                      size={16} 
                      className={`ml-1 transition-opacity ${
                        sortBy === 'appointments' ? 'opacity-100' : 'opacity-40'
                      }`} 
                    />
                  </button>
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => {
                  const StatusIcon = getStatusInfo(user.status).icon;
                  return (
                    <tr key={user.id} className="border-b hover:bg-muted/20">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-full h-full p-1.5 text-primary" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                          {!user.verified && (
                            <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 rounded">
                              Não verificado
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm hidden md:table-cell">
                        <div className="flex items-center">
                          {user.userType === 'barber' ? (
                            <Scissors size={14} className="mr-1.5 text-primary" />
                          ) : (
                            <User size={14} className="mr-1.5 text-primary" />
                          )}
                          {getUserTypeText(user.userType)}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(user.status).color}`}>
                          <StatusIcon size={12} />
                          <span>{getStatusText(user.status)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1.5 text-muted-foreground" />
                          {formatDate(user.registeredAt)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm hidden lg:table-cell">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1.5 text-muted-foreground" />
                          {user.location}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {user.appointments ?? 0}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => viewUserDetails(user)}
                            className="p-1 rounded-md hover:bg-muted"
                            aria-label="Ver detalhes"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {(user.status === 'active' || user.status === 'pending') && (
                            <button
                              onClick={() => suspendUser(user.id)}
                              className="p-1 rounded-md hover:bg-muted text-destructive"
                              aria-label="Suspender usuário"
                            >
                              <Ban size={16} />
                            </button>
                          )}
                          {user.status === 'suspended' && (
                            <button
                              onClick={() => activateUser(user.id)}
                              className="p-1 rounded-md hover:bg-muted text-green-500"
                              aria-label="Ativar usuário"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          {!user.verified && (
                            <button
                              onClick={() => verifyUser(user.id)}
                              className="p-1 rounded-md hover:bg-muted text-blue-500"
                              aria-label="Verificar usuário"
                            >
                              <UserCheck size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                    {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' ? (
                      <>
                        <p className="text-lg">Nenhum usuário encontrado</p>
                        <p className="text-sm mt-1">Tente ajustar os filtros ou a busca</p>
                        <button
                          onClick={clearFilters}
                          className="text-primary hover:underline text-sm mt-4"
                        >
                          Limpar todos os filtros
                        </button>
                      </>
                    ) : (
                      <p className="text-lg">Nenhum usuário cadastrado</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal de Detalhes do Usuário */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-primary/10">
                    {selectedUser.avatar ? (
                      <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-full h-full p-3 text-primary" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(selectedUser.status).color}`}>
                        {(() => {
                          const StatusIcon = getStatusInfo(selectedUser.status).icon;
                          return <StatusIcon size={12} />;
                        })()}
                        <span>{getStatusText(selectedUser.status)}</span>
                      </div>
                      <div className="text-sm">
                        {getUserTypeText(selectedUser.userType)}
                      </div>
                      {!selectedUser.verified && (
                        <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 rounded">
                          Não verificado
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={closeUserDetails}
                  className="p-2 hover:bg-muted rounded-md"
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Informações de Contato</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail size={14} className="mr-2 text-muted-foreground" />
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone size={14} className="mr-2 text-muted-foreground" />
                      <span>{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin size={14} className="mr-2 text-muted-foreground" />
                      <span>{selectedUser.location}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-medium text-muted-foreground pt-2">Atividade</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar size={14} className="mr-2 text-muted-foreground" />
                      <span>Registrado em: {formatDate(selectedUser.registeredAt)}</span>
                    </div>
                    {selectedUser.lastLogin && (
                      <div className="flex items-center text-sm">
                        <Calendar size={14} className="mr-2 text-muted-foreground" />
                        <span>Último login: {formatDate(selectedUser.lastLogin)}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <Calendar size={14} className="mr-2 text-muted-foreground" />
                      <span>Agendamentos: {selectedUser.appointments ?? 0}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {selectedUser.userType === 'barber' && (
                    <>
                      <h3 className="text-sm font-medium text-muted-foreground">Informações da Barbearia</h3>
                      
                      <div className="space-y-2">
                        {selectedUser.rating !== undefined && (
                          <div className="flex items-center text-sm">
                            <Star size={14} className="mr-2 text-yellow-500 fill-yellow-500" />
                            <span>Avaliação: {selectedUser.rating.toFixed(1)}</span>
                          </div>
                        )}
                        <div className="flex items-center text-sm">
                          <Scissors size={14} className="mr-2 text-muted-foreground" />
                          <span>Atendimentos realizados: {selectedUser.appointments ?? 0}</span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <h3 className="text-sm font-medium text-muted-foreground pt-2">Ações</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 flex items-center gap-1"
                    >
                      <Edit size={14} />
                      <span>Editar</span>
                    </button>
                    
                    {selectedUser.status === 'suspended' ? (
                      <button
                        onClick={() => {
                          activateUser(selectedUser.id);
                        }}
                        className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 flex items-center gap-1"
                      >
                        <Check size={14} />
                        <span>Reativar</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          suspendUser(selectedUser.id);
                        }}
                        className="px-3 py-1.5 bg-destructive text-destructive-foreground text-sm rounded-md hover:bg-destructive/90 flex items-center gap-1"
                      >
                        <Ban size={14} />
                        <span>Suspender</span>
                      </button>
                    )}
                    
                    {!selectedUser.verified && (
                      <button
                        onClick={() => {
                          verifyUser(selectedUser.id);
                        }}
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1"
                      >
                        <UserCheck size={14} />
                        <span>Verificar</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button
                  onClick={closeUserDetails}
                  className="px-4 py-2 border rounded-md hover:bg-muted"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Paginação (simulação simplificada) */}
      <div className="flex justify-between items-center text-sm">
        <div className="text-muted-foreground">
          Mostrando {sortedUsers.length} de {sortedUsers.length} usuários
        </div>
        <div className="inline-flex gap-1">
          <button 
            className="px-2 py-1 border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={true}
          >
            Anterior
          </button>
          <button className="px-3 py-1 border rounded bg-primary text-primary-foreground">1</button>
          <button 
            className="px-2 py-1 border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={true}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users; 