import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, Bell, CheckCircle, X, User, Smartphone, CalendarCheck } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

const SmartScheduling = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-green-800 to-emerald-900 overflow-hidden">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
                  <ChevronLeft size={16} className="mr-2" />
                  Voltar para Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Agendamento <span className="text-green-300">Inteligente</span>
                </h1>
                <p className="text-lg text-green-100 mb-8 max-w-lg">
                  Marque horários com facilidade, receba lembretes automáticos e reduza faltas em até 80%. Uma nova forma de gerenciar sua agenda.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/signup?feature=scheduling&plan=basic" 
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Agendar Agora
                  </Link>
                  <Link 
                    to="/pricing?highlight=scheduling" 
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Ver Planos
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-green-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                  <div className="bg-gradient-to-br from-gray-900/80 to-green-900/80 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-2xl">
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="text-white font-medium">Agendamento</h3>
                      <div className="flex space-x-2">
                        <button aria-label="Mês anterior" className="p-1 text-white/70 hover:text-white">
                          <ChevronLeft size={16} />
                        </button>
                        <span className="text-white text-sm">Junho 2023</span>
                        <button aria-label="Próximo mês" className="p-1 text-white/70 hover:text-white rotate-180">
                          <ChevronLeft size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                        <div key={i} className="text-center text-white/70 text-xs py-1">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                        <div 
                          key={day}
                          className={`text-center py-2 text-sm rounded-md ${
                            day === 15 
                              ? 'bg-green-500 text-white font-medium' 
                              : 'text-white/80 hover:bg-white/10 cursor-pointer'
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-white/10 pt-4 mb-4">
                      <h4 className="text-white text-sm mb-2">Horários Disponíveis - 15 de Junho</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/10 text-white text-sm py-1.5 px-2 rounded text-center hover:bg-green-500/30 cursor-pointer">
                          09:00
                        </div>
                        <div className="bg-white/10 text-white text-sm py-1.5 px-2 rounded text-center hover:bg-green-500/30 cursor-pointer">
                          10:30
                        </div>
                        <div className="bg-green-500/30 text-white text-sm py-1.5 px-2 rounded text-center font-medium border border-green-500/50">
                          14:00
                        </div>
                        <div className="bg-white/10 text-white text-sm py-1.5 px-2 rounded text-center hover:bg-green-500/30 cursor-pointer">
                          15:30
                        </div>
                        <div className="bg-white/10 text-white text-sm py-1.5 px-2 rounded text-center hover:bg-green-500/30 cursor-pointer">
                          17:00
                        </div>
                        <div className="bg-white/10 text-white text-sm py-1.5 px-2 rounded text-center hover:bg-green-500/30 cursor-pointer">
                          18:30
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors">
                      Confirmar Agendamento
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Recursos Exclusivos</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nosso sistema de agendamento inteligente foi projetado para facilitar sua vida e reduzir faltas
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Lembretes Automáticos</h3>
                <p className="text-gray-600 mb-4">
                  Receba lembretes via WhatsApp, SMS e e-mail para nunca mais esquecer um compromisso
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Notificações 24h e 1h antes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Confirmação em um clique</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Reagendamento facilitado</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Sincronização de Calendários</h3>
                <p className="text-gray-600 mb-4">
                  Integre com Google Calendar, Outlook e outros aplicativos de calendário
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Atualização em tempo real</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Compatível com múltiplas plataformas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Detecção de conflitos de horários</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Gestão Inteligente de Horários</h3>
                <p className="text-gray-600 mb-4">
                  Algoritmo que otimiza a agenda do barbeiro e reduz tempos ociosos
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Sugestão de melhores horários</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Previsão precisa de duração</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Ajuste automático em caso de atrasos</span>
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
                Agendar um horário nunca foi tão fácil e eficiente
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full text-white text-sm flex items-center justify-center font-bold">1</span>
                  <User size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Escolha o Barbeiro</h3>
                <p className="text-sm text-gray-600">
                  Selecione o profissional de sua preferência
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full text-white text-sm flex items-center justify-center font-bold">2</span>
                  <Calendar size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Selecione a Data</h3>
                <p className="text-sm text-gray-600">
                  Escolha o dia que melhor se encaixa na sua agenda
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full text-white text-sm flex items-center justify-center font-bold">3</span>
                  <Clock size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Escolha o Horário</h3>
                <p className="text-sm text-gray-600">
                  Veja os horários disponíveis e escolha o melhor para você
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full text-white text-sm flex items-center justify-center font-bold">4</span>
                  <CalendarCheck size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Confirme e Pronto</h3>
                <p className="text-sm text-gray-600">
                  Receba a confirmação e lembretes automáticos
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">O Que Nossos Usuários Dizem</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Veja como o agendamento inteligente está transformando a experiência de barbeiros e clientes
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <User className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Ricardo Almeida</h4>
                    <p className="text-sm text-gray-500">Cliente</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Nunca mais esqueci um agendamento desde que comecei a usar o BarberMatch. Os lembretes são perfeitos e reagendar é super fácil quando preciso."
                </p>
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <User className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Carlos Ferreira</h4>
                    <p className="text-sm text-gray-500">Barbeiro</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Reduzi as faltas em quase 80% desde que implementei o sistema de agendamento do BarberMatch. Minha agenda está sempre otimizada e os clientes adoram a facilidade."
                </p>
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <User className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Marcos Silva</h4>
                    <p className="text-sm text-gray-500">Proprietário de Barbearia</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "A sincronização com nosso sistema de gestão é perfeita. Consigo ver toda a agenda da equipe em um só lugar e os relatórios me ajudam a tomar decisões melhores."
                </p>
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Simplifique Seus Agendamentos Hoje</h2>
            <p className="text-lg text-green-100 mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de barbeiros e clientes que já estão aproveitando os benefícios do agendamento inteligente.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mr-4">
                  <X className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">-80%</div>
                  <div className="text-sm text-green-200">Redução em faltas</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">+35%</div>
                  <div className="text-sm text-green-200">Otimização da agenda</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mr-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-green-200">Taxa de satisfação</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/signup?feature=scheduling&plan=free" 
                className="px-8 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Comece Agora
              </Link>
              <Link 
                to="/download?feature=scheduling" 
                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Baixar o App
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SmartScheduling; 