
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { FeatureCard } from '@/components/FeatureCard';
import { ARPreview } from '@/components/ARPreview';
import { BarberCard } from '@/components/BarberCard';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { 
  Scissors, 
  Calendar, 
  MapPin, 
  Clock,
  MessageSquare,
  Sparkles,
  Download,
  ArrowRight
} from 'lucide-react';

const BARBERS = [
  { name: "Alex Martin", specialty: "Degradês & Cortes Clássicos", rating: 4.9, reviewCount: 324, imageIndex: 1 },
  { name: "Marcus Johnson", specialty: "Estilização de Barba", rating: 4.7, reviewCount: 221, imageIndex: 2 },
  { name: "Ryan Garcia", specialty: "Estilos Modernos", rating: 4.8, reviewCount: 189, imageIndex: 3 },
  { name: "David Wilson", specialty: "Cortes Vintage", rating: 4.6, reviewCount: 156, imageIndex: 4 },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Features Section */}
        <section id="features" className="section-padding">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Recursos do Aplicativo</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Explore os recursos inovadores que fazem do BarberMatch a melhor plataforma para agendamento de barbearia
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                title="Recomendações de Estilo por IA"
                description="Receba sugestões de corte personalizadas com base no formato do seu rosto e preferências"
                icon={<Scissors className="w-6 h-6" />}
                delay={100}
              />
              <FeatureCard
                title="Agendamento Inteligente"
                description="Marque horários que se encaixam perfeitamente na sua agenda"
                icon={<Calendar className="w-6 h-6" />}
                delay={200}
              />
              <FeatureCard
                title="Descoberta de Barbeiros"
                description="Encontre barbeiros bem avaliados na sua região com as habilidades que você precisa"
                icon={<MapPin className="w-6 h-6" />}
                delay={300}
              />
              <FeatureCard
                title="Previsão de Tempo de Espera"
                description="Saiba exatamente quanto tempo seu agendamento levará"
                icon={<Clock className="w-6 h-6" />}
                delay={400}
              />
              <FeatureCard
                title="Chat no Aplicativo"
                description="Converse diretamente com seu barbeiro para resultados perfeitos"
                icon={<MessageSquare className="w-6 h-6" />}
                delay={500}
              />
              <FeatureCard
                title="Tecnologia de RA"
                description="Pré-visualize cortes em você mesmo antes do seu agendamento"
                icon={<Sparkles className="w-6 h-6" />}
                delay={600}
              />
            </div>
          </div>
        </section>
        
        {/* AR Preview Section */}
        <ARPreview />
        
        {/* Barbers Section */}
        <section id="find-barbers" className="section-padding">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Barbeiros em Destaque</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Conecte-se com profissionais qualificados que podem dar vida ao seu estilo
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BARBERS.map((barber, index) => (
                <BarberCard
                  key={barber.name}
                  name={barber.name}
                  specialty={barber.specialty}
                  rating={barber.rating}
                  reviewCount={barber.reviewCount}
                  imageIndex={barber.imageIndex}
                  delay={index * 100}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a
                href="#"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Ver todos os barbeiros <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Download Section */}
        <section id="download" className="section-padding bg-primary text-white">
          <div className="container text-center">
            <h2 className="heading-2 mb-4">Baixe o BarberMatch</h2>
            <p className="sub-heading text-white/80 max-w-xl mx-auto mb-8">
              Obtenha o aplicativo agora e transforme sua experiência de barbearia
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/download"
                className="px-6 py-3 bg-white text-primary rounded-full flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span className="font-medium">Saiba Mais</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
