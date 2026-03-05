# shared/services/index.ts

## Responsabilidade
Ponto central de exportação para todos os serviços da aplicação.

## Exports

```typescript
export {
  GoogleSheetsService,           // Classe principal
  createGoogleSheetsService,     // Factory function
  type GoogleSheetsConfig,       // Interface de configuração
} from "./googleSheets.ts";
```

## Uso
```typescript
import {
  GoogleSheetsService,
  createGoogleSheetsService,
  type GoogleSheetsConfig,
} from "../shared/services";

// Usando factory
const service = createGoogleSheetsService({
  spreadsheetId: "...",
  apiKey: "...",
});

// Ou instanciando diretamente
const service2 = new GoogleSheetsService(config);
```

## Notas
- Mantém imports limpos em outros arquivos
- Facilita refatoração (mudanças internas não afetam consumidores)
- Padrão barrel export
