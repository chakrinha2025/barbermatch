// Serviço de cliente

import api from './index';

// Interfaces
interface Appointment {
  id: number;
  barberName: string;
  barberShopName: string;
  barberPhone: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'completed' | 'canceled';
  price: number;
  address: string;
  notes?: string;
  barberImage: string;
}

interface Barber {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  address: string;
  services: string[];
  specialties: string[];
  availableToday: boolean;
  image: string;
  price: {
    min: number;
    max: number;
  };
}

interface HairstyleOption {
  id: number;
  name: string;
  image: string;
  category: 'corte' | 'barba';
  popular: boolean;
  new: boolean;
}

// Dados simulados para desenvolvimento
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    barberName: "Carlos Oliveira",
    barberShopName: "Barbearia Vintage",
    barberPhone: "(11) 98765-4321",
    service: "Corte de Cabelo + Barba",
    date: "2023-08-15T00:00:00.000Z",
    time: "14:30",
    duration: 60,
    status: 'completed',
    price: 85,
    address: "Rua das Flores, 123",
    notes: "Traga referência do corte desejado",
    barberImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    barberName: "Felipe Santos",
    barberShopName: "BarberShop Premium",
    barberPhone: "(11) 91234-5678",
    service: "Corte Degradê",
    date: new Date().toISOString().split('T')[0] + "T00:00:00.000Z",
    time: "10:00",
    duration: 45,
    status: 'confirmed',
    price: 65,
    address: "Av. Principal, 500",
    barberImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    barberName: "Ricardo Almeida",
    barberShopName: "Corte & Arte",
    barberPhone: "(11) 95555-7777",
    service: "Corte + Tratamento Facial",
    date: "2023-08-25T00:00:00.000Z",
    time: "16:00",
    duration: 90,
    status: 'pending',
    price: 120,
    address: "Rua das Palmeiras, 78",
    barberImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const MOCK_BARBERS: Barber[] = [
  { 
    id: 1, 
    name: "Barbearia Vintage",
    rating: 4.8,
    reviewCount: 127,
    distance: "1.2 km",
    address: "Rua das Flores, 123",
    services: ["Corte", "Barba", "Tratamento Facial"],
    specialties: ["Degradê", "Barba Completa"],
    availableToday: true,
    image: "https://images.unsplash.com/photo-1516914589923-f105f1535f87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: {
      min: 35,
      max: 100
    }
  },
  { 
    id: 2, 
    name: "BarberShop Premium",
    rating: 4.9,
    reviewCount: 214,
    distance: "2.5 km",
    address: "Av. Principal, 500",
    services: ["Corte", "Barba", "Tintura", "Massagem"],
    specialties: ["Cortes Clássicos", "Barbas Esculpidas"],
    availableToday: true,
    image: "https://images.unsplash.com/photo-1622288432067-87c544f7c9fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: {
      min: 45,
      max: 120
    }
  }
];

