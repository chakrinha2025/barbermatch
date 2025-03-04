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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/DateRangePicker";
import { toast } from "sonner";

interface Report {
  id: string;
  title: string;
  type: string;
  status: string;
  date: string;
  downloadUrl: string;
}

const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reportType, setReportType] = useState<string>("all");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      // Simulando dados de API - em um ambiente real isso seria substituído pela chamada à API real
      setTimeout(() => {
        const mockReports: Report[] = [
          {
            id: "1",
            title: "Relatório de Faturamento - Janeiro 2023",
            type: "financial",
            status: "completed",
            date: "2023-02-01T14:30:00Z",
            downloadUrl: "#"
          },
          {
            id: "2",
            title: "Relatório de Usuários Ativos",
            type: "users",
            status: "completed",
            date: "2023-03-15T10:15:00Z",
            downloadUrl: "#"
          },
          {
            id: "3",
            title: "Relatório de Desempenho de Barbeiros",
            type: "performance",
            status: "completed",
            date: "2023-04-10T16:45:00Z",
            downloadUrl: "#"
          },
          {
            id: "4",
            title: "Relatório de Agendamentos - Q1 2023",
            type: "appointments",
            status: "pending",
            date: "2023-04-12T09:20:00Z",
            downloadUrl: "#"
          },
          {
            id: "5",
            title: "Relatório de Tendências de Serviços",
            type: "services",
            status: "completed",
            date: "2023-04-28T11:10:00Z",
            downloadUrl: "#"
          }
        ];
        
        setReports(mockReports);
        setLoading(false);
      }, 800);
      
    } catch (error) {
      console.error("Erro ao carregar os relatórios:", error);
      toast.error("Erro ao carregar os relatórios. Tente novamente.");
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getReportTypeName = (type: string) => {
    const types: Record<string, string> = {
      financial: "Financeiro",
      users: "Usuários",
      performance: "Desempenho",
      appointments: "Agendamentos",
      services: "Serviços"
    };
    return types[type] || type;
  };

  const filteredReports = reportType === "all" 
    ? reports 
    : reports.filter(report => report.type === reportType);

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <Button>Gerar Novo Relatório</Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Tipo de Relatório</label>
              <Select 
                value={reportType} 
                onValueChange={setReportType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="financial">Financeiro</SelectItem>
                  <SelectItem value="users">Usuários</SelectItem>
                  <SelectItem value="performance">Desempenho</SelectItem>
                  <SelectItem value="appointments">Agendamentos</SelectItem>
                  <SelectItem value="services">Serviços</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Período</label>
              <DateRangePicker />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    Carregando relatórios...
                  </TableCell>
                </TableRow>
              ) : filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    Nenhum relatório encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{getReportTypeName(report.type)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        report.status === "completed" 
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {report.status === "completed" ? "Concluído" : "Pendente"}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(report.date)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {report.status === "completed" && (
                          <Button variant="outline" size="sm">Download</Button>
                        )}
                        <Button variant="outline" size="sm">Visualizar</Button>
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

export default AdminReports; 