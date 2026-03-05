# shared/config/index.ts

## Responsabilidade
Centraliza configurações e variáveis de ambiente da aplicação.

## Exports

### config
Objeto com todas as configurações:
```typescript
config.googleSheets.spreadsheetId   // VITE_GOOGLE_SHEETS_ID
config.googleSheets.apiKey          // VITE_GOOGLE_API_KEY
config.googleSheets.accessToken     // VITE_GOOGLE_ACCESS_TOKEN
```

### validateConfig()
Função para validar se as configurações obrigatórias estão definidas.

## Uso
```typescript
import { config, validateConfig } from "../shared/config";

// Validação opcional no início da aplicação
validateConfig();

// Uso das configurações
const sheetsService = createGoogleSheetsService({
  spreadsheetId: config.googleSheets.spreadsheetId,
  apiKey: config.googleSheets.apiKey,
});
```

## Variáveis de Ambiente Necessárias
- `VITE_GOOGLE_SHEETS_ID` - ID da planilha Google Sheets
- `VITE_GOOGLE_API_KEY` - API Key do Google Cloud
- `VITE_GOOGLE_ACCESS_TOKEN` - Token OAuth (opcional, para escrita)

## Notas
- Usa `import.meta.env` do Vite para acessar variáveis
- Valores vazios retornam string vazia (não null/undefined)
- `validateConfig()` apenas loga warnings, não lança erros
