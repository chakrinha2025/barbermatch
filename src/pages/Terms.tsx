
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animationClasses } from '@/lib/animations';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-tight">
          <div className={`mb-12 ${animationClasses.fadeIn}`}>
            <h1 className="heading-2 mb-4">Termos de Uso</h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          <div className={`prose prose-lg max-w-none ${animationClasses.fadeIn}`} style={{ animationDelay: '100ms' }}>
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou usar o aplicativo BarberMatch, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nosso serviço.
            </p>
            
            <h2>2. Alterações nos Termos</h2>
            <p>
              Podemos modificar estes termos a qualquer momento. É sua responsabilidade revisar periodicamente os termos para verificar alterações. O uso contínuo do aplicativo após a publicação de alterações constitui sua aceitação dessas alterações.
            </p>
            
            <h2>3. Conta de Usuário</h2>
            <p>
              Para usar determinados recursos do aplicativo, você precisará criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais de conta e por todas as atividades que ocorrerem em sua conta.
            </p>
            
            <h2>4. Uso do Serviço</h2>
            <p>
              Você concorda em usar o serviço apenas para fins legais e de acordo com estes Termos. Você não deve:
            </p>
            <ul>
              <li>Usar o serviço de maneira que possa interferir, interromper ou afetar negativamente o serviço</li>
              <li>Tentar acessar áreas não autorizadas do serviço</li>
              <li>Usar o serviço para fins fraudulentos ou ilegais</li>
              <li>Transmitir qualquer conteúdo prejudicial, ofensivo ou inadequado</li>
            </ul>
            
            <h2>5. Conteúdo do Usuário</h2>
            <p>
              Ao enviar conteúdo para o aplicativo, você concede ao BarberMatch uma licença mundial, não exclusiva e livre de royalties para usar, reproduzir, modificar e exibir esse conteúdo em conexão com o serviço.
            </p>
            
            <h2>6. Direitos de Propriedade Intelectual</h2>
            <p>
              O aplicativo BarberMatch e seu conteúdo original, recursos e funcionalidades são de propriedade do BarberMatch e são protegidos por direitos autorais, marcas registradas e outras leis de propriedade intelectual.
            </p>
            
            <h2>7. Links para Outros Sites</h2>
            <p>
              Nosso serviço pode conter links para sites de terceiros que não são de propriedade ou controlados pelo BarberMatch. O BarberMatch não tem controle e não assume nenhuma responsabilidade pelo conteúdo, políticas de privacidade ou práticas de sites de terceiros.
            </p>
            
            <h2>8. Rescisão</h2>
            <p>
              Podemos encerrar ou suspender sua conta e acesso ao serviço imediatamente, sem aviso prévio, por qualquer motivo, incluindo, sem limitação, violação destes Termos.
            </p>
            
            <h2>9. Limitação de Responsabilidade</h2>
            <p>
              Em nenhum caso o BarberMatch, seus diretores, funcionários ou agentes serão responsáveis por quaisquer danos indiretos, punitivos, incidentais, especiais, consequenciais ou exemplares.
            </p>
            
            <h2>10. Lei Aplicável</h2>
            <p>
              Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem levar em consideração seus princípios de conflito de leis.
            </p>
            
            <h2>11. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo e-mail: contato@barbermatch.com.br
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
