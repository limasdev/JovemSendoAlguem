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
└── components/
    └── layout/
        ├── Layout.tsx      # Componente de layout global
        ├── Layout.css      # Estilos do layout
        └── index.ts        # Exportação
```

## Componentes

### Layout
- Header com navegação
- Tema claro/escuro
- Responsivo (desktop e mobile)
- Drawer lateral no mobile

## Futuras Adições
```
shared/
├── components/
│   ├── ui/               # Botões, inputs, cards genéricos
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   └── layout/           # Componentes de layout
│       └── Layout.tsx
├── hooks/                # Hooks customizados reutilizáveis
│   └── useLocalStorage.ts
├── utils/                # Funções utilitárias
│   └── formatters.ts
├── types/                # Types globais
│   └── index.ts
└── constants/            # Constantes globais
    └── theme.ts
```

## Importante
Antes de criar algo aqui, pergunte:
- Mais de um módulo vai usar isso?
- Isso é realmente genérico?

Se sim, coloque em `shared/`. Se não, mantenha no módulo específico.
