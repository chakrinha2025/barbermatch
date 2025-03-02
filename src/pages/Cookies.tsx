
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { animationClasses } from '@/lib/animations';

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-tight">
          <div className={`mb-12 ${animationClasses.fadeIn}`}>
            <h1 className="heading-2 mb-4">Política de Cookies</h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          <div className={`prose prose-lg max-w-none ${animationClasses.fadeIn}`} style={{ animationDelay: '100ms' }}>
            <h2>1. O que são Cookies?</h2>
            <p>
              Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você usa nosso aplicativo ou visita nosso site. Eles são amplamente utilizados para fazer com que os aplicativos funcionem ou funcionem de maneira mais eficiente, bem como para fornecer informações aos proprietários do aplicativo.
            </p>
            
            <h2>2. Como Usamos Cookies</h2>
            <p>
              Utilizamos cookies e tecnologias semelhantes para:
            </p>
            <ul>
              <li>Manter você conectado enquanto navega pelo aplicativo</li>
              <li>Lembrar suas preferências e configurações</li>
              <li>Melhorar a velocidade/segurança do serviço</li>
              <li>Permitir o compartilhamento em redes sociais</li>
              <li>Analisar como nosso aplicativo é usado para que possamos melhorá-lo</li>
              <li>Personalizar nosso serviço para você</li>
            </ul>
            
            <h2>3. Tipos de Cookies que Usamos</h2>
            <p>
              Utilizamos os seguintes tipos de cookies:
            </p>
            <ul>
              <li><strong>Cookies necessários:</strong> essenciais para permitir que você use os recursos disponíveis em nosso aplicativo.</li>
              <li><strong>Cookies de preferências:</strong> permitem que o aplicativo lembre informações que mudam a aparência ou o comportamento do aplicativo.</li>
              <li><strong>Cookies estatísticos:</strong> nos ajudam a entender como os usuários interagem com o aplicativo, coletando e relatando informações anonimamente.</li>
              <li><strong>Cookies de marketing:</strong> usados para rastrear visitantes em aplicativos. A intenção é exibir anúncios relevantes e envolventes para o usuário individual.</li>
            </ul>
            
            <h2>4. Cookies de Terceiros</h2>
            <p>
              Alguns cookies são colocados por serviços de terceiros que aparecem em nossas páginas. Utilizamos serviços de terceiros para:
            </p>
            <ul>
              <li>Análise de uso (Google Analytics)</li>
              <li>Marketing e publicidade</li>
              <li>Mídia social (compartilhamento e integração)</li>
              <li>Processamento de pagamentos</li>
            </ul>
            
            <h2>5. Controle de Cookies</h2>
            <p>
              Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os cookies que já estão no seu dispositivo e pode configurar a maioria dos navegadores para impedir que eles sejam colocados.
            </p>
            <p>
              No aplicativo BarberMatch, você pode ajustar suas preferências de cookies nas configurações do aplicativo.
            </p>
            
            <h2>6. Cookies e Dados Pessoais</h2>
            <p>
              Quando os cookies podem ser vinculados a você pessoalmente, eles são tratados como dados pessoais e são cobertos também por nossa Política de Privacidade.
            </p>
            
            <h2>7. Alterações nesta Política</h2>
            <p>
              Podemos atualizar nossa Política de Cookies periodicamente. Recomendamos que você revise esta página regularmente para estar ciente de quaisquer alterações.
            </p>
            
            <h2>8. Contato</h2>
            <p>
              Se você tiver dúvidas sobre como usamos cookies, entre em contato conosco pelo e-mail: cookies@barbermatch.com.br
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookies;
