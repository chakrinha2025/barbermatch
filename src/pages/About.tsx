import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animationClasses } from '@/lib/animations';
import { ArrowRight, CheckCircle, Users, Code, Smartphone, Star, Mail, Linkedin, Twitter, Award, Sparkles, TrendingUp, Scissors } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState<'visao' | 'missao' | 'valores'>('missao');
  const [isInView, setIsInView] = useState(false);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => {
      if (teamRef.current) {
        observer.unobserve(teamRef.current);
      }
    };
  }, []);

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-tight">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles size={14} className="mr-2" />
                Nossa História
              </div>
              <h1 className={`heading-1 mb-4 ${animationClasses.fadeIn}`}>
                Sobre o <span className="text-gradient">BarberMatch</span>
              </h1>
              <p className={`sub-heading max-w-2xl mx-auto ${animationClasses.fadeInDelay100}`}>
                Conhecendo a visão e a equipe por trás do aplicativo que está transformando o setor de barbearias no Brasil
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`glass rounded-3xl overflow-hidden`}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-transparent to-primary/10 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="6 3 20 12 6 21"></polygon></svg>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex space-x-3">
                    {['visao', 'missao', 'valores'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as 'visao' | 'missao' | 'valores')}
                        className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${
                          activeTab === tab
                            ? 'bg-primary text-white shadow-lg scale-110'
                            : 'bg-white/80 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20'
                        }`}
                      >
                        {tab === 'visao' ? 'Visão' : tab === 'missao' ? 'Missão' : 'Valores'}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <div className="p-8 pt-12">
                {activeTab === 'missao' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-3">Nossa Missão</h2>
                    <p className="text-muted-foreground">
                      Transformar a experiência de barbearia através da tecnologia, conectando clientes a barbeiros talentosos enquanto oferecemos ferramentas inovadoras que beneficiam ambos os lados.
                    </p>
                  </motion.div>
                )}
                
                {activeTab === 'visao' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-3">Nossa Visão</h2>
                    <p className="text-muted-foreground">
                      Ser a plataforma líder em transformação digital no setor de barbearias, criando um ecossistema onde a tecnologia eleva o padrão de serviços e experiências, tornando a beleza masculina mais acessível e personalizada.
                    </p>
                  </motion.div>
                )}
                
                {activeTab === 'valores' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-3">Nossos Valores</h2>
                    <ul className="text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary mt-1 flex-shrink-0" size={16} />
                        <span>Inovação constante em todas as soluções</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary mt-1 flex-shrink-0" size={16} />
                        <span>Personalização como princípio em cada interação</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary mt-1 flex-shrink-0" size={16} />
                        <span>Transparência nas relações com clientes e parceiros</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary mt-1 flex-shrink-0" size={16} />
                        <span>Excelência na experiência do usuário</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* CEO Section - Taohan Batista */}
        <section className="section-padding bg-gradient-radial from-background to-primary/5">
          <div className="container-tight">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div 
                className="lg:col-span-5"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-1">
                    <div className="relative aspect-square rounded-2xl bg-gradient-to-r from-secondary/20 to-primary/20 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users size={64} className="text-primary/70" />
                        </div>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent"
                        animate={{ 
                          background: ["linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(var(--primary-rgb)/0.05) 50%, rgba(0,0,0,0) 100%)"],
                          backgroundPosition: ["0% 0%", "100% 100%"] 
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity, 
                          repeatType: "mirror" 
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: "radial-gradient(circle at 10% 20%, transparent 0, transparent 2px, rgba(var(--primary-rgb)/0.03) 3px, transparent 4px), radial-gradient(circle at 80% 40%, transparent 0, transparent 2px, rgba(var(--primary-rgb)/0.05) 3px, transparent 4px), radial-gradient(circle at 40% 70%, transparent 0, transparent 2px, rgba(var(--primary-rgb)/0.04) 3px, transparent 4px)"
                        }}
                      />
                    </div>
                  </div>
                  
                  <motion.div 
                    className="absolute -bottom-6 -right-6"
                    animate={{ y: [0, -5, 0], rotate: [2, 3, 2] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                  >
                    <div className="bg-primary/95 text-white px-6 py-3 rounded-lg shadow-premium rotate-2">
                      <span className="text-sm font-medium">Fundado em 2023</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:col-span-7"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.div 
                  className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary-rgb)/0.15)" }}
                >
                  <Award size={14} className="mr-2" />
                  <motion.span
                    animate={{ opacity: [1, 0.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Fundador Visionário
                  </motion.span>
                </motion.div>
                
                <h2 className="heading-2 mb-6">
                  Conheça <span className="text-gradient relative">
                    Taohan Batista
                    <motion.span 
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" 
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </span>
                </h2>
                
                <div className="text-lg mb-6 space-y-4 text-muted-foreground">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    CEO e fundador do BarberMatch, Taohan mantém sua identidade reservada, mas sua visão é clara: identificar e atender necessidades reais do mercado através da tecnologia.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Com uma sólida formação em Ciência da Computação e especialização em Inteligência Artificial, sua missão para o BarberMatch nasceu da identificação de lacunas no setor de barbearias que poderiam ser preenchidas com soluções tecnológicas inovadoras.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="relative"
                  >
                    <span className="absolute -left-4 top-0 text-3xl text-primary/20">"</span>
                    O anonimato me permite focar inteiramente na criação de soluções eficazes sem distrações. Minha visão é clara: revolucionar o setor de barbearias com tecnologia que realmente compreende e resolve problemas reais, tanto para clientes quanto para profissionais.
                    <span className="absolute -right-4 bottom-0 text-3xl text-primary/20">"</span>
                  </motion.p>
                </div>
                
                <div className="flex space-x-4 mt-8">
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5, boxShadow: "0 0 15px rgba(var(--primary-rgb)/0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5, boxShadow: "0 0 15px rgba(var(--primary-rgb)/0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter size={18} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5, boxShadow: "0 0 15px rgba(var(--primary-rgb)/0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={18} />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Collaborator Section - Thales Batista */}
        <section className="section-padding bg-gradient-to-r from-primary/5 via-background to-secondary/5">
          <div className="container-tight">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div 
                className="lg:col-span-7 order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.div 
                  className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--secondary-rgb)/0.15)" }}
                >
                  <Sparkles size={14} className="mr-2" />
                  <motion.span
                    animate={{ opacity: [1, 0.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Colaborador em Marketing e Criação
                  </motion.span>
                </motion.div>
                
                <h2 className="heading-2 mb-6">
                  <span className="text-gradient-secondary relative">
                    Thales Batista
                    <motion.span 
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" 
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </span>
                </h2>
                
                <div className="text-lg mb-6 space-y-4 text-muted-foreground">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Designer e especialista em marketing digital, Thales traz sua expertise criativa para a equipe do BarberMatch, complementando a visão técnica com um olhar cuidadoso para a experiência estética e comunicação da marca.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Com formação em Design Gráfico e pós-graduação em Marketing Digital, ele transforma conceitos técnicos em experiências visuais envolventes que conectam a plataforma com seus usuários de forma intuitiva e impactante.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="relative"
                  >
                    <span className="absolute -left-4 top-0 text-3xl text-secondary/20">"</span>
                    Meu objetivo é garantir que a experiência do BarberMatch não seja apenas funcional, mas também visualmente impactante e emocionalmente conectada com nossos usuários. Cada elemento visual conta uma história e reforça nossa missão.
                    <span className="absolute -right-4 bottom-0 text-3xl text-secondary/20">"</span>
                  </motion.p>
                </div>
                
                <div className="flex space-x-4 mt-8">
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5, boxShadow: "0 0 15px rgba(var(--secondary-rgb)/0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5, boxShadow: "0 0 15px rgba(var(--secondary-rgb)/0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter size={18} />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5, boxShadow: "0 0 15px rgba(var(--secondary-rgb)/0.5)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={18} />
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:col-span-5 order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative">
                  <div className="bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl p-1">
                    <div className="relative aspect-square rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full bg-secondary/10 flex items-center justify-center">
                          <Sparkles size={64} className="text-secondary/70" />
                        </div>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-transparent via-secondary/5 to-transparent"
                        animate={{ 
                          background: ["linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(var(--secondary-rgb)/0.05) 50%, rgba(0,0,0,0) 100%)"],
                          backgroundPosition: ["0% 0%", "100% 100%"] 
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity, 
                          repeatType: "mirror" 
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: "radial-gradient(circle at 20% 30%, transparent 0, transparent 2px, rgba(var(--secondary-rgb)/0.03) 3px, transparent 4px), radial-gradient(circle at 70% 60%, transparent 0, transparent 2px, rgba(var(--secondary-rgb)/0.05) 3px, transparent 4px), radial-gradient(circle at 50% 40%, transparent 0, transparent 2px, rgba(var(--secondary-rgb)/0.04) 3px, transparent 4px)"
                        }}
                      />
                    </div>
                  </div>
                  
                  <motion.div 
                    className="absolute -bottom-6 -left-6"
                    animate={{ y: [0, -5, 0], rotate: [-2, -3, -2] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                  >
                    <div className="bg-secondary/95 text-white px-6 py-3 rounded-lg shadow-premium -rotate-2">
                      <span className="text-sm font-medium">Design & Marketing</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="section-padding bg-secondary/50">
          <div className="container-tight">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-2 mb-4">Por que criamos o BarberMatch?</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Nossa jornada começou ao identificar problemas comuns enfrentados por clientes e barbeiros
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className={`glass p-6 rounded-2xl border border-white/10 shadow-premium`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02, translateY: -5 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="text-primary" />
                  Para os clientes
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Dificuldade em encontrar barbeiros qualificados para estilos específicos</p>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Insegurança sobre como um novo corte ficará antes de fazê-lo</p>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Processos de agendamento complicados e tempos de espera imprevisíveis</p>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Falta de recomendações personalizadas baseadas no tipo de rosto e estilo</p>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className={`glass p-6 rounded-2xl border border-white/10 shadow-premium`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02, translateY: -5 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Scissors className="text-primary" />
                  Para os barbeiros
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Dificuldade em atrair novos clientes e construir uma clientela fiel</p>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Gerenciamento ineficiente de agendamentos e disponibilidade</p>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Comunicação limitada com os clientes antes das sessões</p>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">Dificuldade em mostrar seu portfólio e especialidades de forma eficaz</p>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="section-padding" ref={teamRef}>
          <div className="container-tight">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Users size={14} className="mr-2" />
                Time de Elite
              </div>
              <h2 className="heading-2 mb-4">Nossa Equipe</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Conheça os profissionais talentosos por trás do BarberMatch
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  name: "Taohan Batista", 
                  role: "CEO & Fundador", 
                  icon: <Users size={24} />,
                  description: "Visionário e estrategista com experiência em produtos digitais inovadores"
                },
                { 
                  name: "Maria Oliveira", 
                  role: "CTO & Desenvolvedora", 
                  icon: <Code size={24} />,
                  description: "Especialista em arquitetura de software e inteligência artificial"
                },
                { 
                  name: "João Santos", 
                  role: "Designer de UX/UI", 
                  icon: <Smartphone size={24} />,
                  description: "Criador de experiências digitais intuitivas e visualmente impressionantes"
                }
              ].map((member, index) => (
                <motion.div 
                  key={member.name}
                  className="glass rounded-xl overflow-hidden border border-white/10 shadow-premium"
                  variants={cardVariants}
                  initial="offscreen"
                  animate={isInView ? "onscreen" : "offscreen"}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                    <div className="w-20 h-20 rounded-full bg-white/80 dark:bg-white/20 flex items-center justify-center z-10">
                      {member.icon}
                    </div>
                    
                    <div className="absolute top-0 left-0 right-0 h-full overflow-hidden">
                      <div className="absolute -top-10 -left-10 right-10 h-[200%] bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rotate-12 transform"></div>
                    </div>
                    
                    {index === 0 && (
                      <div className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded-full shadow-sm">
                        Fundador
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                    
                    <div className="flex space-x-2 mt-4">
                      <a 
                        href="#" 
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <Linkedin size={14} />
                      </a>
                      <a 
                        href="#" 
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                        aria-label={`Twitter de ${member.name}`}
                      >
                        <Twitter size={14} />
                      </a>
                      <a 
                        href="#" 
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                        aria-label={`Email para ${member.name}`}
                      >
                        <Mail size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/careers" className="text-primary hover:underline inline-flex items-center gap-2">
                <span>Ver todas as vagas em aberto</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="section-padding bg-gradient-to-r from-primary/10 via-background to-primary/10">
          <div className="container-tight">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <TrendingUp size={14} className="mr-2" />
                Números Impressionantes
              </div>
              <h2 className="heading-2 mb-4">Nosso Impacto em Números</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: "25.000+", label: "Usuários ativos", icon: <Users size={24} className="text-primary" /> },
                { value: "1.500+", label: "Barbeiros parceiros", icon: <Scissors size={24} className="text-primary" /> },
                { value: "4.8/5", label: "Avaliação média", icon: <Star size={24} className="text-primary" /> },
                { value: "98%", label: "Clientes satisfeitos", icon: <CheckCircle size={24} className="text-primary" /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-premium hover:shadow-premium-hover transition-all border border-white/20 dark:border-white/5 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-primary text-white">
          <div className="container text-center">
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="heading-2 mb-6">Faça parte dessa revolução</h2>
              <p className="text-xl text-white/80 mb-8">
                Baixe o BarberMatch agora e junte-se a milhares de usuários que já estão transformando sua experiência de barbearia
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a 
                  href="/download" 
                  className="px-8 py-4 bg-white text-primary rounded-full flex items-center gap-2 hover:bg-white/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-medium">Baixar o App</span>
                  <ArrowRight size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="px-8 py-4 bg-white/10 text-white rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-medium">Contato</span>
                  <ArrowRight size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
