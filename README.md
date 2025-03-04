# BarberMatch

BarberMatch é uma plataforma inovadora que conecta clientes a barbeiros/barbearias de forma rápida e eficiente. A aplicação utiliza tecnologias como Inteligência Artificial (IA) e Realidade Aumentada (AR) para proporcionar uma experiência única aos usuários.

## Visão Geral do Projeto

O BarberMatch tem como objetivo revolucionar o setor de barbearias, facilitando o contato entre clientes e profissionais através de tecnologia avançada. Fundado por Taohan Batista, o projeto busca identificar e atender necessidades reais do mercado de beleza masculina, preenchendo lacunas existentes com soluções tecnológicas inovadoras.

## Funcionalidades Principais

### Para Clientes
- **Experimentação Virtual:** Teste cortes e estilos de barba via AR.
- **Recomendações Personalizadas:** Sugestões de cortes com base no formato do rosto.
- **Agendamento Inteligente:** Sistema de reserva com lembretes automáticos.
- **Busca Avançada:** Filtragem por localização, especialidade, avaliações e disponibilidade.
- **Pagamentos In-App:** Integração com Pix, cartões de crédito, Apple Pay, Google Pay.
- **Chat com Barbeiros:** Comunicação direta com profissionais antes do agendamento.
- **Análise de Tendências:** Acesso a estilos populares e tendências atuais.

### Para Barbeiros/Barbearias
- **Gestão de Agenda:** Controle de horários e clientes.
- **Perfil Profissional:** Exibição de portfólio e avaliações.
- **Análise de Desempenho:** Estatísticas e tendências de serviços.
- **Fidelização de Clientes:** Promoções e programas de fidelidade.
- **Sistema de Comunicação:** Chat integrado com clientes.
- **Dashboard Personalizado:** Gestão completa do negócio, tanto no app quanto no site.
- **Personalização Completa:** Adaptação da experiência conforme o modelo de negócio.

### Para Administradores
- **Painel de Controle Completo:** Acesso a todas as estatísticas da plataforma.
- **Gerenciamento de Usuários:** Controle de clientes, barbeiros e barbearias.
- **Moderação de Conteúdo:** Supervisão de avaliações e portfólios.
- **Controle de Planos:** Gestão de assinaturas e recursos disponíveis.
- **Relatórios Financeiros:** Acompanhamento de transações e métricas de negócio.

## Planos e Monetização

### Para Barbeiros e Barbearias
- **Plano Gratuito:** Perfil básico, agendamento limitado e acesso a clientes locais.
- **Plano Profissional:** Agendamento ilimitado, destaques na busca, acesso a estatísticas e fidelização.
- **Plano Premium:** Todas as funcionalidades do Profissional + anúncios patrocinados, suporte prioritário e integração com ferramentas de marketing.
- **Plano Personalizado:** Customização completa da experiência, com escolha de funcionalidades conforme a necessidade do negócio.

### Para Clientes
- **Assinatura VIP:** Acesso antecipado a promoções, descontos exclusivos e benefícios extras com barbeiros parceiros.
- **Marketplace de Produtos:** Acesso a produtos de cuidados pessoais dentro do app, como pomadas, shampoos e acessórios.

## Tecnologias Utilizadas

### Frontend Web
- React.js
- TypeScript
- TailwindCSS
- Shadcn UI
- Framer Motion para animações

### Backend
- Node.js com NestJS
- Supabase (PostgreSQL gerenciado)
- JWT para autenticação

### Mobile
- React Native
- Expo
- TailwindCSS

### Tecnologias de IA e AR
- TensorFlow
- Face-api.js
- DeepFace
- Three.js
- ARKit (iOS)
- ARCore (Android)

### Pagamentos e Integrações
- Stripe, Pix, PayPal, Apple Pay, Google Pay, MercadoPago
- API WhatsApp Business
- OpenAI GPT para chatbots e suporte

## Estrutura do Projeto

O projeto está organizado em:

- `/src`: Frontend React.js
  - `/components`: Componentes reutilizáveis
  - `/pages`: Páginas da aplicação
    - `/features`: Páginas de recursos específicos
    - `/auth`: Páginas de autenticação
  - `/api`: Comunicação com o backend
  - `/utils`: Funções utilitárias
  - `/hooks`: React Hooks customizados
  - `/contexts`: Contextos React para gerenciamento de estado
  - `/lib`: Bibliotecas e configurações
- `/server`: Backend NestJS (em desenvolvimento)
  - `/src`: Código fonte do servidor
    - `/modules`: Módulos da aplicação
    - `/main.ts`: Ponto de entrada da aplicação

## Configuração e Instalação

### Frontend
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build
```

### Backend (em desenvolvimento)
```bash
# Navegar para o diretório do servidor
cd server

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run start:dev

# Construir para produção
npm run build
```

## Recursos Implementados

1. **Páginas de Recursos**:
   - Chat com Barbeiros: Comunicação direta com profissionais
   - Agendamento Inteligente: Sistema de reservas com IA
   - Análise de Tendências: Visualização de estilos populares
   - Descoberta de Barbeiros: Busca avançada por profissionais
   - Experiência Virtual: Teste de cortes com AR
   - Gestão de Negócio: Dashboard para barbeiros

2. **Sistema de Acesso**:
   - Lógica de verificação de planos
   - Redirecionamentos contextuais
   - Acesso controlado por tipo de recurso
   - Experiência personalizada por plano

3. **Páginas de Fundadores**:
   - Taohan Batista: Fundador e CEO
   - Thales Batista: Colaborador em Marketing e Criação

## Contribuição

Para contribuir com o projeto, siga as etapas:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Para mais informações, sugestões ou dúvidas, entre em contato pelo email: contato@barbermatch.com

## Correções de Funcionalidade (03/03/2025)

As seguintes correções foram implementadas para resolver problemas de funcionalidade na aplicação:

1. **Navegação do site:**
   - Corrigido o problema onde o dropdown do menu de soluções só funcionava na página inicial
   - Implementado redirecionamento correto para links de âncora quando o usuário não está na página inicial
   - Adicionada transição suave para o dropdown do menu de soluções

2. **Login de dono de barbearia:**
   - Corrigido o problema de redirecionamento após o login
   - Adicionado logging para facilitar a depuração
   - Implementado um timeout para garantir que o redirecionamento ocorra corretamente

3. **Autenticação e autorização:**
   - Aprimorado o componente PrivateRoute para verificação mais robusta de autenticação
   - Adicionado feedback visual durante o carregamento da verificação de credenciais
   - Implementada notificação de erro ao tentar acessar páginas sem permissão

4. **Dashboard do dono de barbearia:**
   - Melhorado o carregamento de dados para evitar placeholders vazios
   - Adicionado logging para facilitar a depuração
   - Implementadas mensagens de erro mais descritivas

Para testar o login como dono de barbearia, use as seguintes credenciais:
- Email: barbearia@exemplo.com
- Senha: senha123
