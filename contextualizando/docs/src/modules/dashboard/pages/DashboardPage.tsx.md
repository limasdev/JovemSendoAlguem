# modules/dashboard/pages/DashboardPage.tsx

## Utilidade
Página inicial do sistema (Dashboard/Visão Geral) com dados reais do Google Sheets.

## Funcionalidades

### KPI Cards - Fileira 1 (Métricas Principais)
- **Renda do mês** - Total de entradas
- **Total de Gastos** - Total de saídas
- **Taxa de Economia** - Percentual de economia
- **Saldo Atual** - Diferença entre entradas e saídas

### KPI Cards - Fileira 2 (Métricas Adicionais)
- **Maior Gasto** - Valor e categoria do maior gasto
- **Média Diária** - Média de gastos por dia
- **Pendentes** - Quantidade e valor de transações pendentes
- **Agendados** - Quantidade e valores de transações agendadas

### Quick Stat
- **Categoria com mais gastos** - Banner destacando a categoria principal de gasto

### Gráficos Interativos
1. **Transações Recentes** - Últimas 5 transações (tabela ou gráfico pizza)
2. **Gastos por Categoria** - Top 5 categorias (barras ou pizza)
3. **Resumo por Status** - Contagem por status (lista ou donut)
4. **Maiores Receitas** - Top 5 categorias de entrada (barras)
5. **Status de Pagamento** - Valores em R$ por status (donut)
6. **Evolução Mensal** - Comparação mensal de entradas vs saídas (últimos 6 meses)

### Toggle de Visualização
Cada card de gráfico possui mini botões para alternar entre:
- Tabela/Lista
- Gráfico de Pizza/Donut
- Gráfico de Barras

## Dados
- Recebe `transactions` como prop do routes.tsx
- Dados carregados automaticamente do Google Sheets
- Cálculos em tempo real baseados nas transações

## Componentes Internos
- Tabela de transações
- Gráficos SVG (pie, donut, barras)
- Indicadores de status
- Botões de toggle

## Dependências
- Tipos e funções de `shared/types` (Transaction, formatBRL, formatDateBR, STATUS_CONFIG, etc)
- Dados do Google Sheets via routes.tsx

## Notas
- Usa `useState` para controlar visualização de cada card
- Gráficos são renderizados com SVG (sem biblioteca externa)
- Layout responsivo com CSS Grid
