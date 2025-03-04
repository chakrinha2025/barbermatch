import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animationClasses } from '@/lib/animations';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-tight">
          <div className={`mb-12 ${animationClasses.fadeIn}`}>
            <h1 className="heading-2 mb-4">Política de Privacidade</h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          <div className={`prose prose-lg max-w-none ${animationClasses.fadeIn} animation-delay-100`}>
            <h2>1. Introdução</h2>
            <p>
              O BarberMatch ("nós", "nosso" ou "nossos") está comprometido em proteger sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos e compartilhamos suas informações pessoais quando você usa nosso aplicativo móvel BarberMatch.
            </p>
            
            <h2>2. Informações que Coletamos</h2>
            <p>
              Podemos coletar os seguintes tipos de informações:
            </p>
            <ul>
              <li><strong>Informações de conta:</strong> nome, e-mail, senha e preferências de perfil.</li>
              <li><strong>Dados de uso:</strong> informações sobre como você usa o aplicativo, incluindo interações, pesquisas e agendamentos.</li>
              <li><strong>Dados de localização:</strong> com sua permissão, coletamos dados de localização para mostrar barbeiros próximos.</li>
              <li><strong>Dados faciais:</strong> com sua permissão explícita, processamos dados faciais temporariamente para recursos de AR.</li>
              <li><strong>Informações de pagamento:</strong> quando você faz compras, coletamos detalhes de pagamento através de processadores de pagamento seguros.</li>
            </ul>
            
            <h2>3. Como Usamos Suas Informações</h2>
            <p>
              Usamos suas informações para:
            </p>
            <ul>
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Processar agendamentos e pagamentos</li>
              <li>Personalizar sua experiência no aplicativo</li>
              <li>Fornecer recursos de AR para experimentação virtual de cortes</li>
              <li>Enviar notificações sobre agendamentos e promoções</li>
              <li>Detectar e prevenir fraudes e abusos</li>
            </ul>
            
            <h2>4. Compartilhamento de Informações</h2>
            <p>
              Podemos compartilhar suas informações com:
            </p>
            <ul>
              <li><strong>Barbeiros e estabelecimentos:</strong> quando você agenda um serviço, compartilhamos informações necessárias com o barbeiro.</li>
              <li><strong>Provedores de serviços:</strong> trabalhamos com empresas terceirizadas que nos ajudam a operar nosso serviço.</li>
              <li><strong>Conformidade legal:</strong> podemos divulgar informações em resposta a requisições legais.</li>
            </ul>
            
            <h2>5. Seus Direitos</h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direitos sobre seus dados pessoais, incluindo:
            </p>
            <ul>
              <li>Acesso aos seus dados pessoais</li>
              <li>Correção de dados imprecisos</li>
              <li>Exclusão de seus dados (com certas limitações)</li>
              <li>Restrição ou objeção ao processamento</li>
              <li>Portabilidade de dados</li>
            </ul>
            
            <h2>6. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
            
            <h2>7. Retenção de Dados</h2>
            <p>
              Mantemos suas informações apenas pelo tempo necessário para os fins descritos nesta política ou conforme exigido por lei.
            </p>
            
            <h2>8. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Notificaremos você sobre alterações significativas publicando a nova política no aplicativo.
            </p>
            
            <h2>9. Contato</h2>
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo e-mail: privacidade@barbermatch.com.br
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
