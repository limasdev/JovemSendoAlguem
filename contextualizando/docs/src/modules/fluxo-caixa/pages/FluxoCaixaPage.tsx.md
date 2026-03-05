# modules/fluxo-caixa/pages/FluxoCaixaPage.tsx

## Utilidade
Página principal do módulo Fluxo de Caixa.

## Funcionalidades
- **Cadastro de Transações**: Formulário para adicionar entradas e saídas
- **Toggle Entrada/Saída**: Botões para selecionar tipo de transação
- **Campos do Formulário**:
  - Descrição (texto livre)
  - Categoria (dropdown dinâmico baseado no tipo)
  - Valor em R$ (com prefixo)
  - Data (date picker)
  - Método de pagamento
  - Status
- **Cálculos Automáticos**: Total de entradas, saídas e saldo (useMemo)
- **Validação**: Só permite adicionar se descrição e valor forem válidos
- **Tabela de Histórico**: Lista todas as transações cadastradas
- **Ações**: Remover transação individual ou limpar todas

## Hooks Utilizados
- `useState`: Gerenciamento de estado do formulário e transações
- `useMemo`: Cálculos otimizados de totais

## Estados
- `transactions`: Array de transações cadastradas
- `description`, `amount`, `date`, etc: Campos do formulário
- `type`: Entrada ou Saída

## Importância
É a página mais importante do sistema, onde o usuário gerencia suas finanças.
