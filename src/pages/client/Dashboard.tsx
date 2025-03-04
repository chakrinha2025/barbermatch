import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { calcWidthPercentage } from '@/lib/animations';

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    date: new Date(),
    time: "10:00",
    service: "Corte de Cabelo",
    barber: "João",
    status: "Confirmado",
  },
  {
    id: 2,
    date: new Date(),
    time: "11:30",
    service: "Barba",
    barber: "Pedro",
    status: "Pendente",
  },
  {
    id: 3,
    date: new Date(),
    time: "14:00",
    service: "Corte e Barba",
    barber: "João",
    status: "Cancelado",
  },
  {
    id: 4,
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: "09:00",
    service: "Corte de Cabelo",
    barber: "Pedro",
    status: "Confirmado",
  },
  {
    id: 5,
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "16:30",
    service: "Barba",
    barber: "João",
    status: "Confirmado",
  },
];

const mockBarbers = [
  {
    id: 1,
    name: "João",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4.5,
    appointmentsToday: 3,
  },
  {
    id: 2,
    name: "Pedro",
    avatar: "https://i.pravatar.cc/150?img=6",
    rating: 4.8,
    appointmentsToday: 5,
  },
];

export default function ClientDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState(mockAppointments);
  const [barbers, setBarbers] = useState(mockBarbers);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data from an API
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const getAppointmentsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    return appointments.filter((appointment) =>
      isSameDay(appointment.date, selectedDate)
    );
  };

  const appointmentsForSelectedDate = getAppointmentsForDate(date);

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Olá, <span className="text-primary">Cliente</span>
          </h1>
          <p className="text-muted-foreground">
            Acompanhe seus agendamentos e novidades
          </p>
        </div>
        <Button>Agendar Novo Serviço</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-medium">
              Próximo Agendamento
            </CardTitle>
            <CardDescription>Seu próximo serviço agendado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {isLoading ? (
              <Skeleton className="h-4 w-[60%] rounded-md" />
            ) : appointmentsForSelectedDate.length > 0 ? (
              <>
                <p className="text-sm font-medium">
                  {format(appointmentsForSelectedDate[0].date, 'dd/MM/yyyy', { locale: ptBR })}
                </p>
                <p className="text-2xl font-bold">
                  {appointmentsForSelectedDate[0].time}
                </p>
                <p className="text-muted-foreground">
                  {appointmentsForSelectedDate[0].service} com{" "}
                  {appointmentsForSelectedDate[0].barber}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Nenhum agendamento hoje.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-medium">Barbeiros Favoritos</CardTitle>
            <CardDescription>Seus barbeiros mais frequentes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-[70%] rounded-md" />
              </>
            ) : (
              barbers.map((barber) => (
                <div key={barber.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={barber.avatar} alt={barber.name} />
                    <AvatarFallback>{barber.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{barber.name}</p>
                    <div className="flex items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star h-4 w-4 text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <p className="text-xs text-muted-foreground">
                        {barber.rating}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-medium">
              Seus Agendamentos
            </CardTitle>
            <CardDescription>
              Todos os seus agendamentos futuros
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Barbeiro</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <>
                    <TableRow>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px] rounded-md" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[60px] rounded-md" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[120px] rounded-md" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px] rounded-md" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px] rounded-md" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px] rounded-md" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[60px] rounded-md" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[120px] rounded-md" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[100px] rounded-md" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80px] rounded-md" />
                      </TableCell>
                    </TableRow>
                  </>
                ) : appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        {format(appointment.date, "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>{appointment.barber}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{appointment.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-4 text-muted-foreground"
                    >
                      Nenhum agendamento encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-medium">
            Selecione uma Data
          </CardTitle>
          <CardDescription>
            Veja os agendamentos para um dia específico
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "w-[240px] justify-start text-left font-normal" +
                  (date ? " text-foreground" : " text-muted-foreground")
                }
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("2023-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </div>
  );
}
