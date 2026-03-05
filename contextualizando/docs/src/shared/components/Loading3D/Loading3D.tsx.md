# shared/components/Loading3D/Loading3D.tsx

## Utilidade
Componente de loading animado com cubos 3D formando a palavra "LOADING".

## Design
- 7 cubos em grid horizontal (L-O-A-D-I-N-G)
- Animação 3D com rotação e brilho
- Cores: Verde neon (#00cc44) em destaque
- Efeito de ondulação sequencial

## Animações CSS
- `translate-z` - Movimento de profundidade
- `face-color` - Mudança de cor dos cubos
- `face-glow` - Efeito de brilho nas letras
- `edge-glow` - Brilho nas bordas

## Uso
```tsx
import { Loading3D } from "./shared/components/Loading3D";

function MyComponent() {
  if (loading) return <Loading3D />;
  return <div>Conteúdo</div>;
}
```

## LoadingOverlay
Wrapper que exibe o loading em tela cheia com fundo escuro.

```tsx
import { LoadingOverlay } from "./shared/components/Loading3D/LoadingOverlay";

<LoadingOverlay message="Carregando dados..." />
```

## Créditos
Baseado em animação de [dexter-st no Uiverse.io](https://uiverse.io)
