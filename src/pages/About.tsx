
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animationClasses } from '@/lib/animations';
import { ArrowRight, CheckCircle, Users, Code, Smartphone } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h1 className={`heading-1 mb-6 ${animationClasses.fadeIn}`}>
                Sobre o BarberMatch
              </h1>
              <p className={`sub-heading max-w-2xl mx-auto ${animationClasses.fadeIn}`} style={{ animationDelay: '100ms' }}>
                Conhecendo a visão e a equipe por trás do aplicativo que está transformando o setor de barbearias no Brasil
              </p>
            </div>
            
            <div className={`glass rounded-3xl overflow-hidden ${animationClasses.fadeIn}`} style={{ animationDelay: '200ms' }}>
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-transparent to-primary/10 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="6 3 20 12 6 21"></polygon></svg>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-3">Nossa Missão</h2>
                <p className="text-muted-foreground">
                  Transformar a experiência de barbearia através da tecnologia, conectando clientes a barbeiros talentosos enquanto oferecemos ferramentas inovadoras que beneficiam ambos os lados.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="section-padding bg-secondary/50">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Por que criamos o BarberMatch?</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Nossa jornada começou ao identificar problemas comuns enfrentados por clientes e barbeiros
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`glass p-6 rounded-2xl ${animationClasses.fadeIn}`} style={{ animationDelay: '100ms' }}>
                <h3 className="text-xl font-bold mb-4">Para os clientes</h3>
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
              </div>
              
              <div className={`glass p-6 rounded-2xl ${animationClasses.fadeIn}`} style={{ animationDelay: '200ms' }}>
                <h3 className="text-xl font-bold mb-4">Para os barbeiros</h3>
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
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Nossa Equipe</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Conheça os profissionais talentosos por trás do BarberMatch
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Carlos Silva", role: "CEO & Fundador", icon: <Users size={24} /> },
                { name: "Maria Oliveira", role: "CTO & Desenvolvedora", icon: <Code size={24} /> },
                { name: "João Santos", role: "Designer de UX/UI", icon: <Smartphone size={24} /> }
              ].map((member, index) => (
                <div key={member.name} className={`glass rounded-xl overflow-hidden ${animationClasses.fadeIn}`} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="aspect-[4/3] bg-secondary flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      {member.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-primary text-white">
          <div className="container text-center">
            <div className={`max-w-3xl mx-auto ${animationClasses.fadeIn}`}>
              <h2 className="heading-2 mb-6">Faça parte dessa revolução</h2>
              <p className="text-xl text-white/80 mb-8">
                Baixe o BarberMatch agora e junte-se a milhares de usuários que já estão transformando sua experiência de barbearia
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/download" className="px-8 py-4 bg-white text-primary rounded-full flex items-center gap-2 hover:bg-white/90 transition-colors">
                  <span className="font-medium">Baixar o App</span>
                </a>
                <a href="#" className="px-8 py-4 bg-white/10 text-white rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors">
                  <span className="font-medium">Contato</span>
                  <ArrowRight size={20} />
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

export default About;
