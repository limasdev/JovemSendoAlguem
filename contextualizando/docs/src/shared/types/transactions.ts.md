# shared/types/transactions.ts

## Responsabilidade
Tipos e funções utilitárias para transações financeiras, usados por todos os módulos.

## Tipo Transaction
```typescript
interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: "entrada" | "saida";
  paymentMethod: string;
  status: "recebido" | "pendente" | "agendado" | "pago";
}
```

## Funções Utilitárias

### formatBRL(value)
Formata número para moeda brasileira (R$).
```typescript
formatBRL(1000) // "R$ 1.000,00"
```

### todayISO()
Retorna data atual no formato YYYY-MM-DD.

### formatDateBR(iso)
Converte data ISO para formato brasileiro DD/MM/YYYY.

## Funções Dinâmicas (da Planilha)

### getCategoriesFromTransactions(transactions, type?)
Extrai categorias únicas das transações carregadas.
```typescript
// Todas as categorias
getCategoriesFromTransactions(transactions)

// Apenas categorias de entrada
getCategoriesFromTransactions(transactions, "entrada")

// Apenas categorias de saída  
getCategoriesFromTransactions(transactions, "saida")
```

### getPaymentMethodsFromTransactions(transactions)
Extrai métodos de pagamento únicos das transações.

## Constantes

### ENTRADA_CATEGORIES
Lista padrão de categorias de entrada (fallback quando não há transações).

### SAIDA_CATEGORIES
Lista padrão de categorias de saída (fallback quando não há transações).

### PAYMENT_METHODS
Métodos de pagamento disponíveis.
- Banco
- PIX
- Cartão Débito
- Cartão Crédito
- Dinheiro

### STATUS_CONFIG
Configuração de status com labels e classes CSS.
- recebido (verde)
- pendente (amarelo)
- agendado (azul)
- pago (verde)

## Uso
```typescript
import type { Transaction } from "../shared/types";
import { formatBRL, getCategoriesFromTransactions } from "../shared/types";
```

## Notas
- Tudo é exportado de `shared/types/index.ts`
- Categorias dinâmicas extraídas da planilha em tempo real
- Constantes servem como fallback quando não há dados
