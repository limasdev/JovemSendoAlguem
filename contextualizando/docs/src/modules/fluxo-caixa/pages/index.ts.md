# modules/fluxo-caixa/pages/index.ts

## Utilidade
Arquivo de exportação (barrel export) do módulo Fluxo de Caixa.

## Funcionalidades
- Centraliza as exportações do módulo
- Facilita imports em outros arquivos
- Abstrai a estrutura interna do módulo

## Exportações
- `FluxoCaixa`: Componente principal da página

## Benefícios
Em vez de importar diretamente do arquivo:
```typescript
import { FluxoCaixa } from './modules/fluxo-caixa/pages/FluxoCaixaPage';
```

Importa-se do index:
```typescript
import { FluxoCaixa } from './modules/fluxo-caixa/pages';
```

Isso permite mudar a estrutura interna sem quebrar imports externos.

## Importância
Padrão de organização que melhora a manutenibilidade do código.
