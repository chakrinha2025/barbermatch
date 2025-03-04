import React from 'react';
// ... existing imports ...

// Adicionar imports necessários
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  BrainCircuit, 
  Sparkles, 
  Target, 
  Users, 
  Lightbulb,
  ArrowRight,
  Award,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Conteúdo existente... */}
      
      {/* Nova seção de Análise de Tendências */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Transforme seu Negócio com Análise de Tendências
              </h2>
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
                Descubra o que está bombando no mundo da barbearia e adapte seu negócio com insights baseados em IA.
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="border border-gray-200 bg-white rounded-xl p-6 shadow-xl relative">
                <img 
                  src="/images/barbershop-dashboard-preview.jpg" 
                  alt="BarberMatch Trend Analyzer" 
                  className="rounded-lg w-full object-cover border border-gray-100 shadow-sm" 
                />
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs py-1 px-3 rounded-full font-medium">
                  Premium
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Análise de Tendências Impulsionada por IA</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-indigo-100 p-2 rounded-lg">
                    <TrendingUp size={18} className="text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">Tendências em Alta</h4>
                    <p className="text-gray-600">Descubra os cortes, estilos e técnicas mais populares nas redes sociais.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-purple-100 p-2 rounded-lg">
                    <BrainCircuit size={18} className="text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">Inteligência Artificial</h4>
                    <p className="text-gray-600">Análises baseadas em IA para prever tendências antes que se tornem mainstream.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-pink-100 p-2 rounded-lg">
                    <Lightbulb size={18} className="text-pink-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">Insights Acionáveis</h4>
                    <p className="text-gray-600">Recomendações personalizadas para o seu negócio com base nos dados analisados.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/features/trend-analyzer" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all hover:shadow-lg"
                >
                  Conheça o Analisador de Tendências
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            
            <div className="text-center mb-10 relative">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Por que os Barbeiros Amam Nossa Análise de Tendências</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">Funcionalidades projetadas para impulsionar seu negócio e manter você à frente da concorrência</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-gray-100"
              >
                <div className="bg-white w-12 h-12 rounded-lg shadow-sm flex items-center justify-center mb-4">
                  <Target size={24} className="text-indigo-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Identificação de Público</h4>
                <p className="text-gray-600">Entenda exatamente que tipo de cliente está procurando por serviços como os seus.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-gray-100"
              >
                <div className="bg-white w-12 h-12 rounded-lg shadow-sm flex items-center justify-center mb-4">
                  <BarChart3 size={24} className="text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Análise de Crescimento</h4>
                <p className="text-gray-600">Acompanhe a performance e o potencial de crescimento de cada tendência ao longo do tempo.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-pink-50 to-orange-50 p-6 rounded-xl border border-gray-100"
              >
                <div className="bg-white w-12 h-12 rounded-lg shadow-sm flex items-center justify-center mb-4">
                  <Sparkles size={24} className="text-pink-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Ideias de Conteúdo</h4>
                <p className="text-gray-600">Receba sugestões de conteúdo personalizado para suas redes sociais baseadas nas tendências.</p>
              </motion.div>
            </div>
            
            <div className="mt-12 text-center">
              <div className="inline-flex items-center py-2 px-4 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-6">
                <Award size={16} className="mr-2" />
                Exclusivo para Assinantes
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center text-gray-700">
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span>Atualizações em tempo real</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span>Insights personalizados</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span>Exportação de relatórios</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span>Recomendações de IA</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/pricing" 
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-all"
            >
              Ver Planos e Preços
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Fim da nova seção - Resto do conteúdo existente continua abaixo */}
      
      {/* Seção de métricas */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Resultados Comprovados</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Nossos barbeiros relatam crescimento significativo após começarem a usar o Analisador de Tendências da BarberMatch
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur p-6 rounded-lg"
            >
              <div className="text-4xl font-bold text-purple-400 mb-2">+67%</div>
              <p className="text-gray-300">Aumento médio em clientes novos</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur p-6 rounded-lg"
            >
              <div className="text-4xl font-bold text-indigo-400 mb-2">+43%</div>
              <p className="text-gray-300">Aumento em engajamento nas redes sociais</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur p-6 rounded-lg"
            >
              <div className="text-4xl font-bold text-pink-400 mb-2">85%</div>
              <p className="text-gray-300">Dos barbeiros relatam aumento no faturamento</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur p-6 rounded-lg"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">+2.8x</div>
              <p className="text-gray-300">Crescimento médio em interações com clientes</p>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-white hover:bg-gray-800 transition-all"
            >
              Ver histórias de sucesso
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Seção de depoimentos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">O Que Nossos Barbeiros Dizem</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Profissionais de todo o Brasil estão transformando seus negócios com o Analisador de Tendências da BarberMatch
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-indigo-50 p-8 rounded-xl border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <img 
                  src="/images/avatar-1.jpg" 
                  alt="Marcelo Santos" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Marcelo Santos</h4>
                  <p className="text-gray-500 text-sm">Barber Shop Elite, São Paulo</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "O Analisador de Tendências mudou completamente meu negócio. Em apenas 3 meses, aumentei minha clientela em 70% porque estou sempre à frente das tendências. Vale cada centavo!"
              </p>
              <div className="flex mt-4 text-yellow-500">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-purple-50 p-8 rounded-xl border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <img 
                  src="/images/avatar-2.jpg" 
                  alt="André Oliveira" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-200"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">André Oliveira</h4>
                  <p className="text-gray-500 text-sm">Barba & Cabelo, Rio de Janeiro</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Os insights de IA são impressionantes! Consegui identificar tendências antes dos meus concorrentes e isso transformou meu Instagram. Hoje tenho 5x mais seguidores e clientes fiéis."
              </p>
              <div className="flex mt-4 text-yellow-500">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-pink-50 p-8 rounded-xl border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <img 
                  src="/images/avatar-3.jpg" 
                  alt="Carlos Mendes" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-pink-200"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Carlos Mendes</h4>
                  <p className="text-gray-500 text-sm">Barbearia Vintage, Belo Horizonte</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As ideias de conteúdo que o sistema gera economizam horas do meu trabalho de marketing. E o melhor: a análise demográfica me ajudou a entender exatamente quem são meus clientes ideais."
              </p>
              <div className="flex mt-4 text-yellow-500">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/signup" 
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
            >
              Comece Agora Gratuitamente
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home; 