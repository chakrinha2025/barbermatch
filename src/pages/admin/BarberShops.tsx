import React, { useState, useEffect } from "react";
import { 
  Filter, 
  Search, 
  Plus, 
  Check, 
  X, 
  AlertTriangle, 
  Edit, 
  Trash2, 
  Eye, 
  Store, 
  Scissors,
  Clock
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface BarberShop {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  status: "active" | "pending" | "incomplete" | "suspended";
  barberCount: number;
  created_at: string;
  setupComplete: boolean;
}

const AdminBarberShops: React.FC = () => {
  const [barberShops, setBarberShops] = useState<BarberShop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedBarberShop, setSelectedBarberShop] = useState<BarberShop | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);

  // Simulação de carga de dados
  useEffect(() => {
    loadBarberShops();
  }, []);

  const loadBarberShops = async () => {
    setLoading(true);
    try {
      // Em um ambiente real, isso seria uma chamada API
      setTimeout(() => {
        const mockData: BarberShop[] = [
          {
            id: "1",
            name: "Barbearia Elegance",
            owner: "José Silva",
            email: "jose@elegance.com",
            phone: "(11) 98765-4321",
            address: "Av. Paulista, 1000",
            city: "São Paulo",
            state: "SP",
            status: "active",
            barberCount: 5,
            created_at: "2023-08-15T10:30:00Z",
            setupComplete: true
          },
          {
            id: "2",
            name: "BarberKing",
            owner: "Carlos Mendes",
            email: "carlos@barberking.com",
            phone: "(11) 91234-5678",
            address: "Rua Augusta, 500",
            city: "São Paulo",
            state: "SP",
            status: "active",
            barberCount: 3,
            created_at: "2023-09-10T14:45:00Z",
            setupComplete: true
          },
          {
            id: "3",
            name: "Corte & Estilo",
            owner: "Ricardo Gomes",
            email: "ricardo@cortestilo.com",
            phone: "(21) 98888-7777",
            address: "Av. Atlântica, 2000",
            city: "Rio de Janeiro",
            state: "RJ",
            status: "pending",
            barberCount: 0,
            created_at: "2023-10-05T09:15:00Z",
            setupComplete: false
          },
          {
            id: "4",
            name: "Royal Barber",
            owner: "André Costa",
            email: "andre@royalbarber.com",
            phone: "(31) 97777-8888",
            address: "Rua dos Barbeiros, 100",
            city: "Belo Horizonte",
            state: "MG",
            status: "incomplete",
            barberCount: 0,
            created_at: "2023-10-08T16:20:00Z",
            setupComplete: false
          },
          {
            id: "5",
            name: "Classic Cuts",
            owner: "Roberto Almeida",
            email: "roberto@classiccuts.com",
            phone: "(41) 96666-5555",
            address: "Av. Cândido de Abreu, 300",
            city: "Curitiba",
            state: "PR",
            status: "suspended",
            barberCount: 2,
            created_at: "2023-07-20T11:10:00Z",
            setupComplete: true
          }
        ];
        setBarberShops(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao carregar barbearias:", error);
      toast.error("Erro ao carregar barbearias");
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const handleEditBarberShop = (barberShop: BarberShop) => {
    setSelectedBarberShop(barberShop);
    setIsEditDialogOpen(true);
  };

  const handleViewBarberShop = (barberShop: BarberShop) => {
    setSelectedBarberShop(barberShop);
    setIsViewDialogOpen(true);
  };

  const handleStatusChange = (barberShop: BarberShop, newStatus: "active" | "pending" | "incomplete" | "suspended") => {
    // Em um ambiente real, isso seria uma chamada API
    const updatedBarberShops = barberShops.map(bs => 
      bs.id === barberShop.id ? { ...bs, status: newStatus } : bs
    );
    setBarberShops(updatedBarberShops);
    toast.success(`Status de ${barberShop.name} alterado para ${getStatusText(newStatus)}`);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Ativa";
      case "pending": return "Pendente";
      case "incomplete": return "Cadastro Incompleto";
      case "suspended": return "Suspensa";
      default: return status;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success" className="flex items-center gap-1"><Check size={12} /> Ativa</Badge>;
      case "pending":
        return <Badge variant="warning" className="flex items-center gap-1"><Clock size={12} /> Pendente</Badge>;
      case "incomplete":
        return <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-800"><AlertTriangle size={12} /> Incompleta</Badge>;
      case "suspended":
        return <Badge variant="destructive" className="flex items-center gap-1"><X size={12} /> Suspensa</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const filteredBarberShops = barberShops.filter(barberShop => {
    const matchesSearch = barberShop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         barberShop.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         barberShop.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "incomplete") return matchesSearch && !barberShop.setupComplete;
    return matchesSearch && barberShop.status === filterStatus;
  });

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Barbearias</h1>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nome, proprietário ou email..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                defaultValue="all"
                onValueChange={handleFilterChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativas</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="incomplete">Cadastro Incompleto</SelectItem>
                  <SelectItem value="suspended">Suspensas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todas ({barberShops.length})</TabsTrigger>
              <TabsTrigger value="active">Ativas ({barberShops.filter(bs => bs.status === "active").length})</TabsTrigger>
              <TabsTrigger value="incomplete">Incompletas ({barberShops.filter(bs => !bs.setupComplete).length})</TabsTrigger>
              <TabsTrigger value="pending">Pendentes ({barberShops.filter(bs => bs.status === "pending").length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Proprietário</TableHead>
                    <TableHead>Cidade/UF</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Barbeiros</TableHead>
                    <TableHead>Cadastro</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Carregando barbearias...
                      </TableCell>
                    </TableRow>
                  ) : filteredBarberShops.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Nenhuma barbearia encontrada
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBarberShops.map((barberShop) => (
                      <TableRow key={barberShop.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Store size={16} className="text-primary" />
                            {barberShop.name}
                          </div>
                        </TableCell>
                        <TableCell>{barberShop.owner}</TableCell>
                        <TableCell>{barberShop.city}/{barberShop.state}</TableCell>
                        <TableCell>{getStatusBadge(barberShop.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Scissors size={14} className="text-muted-foreground" />
                            {barberShop.barberCount}
                          </div>
                        </TableCell>
                        <TableCell>
                          {barberShop.setupComplete ? (
                            <Badge variant="outline" className="flex items-center gap-1 bg-green-50">
                              <Check size={12} className="text-green-600" /> Completo
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="flex items-center gap-1 bg-amber-50">
                              <AlertTriangle size={12} className="text-amber-600" /> Incompleto
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewBarberShop(barberShop)}
                              title="Ver detalhes"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditBarberShop(barberShop)}
                              title="Editar"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              title="Excluir"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="active" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Proprietário</TableHead>
                    <TableHead>Cidade/UF</TableHead>
                    <TableHead>Barbeiros</TableHead>
                    <TableHead>Cadastro em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barberShops
                    .filter(bs => bs.status === "active")
                    .filter(bs => 
                      bs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      bs.owner.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((barberShop) => (
                      <TableRow key={barberShop.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Store size={16} className="text-primary" />
                            {barberShop.name}
                          </div>
                        </TableCell>
                        <TableCell>{barberShop.owner}</TableCell>
                        <TableCell>{barberShop.city}/{barberShop.state}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Scissors size={14} className="text-muted-foreground" />
                            {barberShop.barberCount}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(barberShop.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewBarberShop(barberShop)}
                              title="Ver detalhes"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditBarberShop(barberShop)}
                              title="Editar"
                            >
                              <Edit size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="incomplete" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Proprietário</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Cadastro em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barberShops
                    .filter(bs => !bs.setupComplete)
                    .filter(bs => 
                      bs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      bs.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      bs.email.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((barberShop) => (
                      <TableRow key={barberShop.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Store size={16} className="text-muted-foreground" />
                            {barberShop.name}
                          </div>
                        </TableCell>
                        <TableCell>{barberShop.owner}</TableCell>
                        <TableCell>{barberShop.email}</TableCell>
                        <TableCell>{barberShop.phone}</TableCell>
                        <TableCell>{formatDate(barberShop.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewBarberShop(barberShop)}
                              title="Ver detalhes"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Enviar email de lembrete
                                toast.success("Lembrete enviado para " + barberShop.email);
                              }}
                            >
                              Enviar lembrete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Proprietário</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Cadastro em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barberShops
                    .filter(bs => bs.status === "pending")
                    .filter(bs => 
                      bs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      bs.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      bs.email.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((barberShop) => (
                      <TableRow key={barberShop.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Store size={16} className="text-amber-500" />
                            {barberShop.name}
                          </div>
                        </TableCell>
                        <TableCell>{barberShop.owner}</TableCell>
                        <TableCell>{barberShop.email}</TableCell>
                        <TableCell>{barberShop.phone}</TableCell>
                        <TableCell>{formatDate(barberShop.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewBarberShop(barberShop)}
                              title="Ver detalhes"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                              onClick={() => handleStatusChange(barberShop, "active")}
                            >
                              Aprovar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                              onClick={() => handleStatusChange(barberShop, "suspended")}
                            >
                              Rejeitar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Dialog para visualizar detalhes da barbearia */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Barbearia</DialogTitle>
          </DialogHeader>
          {selectedBarberShop && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex items-center justify-center bg-primary/10 rounded-full">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedBarberShop.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {getStatusBadge(selectedBarberShop.status)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Proprietário</h4>
                  <p>{selectedBarberShop.owner}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Email</h4>
                  <p>{selectedBarberShop.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Telefone</h4>
                  <p>{selectedBarberShop.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Cadastro</h4>
                  <p>{formatDate(selectedBarberShop.created_at)}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium mb-1">Endereço</h4>
                  <p>{selectedBarberShop.address}, {selectedBarberShop.city}/{selectedBarberShop.state}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Barbeiros</h4>
                  <p className="flex items-center gap-1">
                    <Scissors size={14} className="text-muted-foreground" />
                    {selectedBarberShop.barberCount} barbeiros
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Cadastro</h4>
                  <p>
                    {selectedBarberShop.setupComplete ? (
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50">
                        <Check size={12} className="text-green-600" /> Completo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center gap-1 bg-amber-50">
                        <AlertTriangle size={12} className="text-amber-600" /> Incompleto
                      </Badge>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Fechar
            </Button>
            {selectedBarberShop && (
              <Button onClick={() => handleEditBarberShop(selectedBarberShop)}>
                Editar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para editar barbearia */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar Barbearia</DialogTitle>
          </DialogHeader>
          {selectedBarberShop && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Nome da Barbearia</Label>
                  <Input 
                    id="name" 
                    defaultValue={selectedBarberShop.name} 
                  />
                </div>
                <div>
                  <Label htmlFor="owner">Proprietário</Label>
                  <Input 
                    id="owner" 
                    defaultValue={selectedBarberShop.owner} 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    defaultValue={selectedBarberShop.email} 
                    type="email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    defaultValue={selectedBarberShop.phone} 
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={selectedBarberShop.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativa</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="incomplete">Cadastro Incompleto</SelectItem>
                      <SelectItem value="suspended">Suspensa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input 
                    id="address" 
                    defaultValue={selectedBarberShop.address} 
                  />
                </div>
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input 
                    id="city" 
                    defaultValue={selectedBarberShop.city} 
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input 
                    id="state" 
                    defaultValue={selectedBarberShop.state} 
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Adicione observações sobre esta barbearia"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast.success("Alterações salvas com sucesso!");
              setIsEditDialogOpen(false);
            }}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBarberShops; 