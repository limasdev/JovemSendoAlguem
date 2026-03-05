# modules/fluxo-caixa/README.md

## Módulo Fluxo de Caixa

## Responsabilidade
Gerenciamento de transações financeiras (entradas e saídas).

## Funcionalidades Principais
1. Cadastro de transações
2. Cálculos automáticos (totais e saldo)
3. Histórico de transações em tabela
4. Categorização (entradas vs saídas)
5. Status de pagamento/recebimento

## Estrutura
```
fluxo-caixa/
├── constants/
│   └── index.ts          # Types, constantes e funções utilitárias
└── pages/
    ├── FluxoCaixaPage.tsx    # Componente principal
    ├── FluxoCaixaPage.css    # Estilos
    └── index.ts              # Exportações
```

## Desenvolvedor Responsável
Pessoa 2 - Responsável por todas as funcionalidades de fluxo de caixa.

## Futuras Melhorias
- Filtros por data e categoria
- Exportação para Excel/PDF
- Gráficos de evolução
- Recorrência de transações
