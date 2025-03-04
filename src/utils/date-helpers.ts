
import { format, isAfter as dateFnsIsAfter, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Export isAfter for use in components
export const isAfter = dateFnsIsAfter;

// Format date to display format
export const formatDate = (date: string): string => {
  return format(parseISO(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

// Format time to display format
export const formatTime = (time: string): string => {
  return time.substring(0, 5) + 'h';
};
