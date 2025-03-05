import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Send,
  Paperclip,
  Image,
  Smile,
  Phone,
  Video,
  MoreVertical,
  CheckCircle,
  Check,
  Calendar,
  Clock,
  ChevronRight
} from 'lucide-react';

// Interfaces
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'barber';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name?: string;
  }[];
}

interface BarberInfo {
  id: string;
  name: string;
  avatar: string;
  shopName: string;
  rating: number;
  online: boolean;
  lastSeen?: Date;
}

export default function ChatDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [barber, setBarber] = useState<BarberInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Simular carregamento de dados
  useEffect(() => {
    // Em produção, isso carregaria os dados do backend
    setTimeout(() => {
      const fakeBarber: BarberInfo = {
        id: id || '1',
        name: 'Rafael Costa',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        shopName: 'Barbearia Vintage',
        rating: 4.8,
        online: true
      };
      
      const fakeMessages: Message[] = [
        {
          id: '1',
          content: 'Olá! Como posso ajudar você hoje?',
          sender: 'barber',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          status: 'read'
        },
        {
          id: '2',
          content: 'Olá Rafael! Estou querendo agendar um corte para este final de semana. Você tem disponibilidade?',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 29),
          status: 'read'
        },
        {
          id: '3',
          content: 'Claro! Tenho horários disponíveis no sábado às 10h, 14h e 16h30. Qual horário seria melhor para você?',
          sender: 'barber',
          timestamp: new Date(Date.now() - 1000 * 60 * 27),
          status: 'read'
        },
        {
          id: '4',
          content: 'O horário das 14h seria perfeito. Quanto tempo dura o serviço?',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 25),
          status: 'read'
        },
        {
          id: '5',
          content: 'Para um corte completo leva em torno de 45 minutos. Também oferecemos serviço de barba, caso tenha interesse.',
          sender: 'barber',
          timestamp: new Date(Date.now() - 1000 * 60 * 23),
          status: 'read'
        },
        {
          id: '6',
          content: 'Ótimo! Vou querer só o corte mesmo. Vocês aceitam pagamento por PIX?',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          status: 'read'
        },
        {
          id: '7',
          content: 'Sim, aceitamos PIX, cartão e dinheiro. Vou confirmar seu agendamento para sábado às 14h então.',
          sender: 'barber',
          timestamp: new Date(Date.now() - 1000 * 60 * 18),
          status: 'read',
          attachments: [
            {
              type: 'image',
              url: 'https://images.unsplash.com/photo-1625225233840-695456021cde?q=80&w=1470&auto=format&fit=crop',
              name: 'confirmacao_agendamento.jpg'
            }
          ]
        },
        {
          id: '8',
          content: 'Perfeito! Muito obrigado. Estarei aí no horário.',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          status: 'read'
        },
        {
          id: '9',
          content: 'Será um prazer atendê-lo. Caso surja algum imprevisto, por favor me avise com antecedência. Até sábado!',
          sender: 'barber',
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          status: 'delivered'
        }
      ];
      
      setBarber(fakeBarber);
      setMessages(fakeMessages);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  // Rolar para o final quando receber novas mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Enviar nova mensagem
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simular resposta automática
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Entendi! Há mais alguma coisa em que eu possa ajudar?',
        sender: 'barber',
        timestamp: new Date(),
        status: 'delivered'
      };
      
      setMessages(prev => [...prev, autoReply]);
    }, 2000);
  };
  
  // Formatar hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Voltar para a lista de conversas
  const handleGoBack = () => {
    navigate('/app/chat');
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Cabeçalho */}
      <div className="px-4 py-3 border-b flex items-center justify-between bg-card rounded-t-lg">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleGoBack}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Voltar para conversas"
          >
            <ArrowLeft size={18} />
          </button>
          
          {barber && (
            <div className="flex items-center">
              <div className="relative mr-3">
                <img 
                  src={barber.avatar} 
                  alt={barber.name}
                  className="w-10 h-10 rounded-full object-cover" 
                />
                {barber.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                )}
              </div>
              
              <div>
                <h2 className="font-medium leading-tight">{barber.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {barber.online ? 'Online agora' : 'Offline'}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <button 
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Chamada de voz"
          >
            <Phone size={18} />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Chamada de vídeo"
          >
            <Video size={18} />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Mais opções"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>
      
      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'barber' && barber && (
                  <img 
                    src={barber.avatar} 
                    alt={barber.name}
                    className="w-8 h-8 rounded-full object-cover mr-2 self-end" 
                  />
                )}
                
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border'
                  }`}
                >
                  {message.content}
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2">
                      {message.attachments.map((attachment, index) => (
                        <div key={index} className="mt-2">
                          {attachment.type === 'image' && (
                            <img 
                              src={attachment.url} 
                              alt={attachment.name || 'Attachment'} 
                              className="rounded-md max-h-48 max-w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            />
                          )}
                          {attachment.type === 'document' && (
                            <div className="p-2 bg-muted rounded-md text-sm flex items-center">
                              <Paperclip size={16} className="mr-2" />
                              <span>{attachment.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className={`text-xs mt-1 flex items-center justify-end gap-1 ${
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                    {message.sender === 'user' && (
                      <span>
                        {message.status === 'read' && <CheckCircle size={12} className="ml-1" />}
                        {message.status === 'delivered' && <Check size={12} className="ml-1" />}
                        {message.status === 'sent' && <Check size={12} className="ml-1" />}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Área de digitação */}
      <div className="p-3 border-t bg-card rounded-b-lg">
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Anexar arquivo"
          >
            <Paperclip size={20} />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Anexar imagem"
          >
            <Image size={20} />
          </button>
          
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1 py-2 px-3 rounded-full bg-muted border-none focus:outline-none focus:ring-1 focus:ring-primary"
          />
          
          <button 
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Inserir emoji"
          >
            <Smile size={20} />
          </button>
          <button 
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ''}
            className={`p-2 rounded-full ${
              newMessage.trim() !== '' 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'bg-muted text-muted-foreground'
            } transition-colors`}
            aria-label="Enviar mensagem"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      
      {/* Próximo agendamento (se existir) */}
      {barber && (
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border">
          <div className="flex justify-between items-center">
            <h3 className="font-medium flex items-center">
              <Calendar size={16} className="mr-2 text-primary" />
              Próximo Agendamento
            </h3>
            <Link to="/app/appointments" className="text-xs text-primary hover:underline flex items-center">
              Ver todos <ChevronRight size={12} className="ml-1" />
            </Link>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={barber.avatar} 
                alt={barber.name}
                className="w-8 h-8 rounded-full object-cover mr-2" 
              />
              <div>
                <p className="text-sm font-medium">{barber.name}</p>
                <p className="text-xs text-muted-foreground">{barber.shopName}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <Calendar size={14} className="mr-1 text-muted-foreground" />
                <span className="text-sm">Sábado, 14:00</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1 text-muted-foreground" />
                <span className="text-sm">45 min</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 