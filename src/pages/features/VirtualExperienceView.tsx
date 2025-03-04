import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Smartphone, Camera, Sparkles, Scissors, CheckCircle } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const VirtualExperienceView = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="relative py-20 bg-gradient-to-b from-indigo-900 to-blue-900 overflow-hidden">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
                  <ChevronLeft size={16} className="mr-2" />
                  Voltar para Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Experiência Virtual <span className="text-blue-300">com Realidade Aumentada</span>
                </h1>
                <p className="text-lg text-blue-100 mb-8 max-w-lg">
                  Experimente cortes e estilos de barba virtualmente antes de ir à barbearia. Nossa tecnologia de realidade aumentada permite visualizar como você ficará com diferentes looks.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/signup?feature=virtual&plan=professional" 
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Experimente Agora
                  </Link>
                  <Link 
                    to="/pricing?highlight=virtual" 
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Ver Planos
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                  <div className="bg-gradient-to-br from-gray-900/80 to-blue-900/80 backdrop-blur-sm border border-white/10 p-2 rounded-xl shadow-2xl">
                    <img 
                      src="/images/hairstyle-3d-1.jpg" 
                      alt="BarberMatch Virtual Experience Preview" 
                      className="rounded-lg w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Como Funciona</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nossa tecnologia de ponta permite que você visualize cortes e estilos antes de realizar o procedimento.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Camera size={32} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Capture sua Imagem</h3>
                <p className="text-gray-600">
                  Tire uma selfie ou faça upload de uma foto frontal para começar a experiência.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Scissors size={32} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Escolha o Estilo</h3>
                <p className="text-gray-600">
                  Navegue por centenas de cortes e estilos de barba organizados por categorias.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Sparkles size={32} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Visualize o Resultado</h3>
                <p className="text-gray-600">
                  Veja como os diferentes estilos ficam em você em tempo real com precisão.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para Experimentar?</h2>
            <p className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
              Experimente agora mesmo e descubra o estilo perfeito para você antes mesmo de sentar na cadeira do barbeiro.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mr-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-sm text-blue-200">Estilos para experimentar</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mr-4">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-blue-200">Precisão do mapeamento facial</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mr-4">
                  <Scissors className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">75%</div>
                  <div className="text-sm text-blue-200">Maior satisfação com resultados</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/signup?feature=virtual&plan=basic" 
                className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Comece Agora
              </Link>
              <Link 
                to="/download?feature=virtual" 
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

export default VirtualExperienceView; 