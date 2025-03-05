import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MessageSquare, Send, User, Clock, CheckCircle, Image, Paperclip, Smile, Search, MoreVertical, Phone, Video, Info, Check } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

// Tipos para as mensagens
interface Message {
  id: string;
  sender: 'user' | 'barber';
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name?: string;
  }[];
}

// Tipo para contatos de barbeiros
interface BarberContact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
  unreadCount?: number;
  barberShop: string;
  isFavorite: boolean;
}

const BarberChat = () => {
  // Estado para armazenar mensagens
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'barber',
      text: 'Olá! Como posso ajudar você hoje?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
      status: 'read'
    },
    {
      id: '2',
      sender: 'user',
      text: 'Olá, queria saber se é possível agendar um corte para amanhã às 15h?',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutos atrás
      status: 'read'
    },
    {
      id: '3',
      sender: 'barber',
      text: 'Claro! Tenho disponibilidade nesse horário. Prefere o corte tradicional ou quer experimentar algo novo?',
      timestamp: new Date(Date.now() - 1000 * 60 * 23), // 23 minutos atrás
      status: 'read'
    },
    {
      id: '4',
      sender: 'user',
      text: 'Queria tentar um degradê dessa vez',
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutos atrás
      status: 'read'
    },
    {
      id: '5',
      sender: 'barber',
      text: 'Perfeito! Vou preparar tudo para o degradê. Quer adicionar barba ao serviço também?',
      timestamp: new Date(Date.now() - 1000 * 60 * 18), // 18 minutos atrás
      status: 'read'
    },
    {
      id: '6',
      sender: 'user',
      text: 'Sim, por favor. Quanto ficaria o total?',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
      status: 'read'
    },
    {
      id: '7',
      sender: 'barber',
      text: 'O degradê é R$45 e a barba R$30, então o total seria R$75. Você tem um desconto de cliente fiel de 10%, então fica R$67,50',
      timestamp: new Date(Date.now() - 1000 * 60 * 13), // 13 minutos atrás
      status: 'read'
    },
    {
      id: '8',
      sender: 'user',
      text: 'Ótimo! Confirmo o agendamento então.',
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutos atrás
      status: 'read'
    },
    {
      id: '9',
      sender: 'barber',
      text: 'Perfeito! Agendamento confirmado para amanhã às 15h - degradê + barba. Vou enviar uma confirmação para seu celular também. Até lá!',
      timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 minutos atrás
      status: 'read'
    },
    {
      id: '10',
      sender: 'barber',
      text: 'Aliás, se você tiver alguma referência do degradê que gostaria, pode me enviar uma foto para eu me preparar melhor.',
      timestamp: new Date(Date.now() - 1000 * 60 * 7), // 7 minutos atrás
      status: 'delivered'
    }
  ]);

  // Lista de contatos de barbeiros
  const [barberContacts, setBarberContacts] = useState<BarberContact[]>([
    {
      id: '1',
      name: 'Rafael Costa',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'online',
      unreadCount: 2,
      barberShop: 'Barbearia Vintage',
      isFavorite: true
    },
    {
      id: '2',
      name: 'André Martins',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      status: 'offline',
      lastSeen: new Date(Date.now() - 1000 * 60 * 45),
      barberShop: 'BarberKing',
      isFavorite: true
    },
    {
      id: '3',
      name: 'Lucas Oliveira',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      status: 'online',
      barberShop: 'Cortes & Cia',
      isFavorite: false
    },
    {
      id: '4',
      name: 'Matheus Silva',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      status: 'away',
      barberShop: 'Barba Negra',
      isFavorite: false
    },
    {
      id: '5',
      name: 'Carlos Freitas',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
      status: 'offline',
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 3),
      barberShop: 'The Barber Shop',
      isFavorite: false
    }
  ]);

  // Barbeiro selecionado atualmente
  const [selectedBarber, setSelectedBarber] = useState<string>(barberContacts[0].id);
  
  // Estado para o texto da nova mensagem
  const [newMessage, setNewMessage] = useState('');

  // Formatar a timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Enviar nova mensagem
  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
      status: 'sent'
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulação de resposta do barbeiro após 2 segundos
    setTimeout(() => {
      const barberResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'barber',
        text: 'Certo, anotado! Tem mais alguma dúvida sobre seu agendamento?',
        timestamp: new Date(),
        status: 'delivered'
      };
      
      setMessages(prev => [...prev, barberResponse]);
    }, 2000);
  };

  // Renderizar o componente de chat
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-rose-800 to-pink-900 overflow-hidden">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
                  <ChevronLeft size={16} className="mr-2" />
                  Voltar para Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Chat com <span className="text-rose-300">Barbeiros</span>
                </h1>
                <p className="text-lg text-rose-100 mb-8 max-w-lg">
                  Comunique-se diretamente com seu barbeiro para garantir resultados perfeitos. Envie referências, tire dúvidas e receba orientações personalizadas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/signup?feature=chat&plan=basic" 
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Começar a Conversar
                  </Link>
                  <Link 
                    to="/pricing?highlight=chat" 
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Ver Planos
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md mx-auto"
                >
                  <div className="bg-rose-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <img 
                            src="https://randomuser.me/api/portraits/men/32.jpg" 
                            alt="Barbeiro" 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium">Rafael Costa</h3>
                          <p className="text-xs text-rose-100">Online agora</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button aria-label="Chamada de vídeo" className="text-white hover:bg-rose-700 p-1 rounded-full transition-colors">
                          <Video size={18} />
                        </button>
                        <button aria-label="Chamada de áudio" className="text-white hover:bg-rose-700 p-1 rounded-full transition-colors">
                          <Phone size={18} />
                        </button>
                        <button aria-label="Mais opções" className="text-white hover:bg-rose-700 p-1 rounded-full transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col space-y-4" style={{ scrollBehavior: 'smooth' }}>
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                            message.sender === 'user' 
                              ? 'bg-rose-600 text-white rounded-tr-none' 
                              : 'bg-gray-200 text-gray-800 rounded-tl-none'
                          }`}
                        >
                          <p>{message.text}</p>
                          <div className={`text-xs mt-1 flex items-center justify-end ${
                            message.sender === 'user' ? 'text-rose-200' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                            {message.sender === 'user' && (
                              <span className="ml-1">
                                {message.status === 'read' && <CheckCircle size={12} className="fill-current" />}
                                {message.status === 'delivered' && <CheckCircle size={12} />}
                                {message.status === 'sent' && <Check size={12} />}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 border-t flex items-center">
                    <button aria-label="Adicionar arquivo" className="text-gray-500 hover:text-rose-600 p-2 rounded-full transition-colors">
                      <Paperclip size={20} />
                    </button>
                    <button aria-label="Adicionar imagem" className="text-gray-500 hover:text-rose-600 p-2 rounded-full transition-colors">
                      <Image size={20} />
                    </button>
                    <input 
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 border-none outline-none px-3 py-2 bg-transparent"
                    />
                    <button aria-label="Emoji" className="text-gray-500 hover:text-rose-600 p-2 rounded-full transition-colors">
                      <Smile size={20} />
                    </button>
                    <button 
                      aria-label="Enviar mensagem"
                      onClick={sendMessage}
                      className="bg-rose-600 text-white p-2 rounded-full hover:bg-rose-700 transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Interface Completa */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Interface Completa de Chat</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore nossa interface completa de chat, projetada para facilitar a comunicação entre clientes e barbeiros.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden mx-auto max-w-6xl">
              <div className="flex h-[600px]">
                {/* Sidebar de contatos */}
                <div className="w-1/3 border-r overflow-y-auto">
                  <div className="p-4 border-b">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Buscar conversa" 
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none"
                      />
                      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={18} />
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {barberContacts.map((contact) => (
                      <div 
                        key={contact.id}
                        onClick={() => setSelectedBarber(contact.id)}
                        className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedBarber === contact.id ? 'bg-gray-100' : ''
                        }`}
                      >
                        <div className="relative">
                          <img 
                            src={contact.avatar} 
                            alt={contact.name} 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div 
                            className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                              contact.status === 'online' ? 'bg-green-500' : 
                              contact.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                            }`}
                          ></div>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{contact.name}</h3>
                            <span className="text-xs text-gray-500">
                              {contact.lastSeen ? formatTime(contact.lastSeen) : ''}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{contact.barberShop}</p>
                        </div>
                        {contact.unreadCount && contact.unreadCount > 0 && (
                          <div className="bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {contact.unreadCount}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Área de chat principal */}
                <div className="w-2/3 flex flex-col">
                  {/* Cabeçalho do chat */}
                  <div className="p-4 border-b flex items-center justify-between bg-white shadow-sm">
                    <div className="flex items-center">
                      <div className="relative">
                        <img 
                          src={barberContacts.find(c => c.id === selectedBarber)?.avatar} 
                          alt="Barbeiro" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div 
                          className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                            barberContacts.find(c => c.id === selectedBarber)?.status === 'online' ? 'bg-green-500' : 
                            barberContacts.find(c => c.id === selectedBarber)?.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                          }`}
                        ></div>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">{barberContacts.find(c => c.id === selectedBarber)?.name}</h3>
                        <p className="text-xs text-gray-500">
                          {barberContacts.find(c => c.id === selectedBarber)?.status === 'online' 
                            ? 'Online agora' 
                            : barberContacts.find(c => c.id === selectedBarber)?.status === 'away'
                            ? 'Ausente'
                            : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button aria-label="Chamada de vídeo" className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <Video size={18} />
                      </button>
                      <button aria-label="Chamada de áudio" className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <Phone size={18} />
                      </button>
                      <button aria-label="Informações" className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <Info size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Área de mensagens */}
                  <div className="flex-grow overflow-y-auto p-4 bg-gray-50 flex flex-col space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender === 'barber' && (
                          <img 
                            src={barberContacts.find(c => c.id === selectedBarber)?.avatar} 
                            alt="Barbeiro" 
                            className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                          />
                        )}
                        <div 
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            message.sender === 'user' 
                              ? 'bg-rose-600 text-white rounded-tr-none' 
                              : 'bg-gray-200 text-gray-800 rounded-tl-none'
                          }`}
                        >
                          <p>{message.text}</p>
                          <div className={`text-xs mt-1 flex items-center justify-end ${
                            message.sender === 'user' ? 'text-rose-200' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                            {message.sender === 'user' && (
                              <span className="ml-1">
                                {message.status === 'read' && <CheckCircle size={12} className="fill-current" />}
                                {message.status === 'delivered' && <CheckCircle size={12} />}
                                {message.status === 'sent' && <CheckCircle size={12} stroke="currentColor" fill="none" />}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Área de input */}
                  <div className="p-4 border-t flex items-center bg-white">
                    <button aria-label="Adicionar arquivo" className="text-gray-500 hover:text-rose-600 p-2 rounded-full transition-colors">
                      <Paperclip size={20} />
                    </button>
                    <button aria-label="Adicionar imagem" className="text-gray-500 hover:text-rose-600 p-2 rounded-full transition-colors">
                      <Image size={20} />
                    </button>
                    <input 
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 border border-gray-200 rounded-full outline-none px-4 py-2 mx-2 focus:border-rose-500"
                    />
                    <button aria-label="Emoji" className="text-gray-500 hover:text-rose-600 p-2 rounded-full transition-colors">
                      <Smile size={20} />
                    </button>
                    <button 
                      aria-label="Enviar mensagem"
                      onClick={sendMessage}
                      className="bg-rose-600 text-white p-3 rounded-full hover:bg-rose-700 transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Recursos do Chat</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comunique-se de forma eficiente e clara com nosso sistema de chat integrado
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Image size={24} className="text-rose-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Compartilhamento de Referências</h3>
                <p className="text-gray-600 mb-4">
                  Envie fotos de estilos que você gosta para garantir que seu barbeiro entenda exatamente o que você deseja
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Envio de imagens em alta resolução</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Galeria de estilos integrada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Organização por categorias</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock size={24} className="text-rose-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Comunicação em Tempo Real</h3>
                <p className="text-gray-600 mb-4">
                  Converse com seu barbeiro antes, durante e depois do agendamento para garantir a melhor experiência
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Notificações instantâneas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Indicador de online/offline</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Confirmação de leitura</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare size={24} className="text-rose-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Histórico Completo</h3>
                <p className="text-gray-600 mb-4">
                  Acesse todo o histórico de conversas com seus barbeiros favoritos a qualquer momento
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Pesquisa em conversas anteriores</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Organização por data</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Acesso a referências enviadas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Como Funciona</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comunicar-se com seu barbeiro nunca foi tão fácil e eficiente
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-rose-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full text-white text-sm flex items-center justify-center font-bold">1</span>
                  <Search size={24} className="text-rose-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Encontre seu Barbeiro</h3>
                <p className="text-sm text-gray-600">
                  Busque e encontre o barbeiro ideal para o seu estilo
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-rose-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full text-white text-sm flex items-center justify-center font-bold">2</span>
                  <MessageSquare size={24} className="text-rose-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Inicie uma Conversa</h3>
                <p className="text-sm text-gray-600">
                  Comece a conversar e tire todas as suas dúvidas
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-rose-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full text-white text-sm flex items-center justify-center font-bold">3</span>
                  <Image size={24} className="text-rose-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Compartilhe Referências</h3>
                <p className="text-sm text-gray-600">
                  Envie fotos do estilo que você deseja
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-rose-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full text-white text-sm flex items-center justify-center font-bold">4</span>
                  <CheckCircle size={24} className="text-rose-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Resultados Perfeitos</h3>
                <p className="text-sm text-gray-600">
                  Obtenha exatamente o corte que você deseja
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-rose-600 to-pink-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Comunique-se com Facilidade</h2>
            <p className="text-lg text-rose-100 mb-6 max-w-2xl mx-auto">
              Experimente agora mesmo e descubra como é fácil obter o corte perfeito através de uma comunicação clara e eficiente.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-rose-500/30 rounded-full flex items-center justify-center mr-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm text-rose-200">Maior satisfação com resultados</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-rose-500/30 rounded-full flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-rose-200">Disponibilidade para mensagens</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-rose-500/30 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-rose-200">Segurança nas conversas</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/signup?feature=chat&plan=basic" 
                className="px-8 py-3 bg-white text-rose-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Comece Agora
              </Link>
              <Link 
                to="/pricing?highlight=chat" 
                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Ver Planos
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BarberChat; 