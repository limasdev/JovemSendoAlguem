# modules/transactions/pages/TransactionsPage.tsx

## Utilidade
Página de listagem completa de transações com filtros, busca e paginação.

## Funcionalidades

### Filtros e Busca
- **Busca por texto** - Pesquisa em descrição e categoria
- **Filtro por tipo** - Entradas, Saídas ou Todos
- **Filtro por categoria** - Dropdown com categorias disponíveis
- **Filtro por status** - Recebido, Pago, Pendente, Agendado
- **Filtro por período** - Data inicial e final

### Tabela de Transações
- Colunas: Descrição, Categoria, Valor, Data, Tipo, Método, Status
- Ordenação por data (mais recentes primeiro)
- Identificação visual por tipo (verde=entrada, vermelho=saída)
- Botão para remover transação

### Paginação
- 10 transações por página
- Controles: Anterior, Próximo, números de página
- Exibe "Página X de Y"

### Cards de Resumo (4 cards)
- **Total de Entradas** - Soma de todas as entradas filtradas
- **Total de Saídas** - Soma de todas as saídas filtradas
- **Saldo** - Diferença entre entradas e saídas
- **Total de Registros** - Quantidade de transações filtradas

## Props
```typescript
interface TransactionsPageProps {
  transactions: Transaction[];
  onAddTransaction: (t: Transaction) => void;
  onRemoveTransaction: (id: string) => void;
  loading?: boolean;
  error?: string | null;
}
```

## Estado Interno
- `searchTerm` - Termo de busca
- `filters` - Filtros aplicados (tipo, categoria, status, datas)
- `currentPage` - Página atual da paginação

## Dependências
- Tipos e funções de `shared/types` (Transaction, CATEGORY_ICONS, PAYMENT_METHODS, STATUS_CONFIG, formatBRL, formatDateBR)
- Ícones do Lucide React

## Notas
- Filtros combinados (AND logic)
- Busca case-insensitive
- Atualiza contadores em tempo real
