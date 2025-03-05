import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MessageSquare, ChevronRight, Clock, CheckCircle } from 'lucide-react';

import { RecommendationEngine } from '@/components/RecommendationEngine';

// Interface para os dados de contato com barbeiros
interface BarberContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  online: boolean;
  shopName: string;
}

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<BarberContact[]>([]);
  const [loading, setLoading] = useState(true);

  // Simular carregamento de contatos
  useEffect(() => {
    const fakeContacts: BarberContact[] = [
      {
        id: '1',
        name: 'Rafael Costa',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        lastMessage: 'Seu agendamento está confirmado para amanhã às 14:30.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        unreadCount: 2,
        online: true,
        shopName: 'Barbearia Vintage'
      },
      {
        id: '2',
        name: 'André Martins',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
        lastMessage: 'Temos disponibilidade para quinta-feira. Funcionaria para você?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        unreadCount: 0,
        online: false,
        shopName: 'BarberKing'
      },
      {
        id: '3',
        name: 'Lucas Oliveira',
        avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
        lastMessage: 'Vou separar os produtos que você pediu. Obrigado pela preferência!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        unreadCount: 0,
        online: true,
        shopName: 'Cortes & Cia'
      }
    ];

    setTimeout(() => {
      setContacts(fakeContacts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrar contatos com base na busca
  const filteredContacts = contacts.filter(
    contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Formatar timestamp
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Ontem';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('pt-BR', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Conversas</h1>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Buscar nas suas conversas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredContacts.length > 0 ? (
        <div className="space-y-3">
          {filteredContacts.map(contact => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={`/app/chat/${contact.id}`} className="block">
                <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={contact.avatar} 
                        alt={contact.name} 
                        className="w-12 h-12 rounded-full object-cover" 
                      />
                      {contact.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-xs text-muted-foreground">{contact.shopName}</p>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatTime(contact.timestamp)}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-muted-foreground truncate pr-4 max-w-[240px]">
                          {contact.lastMessage}
                        </p>
                        {contact.unreadCount > 0 && (
                          <div className="bg-primary text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                            {contact.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <ChevronRight size={16} className="text-muted-foreground mt-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
          <MessageSquare size={40} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhuma conversa encontrada</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchQuery 
              ? `Não encontramos resultados para "${searchQuery}"`
              : "Você ainda não iniciou conversas com barbeiros."}
          </p>
          <Link to="/app/explore" className="inline-flex items-center text-primary font-medium hover:underline">
            Encontrar barbeiros <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Barbeiros Recomendados</h2>
        <RecommendationEngine />
      </div>
    </div>
  );
} 