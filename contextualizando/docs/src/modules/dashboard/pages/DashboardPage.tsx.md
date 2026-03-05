# modules/dashboard/pages/DashboardPage.tsx

## Utilidade
Página inicial do sistema (Dashboard/Visão Geral).

## Funcionalidades
- **Header**: Título "DASHBOARD" com seletor de mês
- **KPI Cards**: 4 cards de indicadores principais
  - Renda do mês
  - Total de Gastos
  - Taxa de Economia
  - Saldo Bancário Atual
- **Gráficos Placeholders**: 
  - Fluxo de Caixa Mensal (gráfico de barras)
  - Composição de Despesas (gráfico de pizza)
  - Contas a Pagar e Receber (tabela)

## Estado Atual
A página está com dados mockados ("R$ —") e placeholders visuais onde futuramente serão inseridos:
- Gráficos reais (iframe ou biblioteca)
- Dados dinâmicos da API
- Filtros por período funcionais

## Componentes
- Seletor de mês (dropdown)
- Botão de período (últimos 30 dias)
- Cards de KPI com hover effect
- Cards de gráfico com ícones SVG

## Futuras Implementações
- Integração com API de transações
- Gráficos interativos (Chart.js, Recharts, etc)
- Filtros dinâmicos
- Atualização em tempo real

## Importância
É a página de entrada do sistema, deve apresentar visão geral clara das finanças.
