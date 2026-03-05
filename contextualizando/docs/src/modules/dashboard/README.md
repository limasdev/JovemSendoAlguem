# modules/dashboard/README.md

## Módulo Dashboard

## Responsabilidade
Visão geral das finanças pessoais (página inicial).

## Funcionalidades Principais
1. KPIs principais (renda, gastos, economia, saldo)
2. Gráficos de análise (placeholders)
3. Seletor de período (mês/ano)
4. Cards informativos com hover effects

## Estrutura
```
dashboard/
└── pages/
    ├── DashboardPage.tsx     # Componente principal
    ├── DashboardPage.css     # Estilos
    └── index.ts             # Exportações
```

## Estado Atual
⚠️ **Em desenvolvimento** - Contém apenas placeholders visuais

### Placeholders Presentes
- Gráfico de Barras (Fluxo de Caixa Mensal)
- Gráfico de Pizza (Composição de Despesas)
- Tabela (Contas a Pagar e Receber)

### Futuras Implementações
- Integração com API
- Gráficos reais (Chart.js/Recharts)
- Filtros funcionais
- Atualização em tempo real

## Desenvolvedor Responsável
Pessoa 1 - Responsável pelo dashboard e visão geral.

## Integração
Recebe dados do módulo Fluxo de Caixa para calcular KPIs.
