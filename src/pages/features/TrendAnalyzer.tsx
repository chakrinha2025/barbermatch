import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  BrainCircuit, 
  ArrowRight, 
  ChevronLeft,
  Sparkles,
  Target,
  Calendar,
  Users,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const TrendAnalyzer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-purple-900 to-indigo-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
                  <ChevronLeft size={16} className="mr-2" />
                  Voltar para Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Análise de Tendências <span className="text-purple-300">Impulsionada por IA</span>
                </h1>
                <p className="text-lg text-purple-100 mb-8 max-w-lg">
                  Descubra o que está bombando no mundo da barbearia e adapte seu negócio com insights poderosos baseados em IA para se manter à frente da concorrência.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/signup?feature=trends&plan=professional" 
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Teste Gratuitamente
                  </Link>
                  <Link 
                    to="/pricing?highlight=trends" 
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Ver Planos
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                  <div className="bg-gradient-to-br from-gray-900/80 to-indigo-900/80 backdrop-blur-sm border border-white/10 p-2 rounded-xl shadow-2xl">
                    <img 
                      src="/images/barbershop-dashboard-preview.jpg" 
                      alt="BarberMatch Trend Analyzer Dashboard" 
                      className="rounded-lg w-full"
                    />
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
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1.5 rounded-full">Recursos Exclusivos</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900">O Que Nosso Analisador de Tendências Oferece</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Transforme dados em oportunidades com nosso poderoso sistema de análise de tendências, projetado especificamente para barbeiros e barbearias.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp size={24} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Tendências em Tempo Real</h3>
                <p className="text-gray-600 mb-4">
                  Monitoramento constante das tendências mais populares em plataformas como Instagram, TikTok e YouTube.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Análise de hashtags populares</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Classificação por categoria</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Exemplos reais de sucesso</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BrainCircuit size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Inteligência Artificial</h3>
                <p className="text-gray-600 mb-4">
                  Algoritmos avançados que analisam e preveem tendências antes que se tornem mainstream.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Previsão de crescimento</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Pontuação de relevância</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Análise de sazonalidade</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb size={24} className="text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Insights Acionáveis</h3>
                <p className="text-gray-600 mb-4">
                  Recomendações personalizadas para o seu negócio com base nos dados analisados.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Ideias de conteúdo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Melhores horários para publicação</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Sugestões de implementação</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Demo Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-1.5 rounded-full">Demonstração</span>
                <h2 className="text-3xl font-bold mt-4 mb-6 text-gray-900">Veja Como Funciona</h2>
                <p className="text-gray-600 mb-6">
                  Nosso sistema analisa milhões de posts em redes sociais para identificar tendências emergentes em cortes de cabelo, estilos de barba, produtos e técnicas.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-indigo-100 p-2 rounded-lg">
                      <Target size={18} className="text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-800">Identificação de Público</h4>
                      <p className="text-gray-600">Análise demográfica detalhada para entender quem são os clientes interessados em cada tendência.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-purple-100 p-2 rounded-lg">
                      <Calendar size={18} className="text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-800">Timing Perfeito</h4>
                      <p className="text-gray-600">Descubra o momento ideal para implementar novas tendências e maximizar seu impacto.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-pink-100 p-2 rounded-lg">
                      <Sparkles size={18} className="text-pink-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-800">Conteúdo que Converte</h4>
                      <p className="text-gray-600">Sugestões de conteúdo para suas redes sociais que atraem novos clientes e fidelizam os atuais.</p>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/login?feature=trends&demo=true" 
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 rounded-lg font-medium text-white hover:bg-indigo-700 transition-all"
                >
                  Ver Demonstração Interativa
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Preview do Dashboard</h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <TrendingUp size={18} className="text-green-500 mr-2" />
                            <span className="font-medium">Fade Texturizado</span>
                          </div>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">+64% crescimento</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full width-dynamic-64"></div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <TrendingUp size={18} className="text-yellow-500 mr-2" />
                            <span className="font-medium">Barba Escandinava</span>
                          </div>
                          <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">+42% crescimento</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full width-dynamic-42"></div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <TrendingUp size={18} className="text-purple-500 mr-2" />
                            <span className="font-medium">Mullet Moderno</span>
                          </div>
                          <span className="text-sm bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">+38% crescimento</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full width-dynamic-38"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Ver mais tendências
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para Revolucionar Seu Negócio?</h2>
            <p className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de barbeiros que já estão usando o BarberMatch para impulsionar seus negócios com análises de tendências baseadas em IA.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">+67%</div>
                  <div className="text-sm text-indigo-200">Aumento médio em clientes</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center mr-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">2 semanas</div>
                  <div className="text-sm text-indigo-200">Previsão antecipada de tendências</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center mr-4">
                  <BrainCircuit className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm text-indigo-200">Precisão nas previsões da IA</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/pricing?highlight=trends" 
                className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Ver Planos e Preços
              </Link>
              <Link 
                to="/contact?about=trends" 
                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Fale Conosco
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrendAnalyzer; 