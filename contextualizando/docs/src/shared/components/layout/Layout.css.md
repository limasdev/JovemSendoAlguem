# shared/components/layout/Layout.css

## Utilidade
Folha de estilos CSS do componente de layout principal.

## Funcionalidades
- **Estilos da Navbar**: Header fixo no topo com backdrop blur
- **Logo**: Ícone gradiente com efeito hover
- **Navegação Desktop**: Links com estados hover e active
- **Botões de Ação**: Tema, notificações e avatar
- **Navegação Mobile**: 
  - Bottom bar fixa na parte inferior
  - Glassmorphism effect (blur + transparência)
  - Indicador de item ativo por cor
- **Drawer**: Painel lateral com animação slide
- **Responsividade**: Media queries para 768px e 480px

## Classes Principais
- `.ly-root`: Container principal do layout
- `.ly-navbar`: Barra de navegação superior
- `.ly-nav-desktop`: Navegação desktop (escondida no mobile)
- `.ly-actions-desktop`: Ações desktop (tema, notificações)
- `.ly-menu-btn`: Botão hambúrguer (só mobile)
- `.ly-nav-mobile`: Navbar inferior (só mobile)
- `.ly-drawer`: Painel lateral de configurações

## Tema
Suporte a dark/light mode via variáveis CSS.
