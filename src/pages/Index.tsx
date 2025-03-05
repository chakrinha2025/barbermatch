import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Scissors, Calendar, TrendingUp, Store, ShieldCheck } from 'lucide-react';
import { AnimatedBg } from '@/components/ui/animated-bg';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { MotionCard } from '@/components/ui/motion-card';
import { useTheme } from 'next-themes';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Animação de scroll para o hero
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  // Animações para a seção de features
  const featuresY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const featuresOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // Efeito para aparecer texto gradualmente
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  // Efeito de grid para cards
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Efeito de scroll para baixo
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section com background animado */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
        <AnimatedBg 
          variant="particles" 
          intensity={7} 
          color={isDark ? '#10b981' : '#0ea5e9'}
          interactOnHover={true}
          className="absolute inset-0"
        >
          <motion.div 
            className="container mx-auto px-4 py-20 flex flex-col items-center text-center"
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              y: heroY
            }}
          >
            <motion.div 
              className="mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.1 
              }}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center">
                <Scissors className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              BarberMatch
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Conectando você ao seu estilo perfeito. Experimente cortes virtualmente, 
              encontre os melhores barbeiros e agende com facilidade.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <Link
                to="/register"
                className="px-8 py-3 rounded-full bg-primary text-white font-medium transition-transform hover:scale-105 hover:shadow-lg"
              >
                Começar Agora
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 rounded-full bg-muted text-foreground font-medium transition-transform hover:scale-105"
              >
                Saiba Mais
              </Link>
            </motion.div>

            <motion.button
              className="absolute bottom-10 flex items-center justify-center p-3 rounded-full bg-muted text-foreground animate-bounce cursor-pointer"
              onClick={scrollToFeatures}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </AnimatedBg>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-background to-muted"
      >
        <motion.div 
          className="container mx-auto px-4"
          style={{
            y: featuresY,
            opacity: featuresOpacity
          }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              Recursos Exclusivos
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              Uma experiência completa para clientes e profissionais da barbearia
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={cardVariants}>
              <MotionCard className="h-full p-6">
                <div className="h-full flex flex-col">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Scissors className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Experimentação Virtual</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Experimente diferentes cortes de cabelo e barba virtualmente antes de agendar.
                  </p>
                  <Link
                    to="/recursos/experiencia-virtual"
                    className="text-primary font-medium hover:underline inline-flex items-center"
                  >
                    Conhecer
                    <ChevronDown className="w-4 h-4 ml-1 rotate-[270deg]" />
                  </Link>
                </div>
              </MotionCard>
            </motion.div>

            <motion.div variants={cardVariants}>
              <MotionCard className="h-full p-6">
                <div className="h-full flex flex-col">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="text-blue-500 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Agendamento Inteligente</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Agende horários facilmente, receba lembretes e gerencie suas reservas.
                  </p>
                  <Link
                    to="/recursos/agendamento"
                    className="text-blue-500 font-medium hover:underline inline-flex items-center"
                  >
                    Conhecer
                    <ChevronDown className="w-4 h-4 ml-1 rotate-[270deg]" />
                  </Link>
                </div>
              </MotionCard>
            </motion.div>

            <motion.div variants={cardVariants}>
              <MotionCard className="h-full p-6">
                <div className="h-full flex flex-col">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="text-purple-500 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Análise de Tendências</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Descubra as tendências mais populares e estilos em alta na sua região.
                  </p>
                  <Link
                    to="/recursos/analise-tendencias"
                    className="text-purple-500 font-medium hover:underline inline-flex items-center"
                  >
                    Conhecer
                    <ChevronDown className="w-4 h-4 ml-1 rotate-[270deg]" />
                  </Link>
                </div>
              </MotionCard>
            </motion.div>

            <motion.div variants={cardVariants}>
              <MotionCard className="h-full p-6">
                <div className="h-full flex flex-col">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Store className="text-amber-500 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gestão de Negócio</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Para barbeiros e barbearias: controle completo do seu negócio em um só lugar.
                  </p>
                  <Link
                    to="/recursos/gestao-negocio"
                    className="text-amber-500 font-medium hover:underline inline-flex items-center"
                  >
                    Conhecer
                    <ChevronDown className="w-4 h-4 ml-1 rotate-[270deg]" />
                  </Link>
                </div>
              </MotionCard>
            </motion.div>

            <motion.div variants={cardVariants}>
              <MotionCard className="h-full p-6">
                <div className="h-full flex flex-col">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                    <ShieldCheck className="text-green-500 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Segurança</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Seus dados protegidos com criptografia e conformidade com as leis de privacidade.
                  </p>
                  <Link
                    to="/privacy"
                    className="text-green-500 font-medium hover:underline inline-flex items-center"
                  >
                    Conhecer
                    <ChevronDown className="w-4 h-4 ml-1 rotate-[270deg]" />
                  </Link>
                </div>
              </MotionCard>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Parallax Section */}
      <ParallaxSection
        bgImage="/images/barbershop-bg.jpg"
        bgOverlayOpacity={0.7}
        bgParallaxSpeed={0.5}
        className="py-24"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            O Futuro das Barbearias Chegou
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Junte-se a milhares de profissionais e clientes que estão
            transformando a experiência de barbearia com tecnologia.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/register"
              className="px-8 py-3 rounded-full bg-primary text-white font-medium transition-transform hover:scale-105 hover:shadow-lg inline-block"
            >
              Comece Hoje Mesmo
            </Link>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-2 text-primary"
              >
                5.000+
              </motion.div>
              <h3 className="text-xl font-medium">Barbeiros Cadastrados</h3>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-2 text-blue-500"
              >
                50.000+
              </motion.div>
              <h3 className="text-xl font-medium">Agendamentos Realizados</h3>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-2 text-purple-500"
              >
                98%
              </motion.div>
              <h3 className="text-xl font-medium">Clientes Satisfeitos</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/20 to-blue-500/20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pronto para transformar sua experiência?
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Junte-se ao BarberMatch hoje e descubra um novo mundo de possibilidades.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/register"
              className="px-8 py-3 rounded-full bg-primary text-white font-medium transition-transform hover:scale-105 hover:shadow-lg"
            >
              Criar Conta
            </Link>
            <Link
              to="/download"
              className="px-8 py-3 rounded-full bg-muted text-foreground font-medium transition-transform hover:scale-105"
            >
              Baixar o App
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
