# shared/README.md

## Pasta Shared

## Responsabilidade
Recursos compartilhados entre todos os módulos da aplicação.

## Princípio
**Nada aqui deve depender de módulos específicos.**
Tudo nesta pasta pode ser usado por qualquer módulo.

## Estrutura Atual
```
shared/
├── components/
│   ├── layout/             # Componente de layout global
│   └── Loading3D/          # Animação de loading
├── config/
│   └── index.ts            # Configurações (env vars)
├── services/
│   ├── googleSheets.ts     # Serviço Google Sheets API
│   └── index.ts            # Exportações
└── types/
    ├── transactions.ts     # Tipos e funções de transações
    └── index.ts            # Exportações
```

## Componentes

### Layout
- Header com navegação
- Tema claro/escuro
- Responsivo (desktop e mobile)
- Drawer lateral no mobile

## Configurações

### config/index.ts
- Variáveis de ambiente (Google Sheets API)
- Validação de configurações

## Services

### GoogleSheetsService
- API client para Google Sheets
- Métodos: getData, appendData, updateData
- Parser de transações

## Importante
Antes de criar algo aqui, pergunte:
- Mais de um módulo vai usar isso?
- Isso é realmente genérico?

Se sim, coloque em `shared/`. Se não, mantenha no módulo específico.
