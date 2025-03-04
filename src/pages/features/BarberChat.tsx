import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MessageSquare, Send, User, Clock, CheckCircle, Image, Paperclip, Smile, Search } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

const BarberChat = () => {
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
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-rose-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                  <div className="bg-gradient-to-br from-gray-900/80 to-rose-900/80 backdrop-blur-sm border border-white/10 p-4 rounded-xl shadow-2xl">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
                      <div className="p-3 border-b border-white/10 flex items-center">
                        <div className="w-10 h-10 bg-rose-500/30 rounded-full overflow-hidden mr-3">
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="text-white" size={20} />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Carlos Ferreira</h3>
                          <p className="text-xs text-white/70">Barbeiro • Online</p>
                        </div>
                      </div>
                      
                      <div className="h-64 p-3 overflow-y-auto">
                        <div className="flex justify-start mb-3">
                          <div className="bg-white/10 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                            <p className="text-sm text-white">Olá! Como posso ajudar você hoje?</p>
                            <span className="text-xs text-white/50 mt-1 block">10:30</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mb-3">
                          <div className="bg-rose-500/30 rounded-lg rounded-tr-none p-3 max-w-[80%]">
                            <p className="text-sm text-white">Oi Carlos! Estou pensando em fazer um degradê. Você tem disponibilidade para amanhã?</p>
                            <span className="text-xs text-white/50 mt-1 block">10:32</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-start mb-3">
                          <div className="bg-white/10 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                            <p className="text-sm text-white">Claro! Tenho horário disponível amanhã às 14h ou 16h. Qual você prefere?</p>
                            <span className="text-xs text-white/50 mt-1 block">10:33</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mb-3">
                          <div className="bg-rose-500/30 rounded-lg rounded-tr-none p-3 max-w-[80%]">
                            <p className="text-sm text-white">Ótimo! Vou ficar com o horário das 14h. Estou enviando uma referência do estilo que gostaria.</p>
                            <div className="mt-2 bg-white/10 rounded-lg p-1">
                              <div className="h-20 bg-gray-800 rounded flex items-center justify-center">
                                <Image size={24} className="text-white/50" />
                              </div>
                            </div>
                            <span className="text-xs text-white/50 mt-1 block">10:35</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 border-t border-white/10">
                        <div className="flex items-center">
                          <div className="flex-1 bg-white/10 rounded-full px-4 py-2 flex items-center">
                            <input 
                              type="text" 
                              placeholder="Digite sua mensagem..." 
                              className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-white/50"
                            />
                            <div className="flex items-center space-x-2 ml-2">
                              <button aria-label="Anexar arquivo" className="text-white/70 hover:text-white">
                                <Paperclip size={16} />
                              </button>
                              <button aria-label="Inserir emoji" className="text-white/70 hover:text-white">
                                <Smile size={16} />
                              </button>
                            </div>
                          </div>
                          <button aria-label="Enviar mensagem" className="ml-2 p-2 bg-rose-500 rounded-full text-white">
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
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