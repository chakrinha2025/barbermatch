import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, BellRing, CheckCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SmartBooking = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="relative py-20 bg-gradient-to-b from-green-800 to-teal-900 overflow-hidden">
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
                  Sistema avançado de agendamento que otimiza a sua agenda e reduz cancelamentos, aumentando a eficiência da sua barbearia.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/signup" 
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Começar Agora
                  </Link>
                  <Link 
                    to="/pricing" 
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Ver Planos
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="p-1 bg-gradient-to-r from-green-500 to-teal-500"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Sua Agenda Organizada</h3>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <Clock size={16} className="text-green-500 mr-2" />
                          <span className="font-medium">Hoje</span>
                        </div>
                        <span className="text-sm text-gray-500">3 agendamentos</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                          <div>
                            <p className="font-medium">Rodrigo Alves</p>
                            <p className="text-sm text-gray-500">Corte + Barba</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">09:30</p>
                            <p className="text-xs text-green-600">Confirmado</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                          <div>
                            <p className="font-medium">Bruno Santos</p>
                            <p className="text-sm text-gray-500">Corte Degradê</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">11:15</p>
                            <p className="text-xs text-yellow-600">Aguardando</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                          <div>
                            <p className="font-medium">Carlos Mendes</p>
                            <p className="text-sm text-gray-500">Barba Completa</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">15:45</p>
                            <p className="text-xs text-green-600">Confirmado</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800 transition-colors">
                        Ver agenda completa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Recursos Inteligentes</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nosso sistema de agendamento vai muito além de um simples calendário.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BellRing size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Lembretes Automáticos</h3>
                <p className="text-gray-600">
                  Lembretes por WhatsApp, SMS ou e-mail reduzem drasticamente as faltas e cancelamentos de última hora.
                </p>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Disponibilidade Inteligente</h3>
                <p className="text-gray-600">
                  Otimização automática da agenda para maximizar o número de clientes sem sobrecarregar a barbearia.
                </p>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Horários Flexíveis</h3>
                <p className="text-gray-600">
                  Configure diferentes durações para cada serviço e crie intervalos personalizados entre atendimentos.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-r from-green-600 to-teal-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Transforme sua Gestão de Agenda</h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
              Reduza cancelamentos, otimize seu tempo e aumente seu faturamento com nosso sistema inteligente.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Começar Gratuitamente
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Falar com Consultor
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SmartBooking; 