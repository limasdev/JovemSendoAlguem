# modules/dashboard/pages/index.ts

## Utilidade
Arquivo de exportação (barrel export) do módulo Dashboard.

## Funcionalidades
- Centraliza as exportações do módulo Dashboard
- Facilita imports em outros arquivos
- Abstrai a estrutura interna do módulo

## Exportações
- `Dashboard`: Componente principal da página Dashboard

## Uso
```typescript
import { Dashboard } from './modules/dashboard/pages';
```

Ao invés de:
```typescript
import { Dashboard } from './modules/dashboard/pages/DashboardPage';
```

## Importância
Padrão que permite refatorar a estrutura interna sem quebrar imports externos.
