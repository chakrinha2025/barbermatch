# BarberMatch - App de Agendamento e Gestão para Barbearias

![Logo BarberMatch](public/logo.svg)

## Visão Geral

O BarberMatch é uma plataforma inovadora que conecta clientes a barbearias e barbeiros, simplificando o processo de agendamento e proporcionando ferramentas de gestão para profissionais do setor. A plataforma usa tecnologia avançada, incluindo análise de tendências e experimentação virtual de cortes de cabelo e barbas.

## Principais Funcionalidades

### Para Clientes
- **Busca de Barbeiros**: Encontre os melhores barbeiros próximos à sua localização
- **Agendamento Inteligente**: Marque horários facilmente considerando a disponibilidade do profissional
- **Experimentação Virtual**: Experimente cortes e estilos de barba antes do agendamento
- **Perfil Personalizado**: Salve suas preferências e histórico de cortes

### Para Barbeiros
- **Gestão de Agenda**: Controle completo sobre horários e compromissos
- **Gestão de Clientes**: Base de dados de clientes com preferências e histórico
- **Estatísticas**: Visualização de desempenho e tendências de negócio
- **Personalização de Serviços**: Configuração detalhada dos serviços oferecidos

### Para Donos de Barbearias
- **Gestão de Equipe**: Administre múltiplos barbeiros em um só lugar
- **Dashboard Gerencial**: Indicadores de desempenho do negócio
- **Recursos Premium**: Ferramentas avançadas para crescimento do estabelecimento

## Planos e Preços

O BarberMatch oferece diferentes planos para atender às necessidades específicas:

- **Plano Básico**: Funcionalidades essenciais para iniciantes
- **Plano Profissional**: Recursos avançados para barbeiros estabelecidos
- **Plano Premium**: Soluções completas para barbearias com múltiplos profissionais

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL, Autenticação, Storage)
- **Estado**: React Query, Context API
- **Roteamento**: React Router
- **Estilização**: Tailwind CSS
- **Animações**: Framer Motion
- **Visualização de Dados**: Recharts
- **Formulários**: React Hook Form, Zod
- **Componentes de UI**: Radix UI, Lucide Icons
- **Realidade Aumentada**: Face-api.js

## Estrutura do Projeto

```
src/
├── api/            # Serviços e endpoints da API
├── components/     # Componentes reutilizáveis
│   └── ui/         # Componentes básicos de UI
├── contexts/       # Contextos React
├── hooks/          # Custom hooks
├── layouts/        # Layouts de página
├── lib/            # Utilitários e funções auxiliares
│   └── ar/         # Funcionalidades de Realidade Aumentada
├── pages/          # Páginas da aplicação
│   ├── admin/      # Área administrativa
│   ├── auth/       # Autenticação
│   ├── barber/     # Área do barbeiro
│   ├── client/     # Área do cliente
│   └── features/   # Páginas de funcionalidades
├── routes/         # Configuração de rotas
├── styles/         # Estilos globais
├── types/          # Definições de tipos TypeScript 
├── utils/          # Funções utilitárias
└── App.tsx         # Componente principal
```

## Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/barbermatch.git

# Navegue até o diretório
cd barbermatch

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais do Supabase

# Execute o projeto em modo de desenvolvimento
npm run dev

# Para build de produção
npm run build

# Para configurar o banco de dados Supabase
npx supabase login
npx supabase init
npx supabase start
```

## Supabase Setup

O BarberMatch utiliza o Supabase como backend. Para configurar o banco de dados:

1. Crie uma conta no [Supabase](https://supabase.io)
2. Crie um novo projeto
3. Copie suas credenciais para o arquivo `.env`
4. Execute o script SQL em `supabase/sql_setup_admin.sql` no editor SQL do Supabase

## Recursos Adicionais

- [Documentação da API](/docs/api)
- [Guia de Estilo](/docs/style-guide)
- [Política de Privacidade](/privacy)
- [Termos de Uso](/terms)

## Análise de Tendências

O BarberMatch possui uma poderosa ferramenta de análise de tendências que permite aos barbeiros e donos de barbearias acompanharem:

- Estilos de corte mais populares
- Horários de maior demanda
- Comportamento sazonal dos clientes
- Preferências por região

## Contato e Suporte

Para dúvidas, sugestões ou suporte técnico, entre em contato através de:

- Email: contato@barbermatch.com.br
- WhatsApp: (11) 99999-9999

---

&copy; 2024 BarberMatch - Todos os direitos reservados.
