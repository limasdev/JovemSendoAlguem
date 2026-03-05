# modules/fluxo-caixa/README.md

## Módulo Fluxo de Caixa

## Responsabilidade
Gerenciamento de transações financeiras (entradas e saídas) com dados do Google Sheets.

## Funcionalidades Principais
1. Cadastro de transações (entrada/saída)
2. Cálculos automáticos (totais e saldo)
3. Categorias alinhadas com planilha Google Sheets
4. Status de pagamento/recebimento
5. Integração com dados externos

## Estrutura
```
fluxo-caixa/
├── constants/
│   └── index.ts          # Types, categorias, formatadores
└── pages/
    ├── FluxoCaixaPage.tsx    # Formulário de cadastro
    ├── FluxoCaixaPage.css    # Estilos
    └── index.ts              # Exportações
```

## Categorias (alinhadas com planilha)

### Entradas
- Salário
- Aluguel Recebido
- Rendimentos
- Vendas
- Bonificações
- Outros Recebimentos

### Saídas
- Vestuário
- Internet/Telefone
- Streaming/Assinatura
- Cartão de Crédito
- Empréstimo/Dívida
- Investimentos
- Pets
- Presentes
- Outros

## Integração
- Importa de `shared/types`: Transaction, formatadores, categorias, métodos de pagamento
- Recebe `transactions` como prop do routes.tsx
- Dados sincronizados com Google Sheets
- Alterações locais refletem no estado global

## Uso das Categorias
O FluxoCaixaPage usa categorias das constantes `ENTRADA_CATEGORIES` e `SAIDA_CATEGORIES` (de shared/types) como fallback quando não há transações carregadas. Quando há dados da planilha, pode usar `getCategoriesFromTransactions()` para extrair dinamicamente.

## Desenvolvedor Responsável
Pessoa 2 - Responsável por todas as funcionalidades de fluxo de caixa.

## Notas
- Categorias devem bater exatamente com a planilha
- Formatação de moeda em tempo real (BRL)
- Validação de campos obrigatórios
