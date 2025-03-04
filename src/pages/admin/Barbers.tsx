import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

interface Barber {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  status: string;
  created_at: string;
}

const AdminBarbers: React.FC = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    loadBarbers();
  }, []);

  const loadBarbers = async () => {
    try {
      setLoading(true);
      // Simulando dados de API - em um ambiente real isso seria substituído pela chamada à API real
      setTimeout(() => {
        const mockBarbers: Barber[] = [
          {
            id: "1",
            name: "João Silva",
            email: "joao.silva@example.com",
            phone: "(11) 99999-1111",
            rating: 4.8,
            status: "ativo",
            created_at: "2023-01-15T14:30:00Z"
          },
          {
            id: "2",
            name: "Carlos Oliveira",
            email: "carlos.oliveira@example.com",
            phone: "(11) 99999-2222",
            rating: 4.6,
            status: "ativo",
            created_at: "2023-02-20T10:15:00Z"
          },
          {
            id: "3",
            name: "Ricardo Santos",
            email: "ricardo.santos@example.com",
            phone: "(11) 99999-3333",
            rating: 4.9,
            status: "ativo",
            created_at: "2023-03-10T16:45:00Z"
          },
          {
            id: "4",
            name: "Marcelo Costa",
            email: "marcelo.costa@example.com",
            phone: "(11) 99999-4444",
            rating: 4.7,
            status: "inativo",
            created_at: "2023-01-05T09:20:00Z"
          },
          {
            id: "5",
            name: "André Pereira",
            email: "andre.pereira@example.com",
            phone: "(11) 99999-5555",
            rating: 4.5,
            status: "ativo",
            created_at: "2023-02-28T11:10:00Z"
          }
        ];
        
        setBarbers(mockBarbers);
        setLoading(false);
      }, 800);
      
    } catch (error) {
      console.error("Erro ao carregar os barbeiros:", error);
      toast.error("Erro ao carregar os barbeiros. Tente novamente.");
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const filteredBarbers = barbers.filter(barber => 
    barber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    barber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    barber.phone.includes(searchTerm)
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Barbeiros</h1>
        <Button>Adicionar Barbeiro</Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtrar Barbeiros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Pesquisar por nome, email ou telefone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    Carregando barbeiros...
                  </TableCell>
                </TableRow>
              ) : filteredBarbers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    Nenhum barbeiro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredBarbers.map((barber) => (
                  <TableRow key={barber.id}>
                    <TableCell className="font-medium">{barber.name}</TableCell>
                    <TableCell>{barber.email}</TableCell>
                    <TableCell>{barber.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-1">{barber.rating}</span>
                        <svg
                          className="w-4 h-4 text-yellow-500 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                        </svg>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        barber.status === "ativo" 
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {barber.status === "ativo" ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(barber.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Ver</Button>
                        <Button variant="outline" size="sm">Editar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBarbers; 