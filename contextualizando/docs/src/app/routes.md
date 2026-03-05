# app/routes.tsx

## Utilidade
Arquivo central de configuração das rotas da aplicação usando React Router. Gerencia estado global de transações e integração com Google Sheets.

## Funcionalidades
- Define todas as rotas da aplicação
- Configura o Layout como componente base (rota pai)
- Carrega dados do Google Sheets automaticamente ao iniciar
- Exibe loading overlay durante carregamento
- Passa dados de transações para todas as páginas

## Rotas Configuradas
- `/` → Dashboard (página inicial)
- `/fluxo-caixa` → Fluxo de Caixa (cadastro de transações)
- `/transacoes` → Lista de Transações (tabela com filtros)

## Estado Global
- `transactions` - Array de transações do Google Sheets
- `transactionsLoading` - Estado de carregamento
- `transactionsError` - Erro se houver

## Integração Google Sheets
```typescript
// Carrega automaticamente ao montar
const data = await service.getData('Lançamento!A:H');
const transactions = parseLancamentoSheetToTransactions(data);
```

## Loading
- Exibe `LoadingOverlay` com animação 3D durante carregamento
- Cubos animados formando "LOADING"

## Importância
Este arquivo é o ponto central de navegação e estado da aplicação.
