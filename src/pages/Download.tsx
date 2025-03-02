
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animationClasses } from '@/lib/animations';
import { 
  Download as DownloadIcon, 
  ArrowRight, 
  Smartphone, 
  Shield, 
  Star, 
  CheckCircle 
} from 'lucide-react';

const Download = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios'>('android');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-white">
          <div className="container-tight">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`text-center lg:text-left ${animationClasses.fadeIn}`}>
                <h1 className="heading-1 mb-6">
                  Baixe o BarberMatch e transforme sua experiência de barbearia
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Experimente virtualmente novos cortes, encontre os melhores barbeiros e agende com facilidade.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button
                    className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors ${
                      selectedPlatform === 'android' 
                        ? 'bg-white text-primary' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    onClick={() => setSelectedPlatform('android')}
                  >
                    <span className="font-medium">Android</span>
                  </button>
                  <button
                    className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors ${
                      selectedPlatform === 'ios' 
                        ? 'bg-white text-primary' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    onClick={() => setSelectedPlatform('ios')}
                  >
                    <span className="font-medium">iOS</span>
                  </button>
                </div>
              </div>
              
              <div className={`${animationClasses.fadeIn}`} style={{ animationDelay: '200ms' }}>
                <div className="aspect-[3/5] bg-white/10 rounded-3xl overflow-hidden relative mx-auto max-w-xs">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Smartphone className="mx-auto mb-4 text-white/70 w-16 h-16" />
                      <h3 className="text-xl font-medium mb-2">BarberMatch App</h3>
                      <p className="text-white/70 mb-6">Versão 1.0.0</p>
                      
                      <button className="bg-white text-primary px-6 py-3 rounded-full flex items-center gap-2 mx-auto hover:bg-white/90 transition-colors">
                        <DownloadIcon className="w-5 h-5" />
                        <span className="font-medium">
                          {selectedPlatform === 'android' ? 'Baixar APK' : 'App Store'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">O que você terá no aplicativo</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Explore os recursos exclusivos disponíveis apenas no aplicativo móvel do BarberMatch
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className={`glass p-6 rounded-2xl ${animationClasses.fadeIn}`} style={{ animationDelay: '100ms' }}>
                <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Experiência Nativa</h3>
                <p className="text-muted-foreground">
                  Interface otimizada para celular com acesso rápido a todas as funcionalidades
                </p>
              </div>
              
              <div className={`glass p-6 rounded-2xl ${animationClasses.fadeIn}`} style={{ animationDelay: '200ms' }}>
                <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pagamentos Seguros</h3>
                <p className="text-muted-foreground">
                  Faça pagamentos diretamente pelo app com total segurança e facilidade
                </p>
              </div>
              
              <div className={`glass p-6 rounded-2xl ${animationClasses.fadeIn}`} style={{ animationDelay: '300ms' }}>
                <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Acesso Premium</h3>
                <p className="text-muted-foreground">
                  Recursos exclusivos como realidade aumentada e análise facial avançada
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How to Install Section */}
        <section className="section-padding bg-secondary/50">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Como Instalar</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Siga os passos abaixo para instalar o BarberMatch no seu dispositivo
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {selectedPlatform === 'android' ? (
                <div className="space-y-8">
                  <div className={`flex gap-6 items-start ${animationClasses.fadeIn}`}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Baixe o APK</h3>
                      <p className="text-muted-foreground mb-3">
                        Clique no botão de download acima para baixar o arquivo APK do BarberMatch.
                      </p>
                      <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                        <DownloadIcon className="w-4 h-4" />
                        <span>Baixar BarberMatch.apk</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className={`flex gap-6 items-start ${animationClasses.fadeIn}`} style={{ animationDelay: '100ms' }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Permita a instalação</h3>
                      <p className="text-muted-foreground">
                        Acesse as configurações do seu dispositivo e permita a instalação de aplicativos de fontes desconhecidas.
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex gap-6 items-start ${animationClasses.fadeIn}`} style={{ animationDelay: '200ms' }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Instale o aplicativo</h3>
                      <p className="text-muted-foreground">
                        Abra o arquivo APK baixado e siga as instruções na tela para concluir a instalação.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className={`flex gap-6 items-start ${animationClasses.fadeIn}`}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Abra a App Store</h3>
                      <p className="text-muted-foreground">
                        No seu dispositivo iOS, acesse a App Store para baixar o aplicativo BarberMatch.
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex gap-6 items-start ${animationClasses.fadeIn}`} style={{ animationDelay: '100ms' }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Busque por BarberMatch</h3>
                      <p className="text-muted-foreground">
                        Use a barra de pesquisa para encontrar o aplicativo BarberMatch na App Store.
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex gap-6 items-start ${animationClasses.fadeIn}`} style={{ animationDelay: '200ms' }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Baixe e instale</h3>
                      <p className="text-muted-foreground">
                        Toque no botão "Obter" e siga as instruções para baixar e instalar o aplicativo.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-primary text-white">
          <div className="container text-center">
            <div className={`max-w-3xl mx-auto ${animationClasses.fadeIn}`}>
              <h2 className="heading-2 mb-6">Pronto para revolucionar sua experiência de barbearia?</h2>
              <p className="text-xl text-white/80 mb-8">
                Baixe o BarberMatch agora e descubra como a tecnologia pode transformar o jeito como você cuida do seu visual
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-primary rounded-full flex items-center gap-2 hover:bg-white/90 transition-colors">
                  <DownloadIcon className="w-5 h-5" />
                  <span className="font-medium">Baixar Agora</span>
                </button>
                <a href="#" className="px-8 py-4 bg-white/10 text-white rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors">
                  <span className="font-medium">Saiba Mais</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Download;
