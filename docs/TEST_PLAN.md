# Plano de Testes - BarberMatch (Área do Barbeiro)

## 1. Visão Geral

Este documento descreve o plano de testes para validar as funcionalidades implementadas na área do barbeiro do sistema BarberMatch. Os testes serão focados em garantir que as páginas estão funcionando corretamente, que os componentes interativos respondem adequadamente e que a navegação entre as diferentes seções está fluindo sem problemas.

## 2. Componentes a Serem Testados

1. **Dashboard**
2. **Agendamentos**
3. **Serviços**
4. **Clientes**
5. **Estatísticas**
6. **Perfil do Barbeiro**
7. **Configurações**

## 3. Testes Funcionais por Componente

### 3.1 Dashboard

- **Objetivo**: Verificar se o dashboard está exibindo corretamente todos os widgets e informações.
- **Cenários de Teste**:
  - Verificar se as métricas gerais são exibidas (clientes atendidos, faturamento, etc.)
  - Verificar se a lista de agendamentos do dia é exibida
  - Verificar se o gráfico de visão geral de serviços é exibido
  - Verificar se o componente de calendário semanal funciona

### 3.2 Agendamentos

- **Objetivo**: Verificar se a página de agendamentos permite visualizar e gerenciar os agendamentos.
- **Cenários de Teste**:
  - Verificar se a navegação entre datas funciona
  - Verificar se a pesquisa de agendamentos funciona
  - Verificar se é possível alterar o status de um agendamento (confirmar, cancelar)
  - Verificar se o modal de detalhes do agendamento abre e exibe as informações corretas

### 3.3 Serviços

- **Objetivo**: Verificar se a página de gerenciamento de serviços permite adicionar, editar e excluir serviços.
- **Cenários de Teste**:
  - Verificar se a lista de serviços é exibida
  - Testar a adição de um novo serviço
  - Testar a edição de um serviço existente
  - Testar a exclusão de um serviço
  - Verificar se a pesquisa de serviços funciona

### 3.4 Clientes

- **Objetivo**: Verificar se a página de clientes permite visualizar a lista e informações de clientes.
- **Cenários de Teste**:
  - Verificar se a lista de clientes é exibida
  - Verificar se a ordenação de clientes funciona (por nome, visitas, última visita)
  - Verificar se a pesquisa de clientes funciona
  - Testar a abertura do modal de detalhes do cliente
  - Verificar se é possível adicionar observações aos clientes

### 3.5 Estatísticas

- **Objetivo**: Verificar se a página de estatísticas exibe corretamente os gráficos e métricas.
- **Cenários de Teste**:
  - Verificar se todos os gráficos são renderizados corretamente
  - Testar a alteração do período (semana, mês, ano)
  - Verificar se as métricas resumidas são atualizadas ao alterar o período
  - Testar o colapso/expansão de cada seção de estatísticas

### 3.6 Perfil do Barbeiro

- **Objetivo**: Verificar se a página de perfil permite visualizar e editar informações do barbeiro.
- **Cenários de Teste**:
  - Verificar se todas as informações do perfil são exibidas
  - Testar a edição do perfil
  - Verificar se é possível alterar horários de funcionamento
  - Testar a adição e remoção de especialidades
  - Testar a adição e remoção de métodos de pagamento

### 3.7 Configurações

- **Objetivo**: Verificar se a página de configurações permite ajustar preferências do sistema.
- **Cenários de Teste**:
  - Verificar se a alteração do tema funciona (claro, escuro, sistema)
  - Testar a ativação/desativação de notificações
  - Verificar se a alteração da frequência de emails funciona
  - Testar as configurações de segurança

## 4. Ferramentas para Testes

### 4.1 Bancada de Testes

Criamos uma página de testes (`/test-bench`) que permite testar cada componente isoladamente. Esta ferramenta é útil para verificar se cada componente está funcionando corretamente sem a necessidade de navegar pelo fluxo completo da aplicação.

### 4.2 Testes Manuais

Os testes manuais serão realizados seguindo um roteiro pré-definido para cada componente, verificando todas as funcionalidades listadas nos cenários de teste acima.

## 5. Relatórios de Bugs

Para cada problema encontrado durante os testes, será criado um relatório contendo:

1. Descrição do problema
2. Passos para reproduzir
3. Comportamento esperado
4. Comportamento atual
5. Severidade (crítica, alta, média, baixa)
6. Capturas de tela, se aplicável

## 6. Critérios de Aprovação

Um componente será considerado aprovado nos testes quando:

1. Todas as funcionalidades descritas nos cenários de teste funcionam corretamente
2. Não há problemas de layout em diferentes tamanhos de tela
3. Os elementos interativos respondem adequadamente
4. Não há erros de console ou exceções não tratadas
5. O componente está acessível (possui atributos ARIA, rótulos adequados, etc.)

## 7. Próximos Passos

- Expandir os testes para incluir a área do cliente
- Implementar testes automatizados com Jest e React Testing Library
- Criar testes de integração para validar o fluxo completo de uso
- Realizar testes de usabilidade com usuários reais 