// Serviço do cliente
export const clientService = {
  // Obter todos os agendamentos do cliente
  async getAppointments(): Promise<Appointment[]> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_APPOINTMENTS;
    }
    
    // Implementação real
    const response = await api.get('/client/appointments');
    return response.data;
  },
  
  // Obter detalhes de um agendamento específico
  async getAppointmentDetails(id: number): Promise<Appointment> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const appointment = MOCK_APPOINTMENTS.find(a => a.id === id);
      if (!appointment) {
        throw new Error('Agendamento não encontrado');
      }
      return appointment;
    }
    
    // Implementação real
    const response = await api.get(`/client/appointments/${id}`);
    return response.data;
  },
  
  // Cancelar um agendamento
  async cancelAppointment(id: number, reason?: string): Promise<void> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }
    
    // Implementação real
    await api.post(`/client/appointments/${id}/cancel`, { reason });
  },
  
  // Reagendar um agendamento
  async rescheduleAppointment(id: number, newDate: string, newTime: string): Promise<Appointment> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const appointmentIndex = MOCK_APPOINTMENTS.findIndex(a => a.id === id);
      if (appointmentIndex === -1) {
        throw new Error('Agendamento não encontrado');
      }
      
      const updatedAppointment = {
        ...MOCK_APPOINTMENTS[appointmentIndex],
        date: newDate,
        time: newTime,
        status: 'confirmed' as const
      };
      
      return updatedAppointment;
    }
    
    // Implementação real
    const response = await api.post(`/client/appointments/${id}/reschedule`, { date: newDate, time: newTime });
    return response.data;
  },
  
  // Buscar barbeiros
  async searchBarbers(searchParams: {
    query?: string;
    location?: string;
    maxDistance?: number;
    minRating?: number;
    maxPrice?: number;
    services?: string[];
    availableToday?: boolean;
  }): Promise<Barber[]> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredBarbers = [...MOCK_BARBERS];
      
      // Aplicar filtros
      if (searchParams.query) {
        const query = searchParams.query.toLowerCase();
        filteredBarbers = filteredBarbers.filter(barber => 
          barber.name.toLowerCase().includes(query) ||
          barber.services.some(service => service.toLowerCase().includes(query)) ||
          barber.specialties.some(specialty => specialty.toLowerCase().includes(query))
        );
      }
      
      if (searchParams.maxDistance) {
        filteredBarbers = filteredBarbers.filter(barber => {
          const distanceKm = parseFloat(barber.distance.split(' ')[0]);
          return distanceKm <= searchParams.maxDistance!;
        });
      }
      
      if (searchParams.minRating) {
        filteredBarbers = filteredBarbers.filter(barber => barber.rating >= searchParams.minRating!);
      }
      
      if (searchParams.maxPrice) {
        filteredBarbers = filteredBarbers.filter(barber => barber.price.max <= searchParams.maxPrice!);
      }
      
      if (searchParams.services && searchParams.services.length > 0) {
        filteredBarbers = filteredBarbers.filter(barber => 
          searchParams.services!.every(service => barber.services.includes(service))
        );
      }
      
      if (searchParams.availableToday) {
        filteredBarbers = filteredBarbers.filter(barber => barber.availableToday);
      }
      
      return filteredBarbers;
    }
    
    // Implementação real
    const response = await api.get('/client/barbers', { params: searchParams });
    return response.data;
  },
  
  // Obter detalhes de um barbeiro
  async getBarberDetails(id: number): Promise<Barber> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const barber = MOCK_BARBERS.find(b => b.id === id);
      if (!barber) {
        throw new Error('Barbeiro não encontrado');
      }
      return barber;
    }
    
    // Implementação real
    const response = await api.get(`/client/barbers/${id}`);
    return response.data;
  },
  
  // Obter horários disponíveis de um barbeiro em uma data específica
  async getBarberAvailableTimes(barberId: number, date: string): Promise<string[]> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Horários de exemplo
      return ['09:00', '10:30', '11:00', '14:00', '15:30', '16:00'];
    }
    
    // Implementação real
    const response = await api.get(`/client/barbers/${barberId}/available-times`, { params: { date } });
    return response.data;
  },
  
  // Agendar um novo serviço
  async bookAppointment(data: {
    barberId: number;
    serviceId: number;
    date: string;
    time: string;
    notes?: string;
  }): Promise<Appointment> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const barber = MOCK_BARBERS.find(b => b.id === data.barberId);
      if (!barber) {
        throw new Error('Barbeiro não encontrado');
      }
      
      // Simular um novo agendamento
      const newAppointment: Appointment = {
        id: Math.floor(Math.random() * 1000),
        barberName: barber.name,
        barberShopName: barber.name,
        barberPhone: "(11) 99999-9999", // Fictício
        service: barber.services[0],
        date: data.date,
        time: data.time,
        duration: 45, // Fictício
        status: 'pending',
        price: barber.price.min,
        address: barber.address,
        notes: data.notes,
        barberImage: barber.image
      };
      
      return newAppointment;
    }
    
    // Implementação real
    const response = await api.post('/client/appointments', data);
    return response.data;
  },
  
  // Obter estilos de corte para experimentação virtual
  async getHairstyleOptions(): Promise<HairstyleOption[]> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Estilos de exemplo
      return [
        {
          id: 1,
          name: "Degradê Clássico",
          image: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: 'corte',
          popular: true,
          new: false
        },
        {
          id: 2,
          name: "Undercut Moderno",
          image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: 'corte',
          popular: true,
          new: false
        },
        {
          id: 5,
          name: "Barba Cheia",
          image: "https://images.unsplash.com/photo-1592647420148-bfcc177e2117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          category: 'barba',
          popular: true,
          new: false
        }
      ];
    }
    
    // Implementação real
    const response = await api.get('/client/hairstyles');
    return response.data;
  },
  
  // Simular experimentação virtual (processar imagem com IA)
  async processVirtualTryOn(imageData: string, hairstyleId: number): Promise<string> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Na vida real, retornaria a imagem processada pelo backend
      // Por enquanto, retornaremos uma imagem de exemplo
      return `https://images.unsplash.com/photo-${hairstyleId}-example-processed.jpg`;
    }
    
    // Implementação real
    const response = await api.post('/client/virtual-try-on', { imageData, hairstyleId });
    return response.data.processedImage;
  }
};

export default clientService; 