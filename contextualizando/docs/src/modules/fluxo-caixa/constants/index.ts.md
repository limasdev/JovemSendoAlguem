# modules/fluxo-caixa/constants/index.ts

## Utilidade
Arquivo de constantes e utilitários do módulo Fluxo de Caixa.

## Funcionalidades
- **Types**: Define a interface Transaction (transação financeira)
- **Categorias**: Lista de categorias para entradas e saídas
- **Ícones**: Emojis para cada categoria
- **Métodos de Pagamento**: Opções (Banco, PIX, Cartão, Dinheiro)
- **Status**: Configurações de status (Recebido, Pendente, Agendado, Pago)
- **Funções Utilitárias**:
  - `formatBRL()`: Formata valores em Reais
  - `todayISO()`: Retorna data atual no formato ISO
  - `formatDateBR()`: Converte data ISO para formato brasileiro

## Dados Exportados
- `Transaction`: Type para transações
- `CATEGORY_ICONS`: Record de emoji por categoria
- `ENTRADA_CATEGORIES`: Array com categorias de entrada
- `SAIDA_CATEGORIES`: Array com categorias de saída
- `PAYMENT_METHODS`: Record de emoji por método de pagamento
- `STATUS_CONFIG`: Configuração visual de cada status

## Importância
Centraliza todos os dados estáticos do módulo, facilitando manutenção e consistência.
