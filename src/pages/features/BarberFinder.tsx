import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Star, Scissors, Filter, Search, Users, CheckCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

const BarberFinder = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-amber-800 to-orange-900 overflow-hidden">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
                  <ChevronLeft size={16} className="mr-2" />
                  Voltar para Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Descoberta de <span className="text-amber-300">Barbeiros Profissionais</span>
                </h1>
                <p className="text-lg text-amber-100 mb-8 max-w-lg">
                  Encontre os melhores barbeiros da sua região com base em avaliações, especialidades e estilos. Uma nova forma de descobrir o profissional perfeito para você.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/signup?feature=finder&plan=free" 
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Encontrar Barbeiros
                  </Link>
                  <Link 
                    to="/pricing?highlight=finder" 
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Ver Planos
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                  <div className="bg-gradient-to-br from-gray-900/80 to-amber-900/80 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-2xl">
                    <div className="mb-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            type="text" 
                            placeholder="Buscar barbeiros, estilos ou técnicas..." 
                            className="w-full py-2 pl-10 pr-4 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        <button aria-label="Filtrar resultados" className="ml-2 p-2 bg-amber-500 rounded-lg text-white">
                          <Filter size={20} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Degradê</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Barba</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Próximo de mim</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Bem avaliados</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg flex items-center">
                        <div className="w-12 h-12 bg-amber-500/30 rounded-full overflow-hidden mr-3">
                          <div className="w-full h-full flex items-center justify-center">
                            <Scissors className="text-white" size={20} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-white">Marcos Silva</h3>
                            <div className="flex items-center">
                              <Star size={14} className="text-yellow-400 fill-yellow-400" />
                              <span className="text-xs text-white ml-1">4.9</span>
                            </div>
                          </div>
                          <p className="text-xs text-white/70">Especialista em Degradê • 2.3km</p>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg flex items-center">
                        <div className="w-12 h-12 bg-amber-500/30 rounded-full overflow-hidden mr-3">
                          <div className="w-full h-full flex items-center justify-center">
                            <Scissors className="text-white" size={20} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-white">Carlos Ferreira</h3>
                            <div className="flex items-center">
                              <Star size={14} className="text-yellow-400 fill-yellow-400" />
                              <span className="text-xs text-white ml-1">4.8</span>
                            </div>
                          </div>
                          <p className="text-xs text-white/70">Barbas e Navalhados • 1.5km</p>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg flex items-center">
                        <div className="w-12 h-12 bg-amber-500/30 rounded-full overflow-hidden mr-3">
                          <div className="w-full h-full flex items-center justify-center">
                            <Scissors className="text-white" size={20} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-white">André Oliveira</h3>
                            <div className="flex items-center">
                              <Star size={14} className="text-yellow-400 fill-yellow-400" />
                              <span className="text-xs text-white ml-1">4.7</span>
                            </div>
                          </div>
                          <p className="text-xs text-white/70">Corte Social • 3.1km</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Como Funciona</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Encontre o barbeiro ideal para o seu estilo com nossa plataforma intuitiva e poderosa
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin size={24} className="text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Localização Inteligente</h3>
                <p className="text-gray-600 mb-4">
                  Encontre barbeiros próximos à sua localização atual ou em qualquer região de interesse
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Geolocalização precisa</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Filtro por distância</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Bairros e regiões específicas</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Scissors size={24} className="text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Filtros Avançados</h3>
                <p className="text-gray-600 mb-4">
                  Defina exatamente o que você procura com nossos filtros especializados
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Especialidades (degradê, barba, etc)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Faixa de preço</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Disponibilidade de horários</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Star size={24} className="text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Avaliações Verificadas</h3>
                <p className="text-gray-600 mb-4">
                  Avaliações reais de outros clientes para ajudar você a escolher
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Avaliações detalhadas por critério</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Fotos de trabalhos realizados</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Comentários de clientes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Demo Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Descubra os Melhores Profissionais da Região</h2>
                <p className="text-gray-600 mb-6">
                  Nosso mapa interativo mostra todos os barbeiros disponíveis perto de você, com informações detalhadas sobre cada um.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-amber-100 p-2 rounded-lg">
                      <Users size={18} className="text-amber-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-800">Perfis Detalhados</h4>
                      <p className="text-gray-600">Veja o portfólio completo de cada profissional antes de decidir.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-amber-100 p-2 rounded-lg">
                      <Star size={18} className="text-amber-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-800">Classificação por Avaliações</h4>
                      <p className="text-gray-600">Encontre os profissionais mais bem avaliados próximos a você.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-amber-100 p-2 rounded-lg">
                      <MapPin size={18} className="text-amber-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-800">Rotas e Distâncias</h4>
                      <p className="text-gray-600">Veja exatamente quanto tempo levará para chegar até o barbeiro escolhido.</p>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/signup?feature=finder&plan=free" 
                  className="inline-flex items-center px-6 py-3 bg-amber-600 rounded-lg font-medium text-white hover:bg-amber-700 transition-all"
                >
                  Experimente Agora
                  <ChevronLeft size={18} className="ml-2 rotate-180" />
                </Link>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                  <div className="h-64 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      Mapa interativo seria exibido aqui
                    </div>
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-white rounded-lg shadow-md p-2 flex items-center">
                        <Search size={16} className="text-gray-400 mr-2" />
                        <input type="text" placeholder="Pesquisar por local ou barbeiro" className="flex-1 text-sm outline-none" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <button aria-label="Usar localização atual" className="bg-white rounded-full p-2 shadow-md">
                        <MapPin size={16} className="text-amber-600" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">Barbeiros próximos a você</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                            <Scissors size={14} className="text-amber-600" />
                          </div>
                          <div className="ml-2">
                            <div className="text-sm font-medium">Barbearia Central</div>
                            <div className="text-xs text-gray-500">1.2 km • Av. Principal, 123</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm ml-1">4.8</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                            <Scissors size={14} className="text-amber-600" />
                          </div>
                          <div className="ml-2">
                            <div className="text-sm font-medium">Barber Shop Elite</div>
                            <div className="text-xs text-gray-500">2.3 km • Rua das Flores, 45</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm ml-1">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Encontre o Barbeiro Perfeito Hoje Mesmo!</h2>
            <p className="text-lg text-amber-100 mb-6 max-w-2xl mx-auto">
              Junte-se à milhares de pessoas que já encontraram o barbeiro ideal para seu estilo.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-amber-500/30 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">5.000+</div>
                  <div className="text-sm text-amber-200">Barbeiros cadastrados</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-amber-500/30 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">25.000+</div>
                  <div className="text-sm text-amber-200">Usuários ativos</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-amber-500/30 rounded-full flex items-center justify-center mr-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-amber-200">Taxa de satisfação</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/signup?feature=finder&plan=free" 
                className="px-8 py-3 bg-white text-amber-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Comece Agora
              </Link>
              <Link 
                to="/download?feature=finder" 
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

export default BarberFinder; 