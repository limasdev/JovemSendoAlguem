# index.css

## Utilidade
Folha de estilos global da aplicação.

## Funcionalidades
- **Reset CSS**: Remove estilos padrão do navegador
- **Variáveis CSS**: Define tema claro e escuro
  - Cores de superfície (surface, surface-2, surface-3)
  - Cores de texto (text, text-subtle, text-muted)
  - Cores de destaque (accent, accent-soft, accent-dim)
  - Cores semânticas (green, red, amber)
  - Bordas e raios (radius, radius-sm, radius-md)
  - Sombras e transições
- **Tema Dark**: Variáveis para modo escuro
- **Tema Light**: Variáveis para modo claro
- **Tipografia**: Fonte Inter e Monospace
- **Estilos Base**: html, body, #root

## Variáveis Principais
- `--bg`: Cor de fundo da página
- `--surface`: Cor de fundo de cards
- `--text`: Cor principal do texto
- `--accent`: Cor de destaque (verde)
- `--green`: Cor para valores positivos
- `--red`: Cor para valores negativos
- `--border`: Cor de bordas

## Modo de Uso
As variáveis são usadas em todos os componentes via `var(--nome)`.
O tema é alternado via atributo `data-theme` no HTML.

## Importância
Define a identidade visual do sistema e garante consistência entre componentes.
