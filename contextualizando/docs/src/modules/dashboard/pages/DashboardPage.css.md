# modules/dashboard/pages/DashboardPage.css

## Utilidade
Folha de estilos CSS da página Dashboard.

## Funcionalidades
- **Layout**: Container centralizado com max-width
- **Header**: Título grande com seletor de mês e botão de período
- **Grid de KPIs**: 4 colunas em desktop, 2 em tablet, 2 em mobile
- **Cards de KPI**: Bordas arredondadas, hover com glow verde
- **Grid de Gráficos**: Layout 2fr 1fr em desktop
- **Cards de Gráfico**: Altura mínima fixa, header com tag
- **Placeholders**: Ícones SVG e textos indicativos
- **Responsividade**: Adaptação para 900px e 560px

## Classes Principais
- `.db-root`: Container principal
- `.db-header`: Header com título e controles
- `.db-kpis`: Grid dos 4 cards de indicadores
- `.db-kpi-card`: Estilo individual dos KPIs
- `.db-kpi-value`: Valor numérico destacado
- `.db-charts`: Grid dos cards de gráfico
- `.db-chart-card`: Card individual de gráfico
- `.db-span-2`: Card que ocupa 2 colunas
- `.db-placeholder-icon`: Ícone SVG placeholder
- `.db-select`, `.db-pill-btn`: Controles do header

## Design
- Tipografia monospace para valores numéricos
- Cores via variáveis CSS (suporte a temas)
- Bordas sutis e sombras leves
- Hover effects sutis nos cards
