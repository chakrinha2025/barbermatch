
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animationClasses } from '@/lib/animations';

const DataProcessing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-tight">
          <div className={`mb-12 ${animationClasses.fadeIn}`}>
            <h1 className="heading-2 mb-4">Processamento de Dados</h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          <div className={`prose prose-lg max-w-none ${animationClasses.fadeIn}`} style={{ animationDelay: '100ms' }}>
            <h2>1. Introdução</h2>
            <p>
              Este documento descreve como o BarberMatch processa dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD) e outras leis de privacidade aplicáveis.
            </p>
            
            <h2>2. Controlador de Dados</h2>
            <p>
              O BarberMatch atua como controlador de dados para as informações pessoais coletadas através do aplicativo. Somos responsáveis por determinar os meios e finalidades do processamento de seus dados.
            </p>
            
            <h2>3. Base Legal para Processamento</h2>
            <p>
              Processamos seus dados pessoais com base nas seguintes justificativas legais:
            </p>
            <ul>
              <li><strong>Execução de contrato:</strong> quando o processamento é necessário para cumprir nossos termos de serviço com você.</li>
              <li><strong>Consentimento:</strong> quando você nos deu permissão explícita para processar seus dados para finalidades específicas.</li>
              <li><strong>Interesses legítimos:</strong> quando o processamento é necessário para nossos interesses legítimos ou de terceiros.</li>
              <li><strong>Conformidade legal:</strong> quando o processamento é necessário para cumprimento de obrigações legais.</li>
            </ul>
            
            <h2>4. Categorias Especiais de Dados</h2>
            <p>
              Para fornecer nossos serviços de AR e análise facial, podemos processar dados biométricos temporários com seu consentimento explícito. Estes dados são processados apenas localmente no seu dispositivo e não são armazenados em nossos servidores.
            </p>
            
            <h2>5. Transferências Internacionais de Dados</h2>
            <p>
              Seus dados podem ser transferidos e mantidos em servidores localizados fora do Brasil. Garantimos que quaisquer transferências internacionais de dados sejam realizadas em conformidade com as leis de proteção de dados aplicáveis.
            </p>
            
            <h2>6. Período de Retenção</h2>
            <p>
              Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, incluindo obrigações legais, contábeis ou de relatórios.
            </p>
            
            <h2>7. Direitos do Titular dos Dados</h2>
            <p>
              Sob a LGPD, você tem os seguintes direitos:
            </p>
            <ul>
              <li>Direito de acesso aos seus dados pessoais</li>
              <li>Direito de retificação de dados imprecisos</li>
              <li>Direito ao esquecimento (exclusão)</li>
              <li>Direito à portabilidade dos dados</li>
              <li>Direito de oposição ao processamento</li>
              <li>Direito à informação sobre o compartilhamento de dados</li>
              <li>Direito de revogar o consentimento</li>
            </ul>
            
            <h2>8. Medidas de Segurança</h2>
            <p>
              Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais, incluindo:
            </p>
            <ul>
              <li>Criptografia de dados sensíveis</li>
              <li>Controles de acesso e autenticação</li>
              <li>Auditorias de segurança regulares</li>
              <li>Treinamento de funcionários em práticas de segurança de dados</li>
            </ul>
            
            <h2>9. Violações de Dados</h2>
            <p>
              Em caso de violação de dados que possa resultar em alto risco para seus direitos e liberdades, notificaremos você e a autoridade de proteção de dados relevante sem atraso indevido.
            </p>
            
            <h2>10. Contato</h2>
            <p>
              Para exercer seus direitos ou se tiver dúvidas sobre como processamos seus dados, entre em contato com nosso Encarregado de Proteção de Dados em: dpo@barbermatch.com.br
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DataProcessing;
