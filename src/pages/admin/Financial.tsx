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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/DateRangePicker";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import { toast } from "sonner";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  user: string;
}

interface FinancialSummary {
  totalRevenue: number;
  totalCommissions: number;
  totalFees: number;
  netProfit: number;
  pendingPayouts: number;
}

const AdminFinancial: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({
    totalRevenue: 0,
    totalCommissions: 0,
    totalFees: 0,
    netProfit: 0,
    pendingPayouts: 0
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadFinancialData();
  }, []);

  const loadFinancialData = async () => {
    try {
      setLoading(true);
      // Simulando dados de API - em um ambiente real isso seria substituído pela chamada à API real
      setTimeout(() => {
        const mockTransactions: Transaction[] = [
          {
            id: "1",
            date: "2023-04-01T14:30:00Z",
            amount: 1250.00,
            type: "revenue",
            status: "completed",
            description: "Pagamentos de comissões - Março 2023",
            user: "Sistema"
          },
          {
            id: "2",
            date: "2023-04-05T10:15:00Z",
            amount: 320.50,
            type: "fee",
            status: "completed",
            description: "Taxas de processamento - Stripe",
            user: "Sistema"
          },
          {
            id: "3",
            date: "2023-04-10T16:45:00Z",
            amount: 875.25,
            type: "payout",
            status: "pending",
            description: "Pagamento para Barbearia Silva & Cia",
            user: "João Silva"
          },
          {
            id: "4",
            date: "2023-04-12T09:20:00Z",
            amount: 645.75,
            type: "payout",
            status: "completed",
            description: "Pagamento para Barbearia Oliveira",
            user: "Carlos Oliveira"
          },
          {
            id: "5",
            date: "2023-04-15T11:10:00Z",
            amount: 1550.00,
            type: "revenue",
            status: "completed",
            description: "Pagamentos de comissões - primeira quinzena Abril",
            user: "Sistema"
          }
        ];
        
        const mockSummary: FinancialSummary = {
          totalRevenue: 2800.00,
          totalCommissions: 1520.00,
          totalFees: 320.50,
          netProfit: 959.50,
          pendingPayouts: 875.25
        };
        
        setTransactions(mockTransactions);
        setSummary(mockSummary);
        setLoading(false);
      }, 800);
      
    } catch (error) {
      console.error("Erro ao carregar os dados financeiros:", error);
      toast.error("Erro ao carregar os dados financeiros. Tente novamente.");
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  // Dados para o gráfico de receita mensal - Usando o formato simplificado
  const monthlyRevenueData = [
    { label: 'Jan', value: 1200 },
    { label: 'Fev', value: 1500 },
    { label: 'Mar', value: 1800 },
    { label: 'Abr', value: 2200 },
    { label: 'Mai', value: 2800 },
    { label: 'Jun', value: 2600 }
  ];

  // Dados para o gráfico de transações por tipo - Usando o formato simplificado
  const transactionTypeData = [
    { label: 'Receita', value: 2800 },
    { label: 'Comissões', value: 1520 },
    { label: 'Taxas', value: 320 },
    { label: 'Pagamentos', value: 950 }
  ];

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Gestão Financeira</h1>
      
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : formatCurrency(summary.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Comissões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : formatCurrency(summary.totalCommissions)}
            </div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : formatCurrency(summary.netProfit)}
            </div>
            <p className="text-xs text-muted-foreground">Mês atual</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : formatCurrency(summary.pendingPayouts)}
            </div>
            <p className="text-xs text-muted-foreground">Para processamento</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
            <CardDescription>Visualização de receita por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart
                data={monthlyRevenueData}
                height={300}
                title="Receita Mensal"
                description="Visualização de receita por mês"
                formatValue={(value) => `R$ ${value}`}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transações por Tipo</CardTitle>
            <CardDescription>Distribuição dos valores por tipo de transação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart
                data={transactionTypeData}
                height={300}
                title="Transações por Tipo"
                description="Distribuição dos valores por tipo de transação"
                formatValue={(value) => `R$ ${value}`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transações</CardTitle>
            <CardDescription>
              Histórico de todas as transações financeiras
            </CardDescription>
          </div>
          <div className="w-[250px]">
            <DateRangePicker />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    Carregando transações...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    Nenhuma transação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.type === "revenue" 
                          ? "bg-green-100 text-green-800"
                          : transaction.type === "fee"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {transaction.type === "revenue" 
                          ? "Receita" 
                          : transaction.type === "fee"
                          ? "Taxa"
                          : "Pagamento"}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "completed" 
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {transaction.status === "completed" ? "Concluído" : "Pendente"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button variant="outline" className="mr-2">Exportar Relatório</Button>
        <Button>Processar Pagamentos</Button>
      </div>
    </div>
  );
};

export default AdminFinancial;
