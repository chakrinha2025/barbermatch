
import React, { useState } from 'react';
import { Calendar, Clock, Scissors, User, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface BasicAppointmentFormProps {
  barberName?: string;
  barberId?: string;
}

const AVAILABLE_TIMES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

const SERVICES = [
  { id: 'corte', name: 'Corte de Cabelo', price: 35, duration: 30 },
  { id: 'barba', name: 'Barba', price: 25, duration: 20 },
  { id: 'combo', name: 'Combo (Corte + Barba)', price: 50, duration: 45 },
];

export function BasicAppointmentForm({ barberName = 'Carlos', barberId = '1' }: BasicAppointmentFormProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value ? new Date(event.target.value) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success('Agendamento realizado com sucesso!', {
      description: `${selectedService} com ${barberName} para ${selectedDate?.toLocaleDateString()} às ${selectedTime}`,
    });
    
    // Reset form
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedService(null);
    setName('');
    setPhone('');
    setNote('');
  };

  const getServiceById = (id: string) => {
    return SERVICES.find(service => service.id === id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  return (
    <div className="rounded-xl glass-muted p-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <Calendar className="mr-2 h-5 w-5 text-primary" />
        Agendar Horário
      </h3>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Selecione o Serviço</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SERVICES.map(service => (
                  <div 
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`cursor-pointer border rounded-lg p-3 transition-all ${
                      selectedService === service.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium">{service.name}</div>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-gray-500">{service.duration} min</span>
                      <span className="font-semibold">{formatPrice(service.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1">Selecione a Data</label>
              <input
                type="date"
                id="date"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                onChange={handleDateChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background"
              />
            </div>
            
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium mb-1">Selecione o Horário</label>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_TIMES.map(time => (
                    <div 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`cursor-pointer border rounded-lg p-2 text-center transition-all ${
                        selectedTime === time 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                      }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!selectedService || !selectedDate || !selectedTime}
                className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                Continuar
              </button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Seu Nome</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Seu Telefone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="note" className="block text-sm font-medium mb-1">Observações (opcional)</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Alguma observação para o barbeiro?"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background"
                  rows={3}
                ></textarea>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4">
              <h4 className="font-medium mb-2">Resumo do Agendamento</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Serviço:</span>
                  <span className="font-medium">{getServiceById(selectedService || '')?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Data:</span>
                  <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Horário:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Barbeiro:</span>
                  <span className="font-medium">{barberName}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <span className="text-gray-500">Valor Total:</span>
                  <span className="font-bold">{formatPrice(getServiceById(selectedService || '')?.price || 0)}</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium sm:w-1/3"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="py-3 px-4 bg-primary text-white rounded-lg font-medium sm:w-2/3"
              >
                Confirmar Agendamento
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default BasicAppointmentForm;
