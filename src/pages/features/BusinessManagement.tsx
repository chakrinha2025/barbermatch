import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  BarChart, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ClipboardList, 
  LineChart,
  CheckCircle
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BusinessManagement = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="relative py-20 bg-gradient-to-b from-gray-900 to-blue-900 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
                  <ChevronLeft size={16} className="mr-2" />
                  Voltar para Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Gestão de <span className="text-blue-300">Negócio</span>
                </h1>
                <p className="text-lg text-blue-100 mb-8 max-w-lg">
                  Ferramentas completas para administrar sua barbearia com eficiência, desde controle financeiro até gestão de estoque e equipe.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/signup" 
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
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
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-white">Painel de Controle</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <DollarSign size={18} className="text-green-400 mr-2" />
                          <span className="text-white font-medium">Faturamento</span>
                        </div>
                        <p className="text-2xl font-bold text-white">R$ 8.750</p>
                        <p className="text-green-400 text-sm flex items-center">
                          <span>↑ 12%</span>
                          <span className="text-white/60 ml-1">este mês</span>
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Users size={18} className="text-blue-400 mr-2" />
                          <span className="text-white font-medium">Clientes</span>
                        </div>
                        <p className="text-2xl font-bold text-white">243</p>
                        <p className="text-blue-400 text-sm flex items-center">
                          <span>↑ 8%</span>
                          <span className="text-white/60 ml-1">este mês</span>
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <ShoppingBag size={18} className="text-yellow-400 mr-2" />
                          <span className="text-white font-medium">Produtos</span>
                        </div>
                        <p className="text-2xl font-bold text-white">54</p>
                        <p className="text-yellow-400 text-sm flex items-center">
                          <span>5 produtos</span>
                          <span className="text-white/60 ml-1">em baixa</span>
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <ClipboardList size={18} className="text-purple-400 mr-2" />
                          <span className="text-white font-medium">Serviços</span>
                        </div>
                        <p className="text-2xl font-bold text-white">178</p>
                        <p className="text-purple-400 text-sm flex items-center">
                          <span>↑ 15%</span>
                          <span className="text-white/60 ml-1">este mês</span>
                        </p>
                      </div>
                    </div>
                    <div className="h-20 relative">
                      <div className="absolute inset-0 flex items-end">
                        <div className="h-30% w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-40% w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-60% w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-50% w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-70% w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-80% w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-90% w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-75% w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-85% w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-95% w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-full w-1/12 bg-blue-500 rounded-t"></div>
                        <div className="h-90% w-1/12 bg-blue-500 rounded-t"></div>
                      </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Funcionalidades de Gestão</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Um conjunto completo de ferramentas para otimizar a operação da sua barbearia.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Dashboards Analíticos</h3>
                <p className="text-gray-600 mb-4">
                  Acompanhe métricas e indicadores importantes do seu negócio em tempo real.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Faturamento e Lucro</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Clientes e Retenção</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Serviços Populares</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Gestão de Equipe</h3>
                <p className="text-gray-600 mb-4">
                  Controle de barbeiros, horários e desempenho com facilidade.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Controle de Comissões</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Escala de Trabalho</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Avaliação de Desempenho</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Controle de Estoque</h3>
                <p className="text-gray-600 mb-4">
                  Gestão de produtos de revenda e insumos para uso interno.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Alertas de Estoque Baixo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Gestão de Fornecedores</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Relatórios de Consumo</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Gestão Financeira</h3>
                <p className="text-gray-600 mb-4">
                  Controle financeiro completo com relatórios detalhados.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Controle de Despesas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Fluxo de Caixa</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">Relatórios de Lucratividade</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Administre sua Barbearia como um Profissional</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Tenha controle total do seu negócio, maximize seus lucros e otimize processos com nossa plataforma de gestão.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Começar Agora
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Agendar Demonstração
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessManagement; 