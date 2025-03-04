import { useState, useEffect, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import { FeatureCard } from '@/components/FeatureCard';
import { VirtualTryOnTool } from '@/components/VirtualTryOnTool';
import { BarberCard } from '@/components/BarberCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Scissors, 
  Calendar, 
  MapPin, 
  Clock,
  MessageSquare,
  Sparkles,
  Download,
  ArrowRight,
  ChevronRight,
  Info,
  FileText,
  Shield,
  Star,
  Users,
  Award,
  TrendingUp,
  Store
} from 'lucide-react';

const BARBERS = [
  { name: "Alex Martin", specialty: "Degradês & Cortes Clássicos", rating: 4.9, reviewCount: 324, imageIndex: 1 },
  { name: "Marcus Johnson", specialty: "Estilização de Barba", rating: 4.7, reviewCount: 221, imageIndex: 2 },
  { name: "Ryan Garcia", specialty: "Estilos Modernos", rating: 4.8, reviewCount: 189, imageIndex: 3 },
  { name: "David Wilson", specialty: "Cortes Vintage", rating: 4.6, reviewCount: 156, imageIndex: 4 },
];

const STATISTICS = [
  { value: "25.000+", label: "Usuários Ativos", icon: <Users className="w-5 h-5 text-primary" /> },
  { value: "4.8", label: "Avaliação Média", icon: <Star className="w-5 h-5 text-primary" /> },
  { value: "1.500+", label: "Barbeiros Parceiros", icon: <Scissors className="w-5 h-5 text-primary" /> },
  { value: "98%", label: "Clientes Satisfeitos", icon: <Award className="w-5 h-5 text-primary" /> },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const statsRef = useRef(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  // Efeito para animação
  useEffect(() => {
    setIsLoaded(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Variantes para animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-secondary/30 via-background to-secondary/30" ref={statsRef}>
          <div className="container-tight">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial="hidden"
              animate={isStatsVisible ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {STATISTICS.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-premium flex flex-col items-center text-center hover:shadow-premium-hover transform hover:-translate-y-1 transition-all border border-primary/5"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="section-padding bg-gradient-radial from-background to-secondary/20">
          <div className="container-tight">
            <div className="text-center mb-16">
              <div className="mb-3 inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles size={14} className="mr-2" />
                Recursos Inteligentes
              </div>
              <h2 className="heading-2 mb-4">Recursos <span className="text-gradient">Exclusivos</span> da Plataforma</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Explore os recursos inovadores que fazem do BarberMatch a melhor plataforma para agendamento de barbearia
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link to="/recursos/experiencia-virtual" className="block transform transition-all duration-300 hover:scale-102">
                <FeatureCard
                  title="Recomendações de Estilo por IA"
                  description="Receba sugestões de corte personalizadas com base no formato do seu rosto e preferências"
                  icon={<Scissors className="w-6 h-6 text-primary" />}
                  delay={100}
                />
              </Link>
              
              <Link to="/recursos/agendamento" className="block transform transition-all duration-300 hover:scale-102">
                <FeatureCard
                  title="Agendamento Inteligente"
                  description="Marque horários que se encaixam perfeitamente na sua agenda e receba lembretes automáticos"
                  icon={<Calendar className="w-6 h-6 text-primary" />}
                  delay={200}
                />
              </Link>
              
              <Link to="/recursos/analise-tendencias" className="block transform transition-all duration-300 hover:scale-102">
                <FeatureCard
                  title="Análise de Tendências"
                  description="Descubra o que está bombando no mundo da barbearia com insights baseados em IA"
                  icon={<TrendingUp className="w-6 h-6 text-primary" />}
                  delay={300}
                  className="bg-gradient-to-br from-purple-50/30 to-indigo-50/10 dark:from-purple-950/20 dark:to-indigo-950/10"
                />
              </Link>
              
              <Link to="/recursos/experiencia-virtual" className="block transform transition-all duration-300 hover:scale-102">
                <FeatureCard
                  title="Tecnologia de RA"
                  description="Pré-visualize cortes em você mesmo antes do seu agendamento, com realidade aumentada"
                  icon={<Sparkles className="w-6 h-6 text-primary" />}
                  delay={400}
                />
              </Link>
              
              <Link to="/recursos/agendamento" className="block transform transition-all duration-300 hover:scale-102">
                <FeatureCard
                  title="Descoberta de Barbeiros"
                  description="Encontre barbeiros bem avaliados na sua região com as habilidades que você precisa"
                  icon={<MapPin className="w-6 h-6 text-primary" />}
                  delay={500}
                />
              </Link>
              
              <Link to="/recursos/gestao-negocio" className="block transform transition-all duration-300 hover:scale-102">
                <FeatureCard
                  title="Gestão de Negócio"
                  description="Controle completo da sua barbearia com estatísticas, agendamentos e relatórios em tempo real"
                  icon={<Store className="w-6 h-6 text-primary" />}
                  delay={600}
                  className="bg-gradient-to-br from-blue-50/30 to-gray-50/10 dark:from-blue-950/20 dark:to-gray-950/10"
                />
              </Link>
            </div>
            
            <div className="flex justify-center mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link 
                    to="/recursos/analise-tendencias" 
                    className="group relative overflow-hidden bg-white dark:bg-white/10 text-primary dark:text-primary-foreground px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-all border border-primary/10"
                  >
                    <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <TrendingUp className="w-5 h-5 relative z-10" /> 
                    <span className="relative z-10">Análise de Tendências</span>
                  </Link>
                  <Link 
                    to="/recursos/gestao-negocio" 
                    className="group relative overflow-hidden bg-white dark:bg-white/10 text-primary dark:text-primary-foreground px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-all border border-primary/10"
                  >
                    <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <Store className="w-5 h-5 relative z-10" /> 
                    <span className="relative z-10">Gestão de Negócio</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Soluções para Donos de Barbearias */}
        <section id="barbershop-owners" className="py-24 bg-gradient-to-r from-primary/10 via-background to-primary/10">
          <div className="container-tight">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="mb-3 inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Store size={14} className="mr-2" />
                  Para Donos de Barbearias
                </div>
                <h2 className="heading-2">Dashboard <span className="text-gradient">Premium</span> para sua Barbearia</h2>
                <p className="text-lg text-muted-foreground">
                  Tenha controle total sobre sua barbearia com nossa solução completa de gerenciamento.
                  Monitore desempenho, gerencie funcionários e aumente seus lucros.
                </p>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <TrendingUp size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Análises detalhadas</h3>
                      <p className="text-muted-foreground">Visualize dados financeiros, agendamentos e desempenho de funcionários em tempo real</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <Users size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Gestão de funcionários</h3>
                      <p className="text-muted-foreground">Adicione barbeiros e assistentes com diferentes níveis de permissão e comissões</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-2 mt-1">
                      <Calendar size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Agendamento inteligente</h3>
                      <p className="text-muted-foreground">Sistema completo de agendamentos com confirmações automáticas e gestão de disponibilidade</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
                  <Link
                    to="/barbershop-login"
                    className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 py-3 font-medium transition-colors"
                  >
                    Acessar Dashboard
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                  <Link
                    to="/barbershop-login?tab=register"
                    className="inline-flex items-center justify-center border border-input hover:bg-accent hover:text-accent-foreground rounded-md px-6 py-3 font-medium transition-colors"
                  >
                    Registrar Barbearia
                  </Link>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-2xl border border-border">
                <img 
                  src="/images/barbershop-dashboard-preview.jpg" 
                  alt="Dashboard para donos de barbearias" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/800x600?text=Dashboard+Preview";
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Virtual Try-On Tool Section */}
        <VirtualTryOnTool />
        
        {/* Barbers Section */}
        <section id="find-barbers" className="section-padding bg-gradient-to-b from-background to-secondary/20">
          <div className="container-tight">
            <div className="text-center mb-16">
              <div className="mb-3 inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Users size={14} className="mr-2" />
                Profissionais Premium
              </div>
              <h2 className="heading-2 mb-4">Barbeiros em <span className="text-gradient">Destaque</span></h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Conecte-se com profissionais qualificados que podem dar vida ao seu estilo
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {BARBERS.map((barber, index) => (
                <motion.div key={barber.name} variants={itemVariants}>
                  <BarberCard
                    name={barber.name}
                    specialty={barber.specialty}
                    rating={barber.rating}
                    reviewCount={barber.reviewCount}
                    imageIndex={barber.imageIndex}
                    delay={index * 100}
                  />
                </motion.div>
              ))}
            </motion.div>
            
            <div className="text-center mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link 
                  to="/login" 
                  className="relative overflow-hidden bg-primary text-white px-8 py-4 rounded-full font-medium inline-flex items-center gap-3 shadow-premium-hover hover:bg-primary/90 transition-all group"
                >
                  <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out rounded-full group-hover:w-full"></span>
                  <span className="relative z-10">Encontrar barbeiros próximos</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-primary/5">
          <div className="container-tight">
            <motion.div 
              className="max-w-3xl mx-auto bg-white dark:bg-white/5 p-8 md:p-12 rounded-2xl shadow-premium border border-primary/10 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute -top-5 -left-5 text-primary text-opacity-20 dark:text-opacity-10">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.96.41-3.03.341-1.06.86-2.094 1.563-3.099l-1.45-.725c-1.87 2.025-2.805 3.667-2.805 4.93 0 1.52.451 2.745 1.352 3.673.901.932 2.117 1.397 3.647 1.397.093 0 .174-.003.244-.01zm7.5 0c0-.88-.23-1.618-.69-2.217-.326-.42-.775-.69-1.344-.812-.551-.132-1.064-.142-1.54-.028-.156-.95.095-1.96.405-3.03.341-1.06.86-2.094 1.563-3.099l-1.45-.725c-1.86 2.022-2.797 3.664-2.807 4.93.01 1.52.451 2.74 1.352 3.673.901.932 2.117 1.397 3.647 1.397.093 0 .174-.003.244-.01z"></path>
                </svg>
              </div>
              
              <p className="text-lg md:text-xl mb-6 text-muted-foreground">
                "O BarberMatch transformou completamente minha experiência com barbearias. Agora posso experimentar cortes virtualmente antes de me comprometer e encontrar os melhores profissionais da região com facilidade!"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary mr-4 overflow-hidden">
                  <img src="/images/testimonial-1.jpg" alt="Cliente" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">Ricardo Oliveira</h4>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <span className="text-sm text-muted-foreground ml-2">Cliente desde 2022</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Download Section */}
        <section className="section-padding bg-gradient-to-tr from-secondary/30 via-background to-primary/10">
          <div className="container-tight">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                  <TrendingUp size={14} className="mr-2" />
                  Tendência em 2023
                </div>
                <h2 className="heading-2 mb-4">Baixe o Aplicativo <span className="text-gradient">BarberMatch</span></h2>
                <p className="sub-heading">
                  Tenha a melhor experiência de barbearia com nosso aplicativo. Disponível para iOS e Android.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/download" 
                    className="group relative overflow-hidden bg-primary text-white px-8 py-4 rounded-full font-medium inline-flex items-center gap-3 shadow-premium-hover hover:bg-primary/90 transition-all"
                  >
                    <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out rounded-full group-hover:w-full"></span>
                    <Download className="w-5 h-5 relative z-10" /> 
                    <span className="relative z-10">Baixar Agora</span>
                  </Link>
                  
                  <Link 
                    to="/about" 
                    className="group relative overflow-hidden bg-white/80 dark:bg-white/10 px-8 py-4 rounded-full font-medium inline-flex items-center gap-3 hover:bg-white dark:hover:bg-white/20 transition-colors border border-primary/10"
                  >
                    <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 ease-out group-hover:w-full"></span>
                    <Info className="w-5 h-5 relative z-10" /> 
                    <span className="relative z-10">Conhecer mais</span>
                  </Link>
                </div>
                
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-3">Disponível na App Store e Google Play</p>
                  <div className="flex flex-wrap gap-4">
                    <img src="/images/app-store-badge.png" alt="App Store" className="h-10 w-auto" />
                    <img src="/images/google-play-badge.png" alt="Google Play" className="h-10 w-auto" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -inset-6 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
                  <div className="relative z-10 transform hover:rotate-2 hover:scale-105 transition-all duration-500">
                    <img 
                      src="/images/app-preview.png" 
                      alt="App BarberMatch" 
                      className="max-w-[280px] md:max-w-[320px] drop-shadow-2xl"
                    />
                    <div className="absolute -top-4 -right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      NEW
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Legal Links Section */}
        <section className="py-12 bg-background">
          <div className="container-tight">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }}>
                <Link 
                  to="/terms" 
                  className="flex items-center p-6 rounded-xl border border-border hover:border-primary/20 hover:bg-muted/30 transition-all duration-300 group"
                >
                  <div className="mr-5 p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">Termos de Serviço</h3>
                    <p className="text-sm text-muted-foreground">Acesse nossos termos e condições</p>
                  </div>
                  <ChevronRight className="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
              
              <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }}>
                <Link 
                  to="/privacy" 
                  className="flex items-center p-6 rounded-xl border border-border hover:border-primary/20 hover:bg-muted/30 transition-all duration-300 group"
                >
                  <div className="mr-5 p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                    <Shield size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">Política de Privacidade</h3>
                    <p className="text-sm text-muted-foreground">Como protegemos seus dados</p>
                  </div>
                  <ChevronRight className="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
              
              <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }}>
                <Link 
                  to="/cookies" 
                  className="flex items-center p-6 rounded-xl border border-border hover:border-primary/20 hover:bg-muted/30 transition-all duration-300 group"
                >
                  <div className="mr-5 p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">Política de Cookies</h3>
                    <p className="text-sm text-muted-foreground">Informações sobre cookies</p>
                  </div>
                  <ChevronRight className="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
