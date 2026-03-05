# shared/services/googleSheets.ts

## Responsabilidade
Serviço de integração com Google Sheets API para leitura de transações financeiras.

## Funcionalidades

### GoogleSheetsService (classe)

#### Métodos
- **getData(range)** - Busca dados de uma planilha

### Funções Utilitárias
- **createGoogleSheetsService(config)** - Factory function para criar instância
- **parseLancamentoSheetToTransactions(data)** - Converte dados da aba "Lançamento" para objetos Transaction

## Configuração
```typescript
const service = createGoogleSheetsService({
  spreadsheetId: "...",  // ID da planilha
  apiKey: "...",         // API Key (leitura)
});
```

## Uso
```typescript
// Buscar dados (todas as linhas, sem limite)
const data = await service.getData("Lançamento!A:H");

// Converter para objetos
const transactions = parseLancamentoSheetToTransactions(data);
```

## Variáveis de Ambiente
- `VITE_GOOGLE_SHEETS_ID` - ID da planilha
- `VITE_GOOGLE_API_KEY` - API Key

## Notas
- Requer Google Sheets API habilitada no Google Cloud Console
- API Key permite apenas leitura de planilhas públicas
- Não há suporte a escrita (append/update removidos)
- Busca ilimitada de dados (range A:H em vez de A1:H100)
