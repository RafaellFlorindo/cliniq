# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status (atualizado 2026-05-30)

Landing page (página de vendas single-page) da **CliniQ** — sistema de captação/conversão/reputação para clínicas de estética. **Funcional, renderizando, 0 erros de console** (verificado rodando o app).

- ✅ Sobe e renderiza: `npm run dev` → http://localhost:3000 (proxy na raiz delega pra subpasta `cliniq/`). Verificado em desktop e mobile 390px (sem overflow horizontal).
- ℹ️ Avisos de console restantes são inofensivos: Babel in-browser (dev) + ícones Lucide ausentes (`instagram`/`facebook`/`linkedin` usam SVG inline).

### Sistema de design — "Clínico-Luxe" (premium claro)
- **Tipografia:** Fraunces (display serif) + Hanken Grotesk (UI). Carregadas via Google Fonts no `index.html`.
- **Paleta:** marfim quente `--surface #FAF7F1`, tinta navy, acento teal. Tokens em `styles/tokens.css`.
- **Atmosfera:** grão de filme (`.grain` no `index.html`), washes radiais ambientes, sombras em camadas.
- ✅ **Código morto removido:** Three.js (CDN) e `@font-face` Bricolage/Manrope + pasta `fonts/` — tudo apagado.

### Fundo contínuo — `PageCanvas.jsx` + `.page-flow` (landing.css)
- Tudo da `Integrations` até `Close` vive em **um único canvas** (`.page-flow`): gradiente quente + **grid blueprint** (`.flow-grid`) + **spine pontilhada** animada (`.flow-spine`, a "jornada do lead") + **washes ambientes** parallax (`FlowOrb`).
- `FlowEyebrow` = eyebrow que "pousa" na spine com um nó luminoso (`.flow-node`). Use nas aberturas de seção.
- `.navy-panel` = painel navy reutilizável (custo, oferta, CTA final) elevado sobre o canvas — substitui as antigas seções navy full-bleed.

### Motion / efeitos (todos zero-build, respeitam `prefers-reduced-motion`)
- **Lenis** (smooth scroll) via CDN, iniciado em `App.jsx`.
- **Parallax engine** em `App.jsx` lê `[data-parallax="<speed>"]` (rAF). Usado nos orbs do hero e nos `FlowOrb` do canvas.
- **Átomos em `atoms.jsx`** (exportados no `window`): `MagneticButton`, `useCountUp`/`CountUp`, `Stat`, `SourceTag`, `IllustrativeTag`, `ImagePlaceholder`.
- **Hero:** entrada em stagger (`.hero-stagger`); CTAs magnéticos. Microprova = badge **"21× mais conversão"** + frase do MIT.
- **Solution:** painel CRM com reveal 3D no scroll (`useScrollReveal`: rotateX/scale/translateY) — **imagem parada no hover** (sem tilt), elevação forte; 5 etapas com autoplay e linha conectora atrás dos cards.
- **Diagnosis / Proof / Offer:** count-up nos números (perda/recuperação, stats do setor, preço).
- **Nav:** glassmorphism no scroll (frosted + hairline dourado).

### Camada de credibilidade (dados reais com fonte) — IMPORTANTE
- **`Proof.jsx` StatBar** usa dados de SETOR com fonte citada (`Stat`+`SourceTag`), animados com count-up:
  - 21× (resposta em 5min) — MIT/Oldroyd · 23% no-show médio — MGMA/Curogram · ~30% redução com lembrete — Weave/Curogram · 87% leem reviews — BrightLocal 2024.
  - Bloco "De onde vêm esses números" com os 4 links no fim da seção.
- **Calculator** usa redução real de ~30% (Weave/Curogram), não mais um "6%" inventado.
- **Depoimentos** marcados com selo `IllustrativeTag` ("Ilustrativo") + foto trocada por `ImagePlaceholder` redondo. Trocar por depoimentos REAIS quando houver.
- **Guarantee:** escassez honesta — removido o "4 vagas em maio" (número falso que envelhece); agora "slots limitados por mês pra garantir qualidade".
- **Regra:** nunca inventar número de "cliente CliniQ". Só dado de setor (com fonte) OU rótulo "ilustrativo".

### Decisões conscientes (NÃO fazer)
- Sem **cursor custom** e sem **scroll horizontal** (atrito em mobile / quebram o fluxo linear de venda).
- Sem re-adicionar Three.js / WebGL / gradiente hue-rotate — fora do tom "Clínico-Luxe".

### Placeholders de imagem a trocar (busque `ImagePlaceholder` / `.img-ph`)
- `Proof.jsx`: fotos redondas dos depoimentos (quando tiver clientes reais).
- `Solution.jsx`: usa `images/crm-dashboard.png` real (trocar por print real do painel se quiser).

## Estrutura de diretórios (importante)

```
Documents/cliniq/            ← repositório / pasta que você abre no editor
├── package.json             ← proxy: "dev"/"start" chamam npm --prefix cliniq …
├── *.png                    ← screenshots de sessões anteriores (não são assets do site)
└── cliniq/                  ← O APP DE VERDADE mora aqui
    ├── index.html
    ├── package.json         ← scripts reais (npx serve)
    ├── components/*.jsx      ← 14 arquivos (Nav, Hero, Integrations, Diagnosis, Solution, Proof, Offer, Close, Footer, Quiz, App, atoms, TweaksPanel, PageCanvas)
    ├── styles/{tokens,landing}.css
    ├── vendor/*.js          ← React 18, ReactDOM, Babel, Lucide
    └── images/crm-dashboard.png
```
> A pasta `fonts/` foi removida — as fontes agora vêm do Google Fonts (Fraunces + Hanken Grotesk) no `index.html`.

## Commands

```bash
# Da raiz (Documents/cliniq) OU de dentro de cliniq/:
npm run dev    # serve em http://localhost:3000 (npx serve, sem build)
npm start      # idem, sem --no-clipboard
```

Não há build, lint ou test — é um projeto **zero-build**.

## Architecture

**No-bundler, browser-rendered React app.** Sem Webpack/Vite/Next.js. JSX é transpilado em runtime no browser pelo Babel (`vendor/babel.min.js`). React 18, ReactDOM e Lucide vêm de `vendor/`. (Three.js também é carregado da CDN, mas hoje não é usado — ver "código morto" acima.)

### Ordem de carregamento (`index.html`)

1. **Vendor:** `react.development.js` → `react-dom.development.js` → `babel.min.js` → `lucide.min.js` → Lenis (CDN)
2. `atoms.jsx` → primitivos no `window`
3. `TweaksPanel.jsx` → sistema de tweaks no `window`
4. `PageCanvas.jsx` → `FlowBackdrop` + `FlowEyebrow` (canvas contínuo) — **antes** das seções que usam `FlowEyebrow`
5. Componentes de seção (cada `<script type="text/babel">`): `Nav`, `Hero`, `Integrations`, `Diagnosis`, `Solution`, `Proof`, `Offer`, `Close`, `Footer`, `Quiz`
6. `App.jsx` → `ReactDOM.createRoot(document.getElementById('app'))`

> Para adicionar um componente novo: incluir no `index.html` **antes** de `App.jsx` e referenciar em `App.jsx`.

### Composição da página (ordem de render em `App.jsx`) — **6 seções**

Consolidado de 15 → 6 seções. `Hero` fica fora do canvas; tudo de `Integrations` em diante vive dentro de **um único `<div className="page-flow">`** com `<FlowBackdrop />` (fundo contínuo: grid blueprint + spine pontilhada + washes parallax). Seções dentro do flow são `background: transparent`; os momentos "navy" viram **painéis elevados** (`.navy-panel`) flutuando sobre o canvas.

`Nav` → `Hero` → **`.page-flow`** [ `FlowBackdrop` · `Integrations` · `Diagnosis` · `Solution` · `Proof` · `Offer` · `Close` ] → `Footer` → `Quiz` (modal)

| Seção | Âncora | Conteúdo |
|---|---|---|
| `Nav` | — | Navbar fixa; vira "frosted glass" após scroll > 40px |
| `Hero` | — | Headline com **WordCycler** (`Agenda cheia` / `No-show zero` / `5★ no Google`) + underline SVG animado. Fundo = dot-grid com highlight teal no mouse. 2 CTAs + microprova "21× mais conversão". |
| `Integrations` | — | Faixa fina de confiança sobre o canvas — marquee **contínuo** (não para no hover), só marcas reais (simpleicons CDN) |
| `Diagnosis` | `#problema` | **Problem + Calculator fundidos.** "Você reconhece…?" + cartão **prontuário** (6 sintomas, checklist vermelho) + painel navy de custo (perda vermelha / recuperação verde, 3 sliders) |
| `Solution` | `#solucao` | **Section2/Flow/Benefits fundidos.** "Um sistema que trabalha…" + painel CRM com reveal 3D (imagem **parada**, sem tilt) + chips flutuantes + 5 etapas (linha conectora **atrás** dos cards) + 3 outcomes |
| `Proof` | — | Banda editorial de stats com fonte (sem cards) + ribbon GoHighLevel + grid de depoimentos (`Ilustrativo`) |
| `Offer` | `#oferta` | "Plano Crescimento" — stack (8 módulos, valores riscados) + painel navy: R$ 1.497 vs R$ 5.300 riscado, economia verde, garantia 30d + escassez, CTA forte |
| `Close` | `#faq` | **Objections + Faq + CtaFinal fundidos.** FAQ única (8 perguntas, header sticky) + painel navy de fechamento (urgência + PS/PSS + WhatsApp) |
| `Footer` | — | Rodapé 4 colunas (navy) |
| `Quiz` | — | Modal overlay (aberto pelos CTAs via `onCtaClick`) |

> **Tokens de tweak:** restaram só `accentColor` e `density` (os toggles `showCalculator/showStoryboard/showProofStrip` saíram com a fusão das seções).

### Comunicação entre componentes via `window`

Sem ES modules. Cada arquivo expõe seus exports no `window` (ex.: `window.Hero = Hero;` ou `Object.assign(window, {…})`). Todos declaram `/* global React, … */` no topo documentando as dependências.

### Primitivos compartilhados (`components/atoms.jsx`)

`Object.assign(window, { Icon, Button, Badge, Container, Eyebrow, Reveal, GlowCard, SpotlightCard })`.

- `Icon` — ícone Lucide via `data-lucide` + `window.lucide.createIcons()`
- `Button` — `variant` (`primary` | `secondary` | `ghost`), `size` (`sm` | `md` | `lg`)
- `Badge` — `variant` (`teal` | …), opcional `dot`/`icon`
- `Container` — wrapper `.container`
- `Eyebrow` — rótulo capslock de seção
- `Reveal` — fade-up no scroll via `IntersectionObserver` (`delay`, `as`)
- `GlowCard` / `SpotlightCard` — cards com efeito de brilho/spotlight no hover

### TweaksPanel (`components/TweaksPanel.jsx`)

`App.jsx` chama `useTweaks(TWEAK_DEFAULTS)` para tweaks de design ao vivo. Os defaults vivem num bloco `/*EDITMODE-BEGIN*/…/*EDITMODE-END*/` para uma ferramenta host reescrever em disco. Defaults atuais:

| Chave | Tipo | Default |
|---|---|---|
| `accentColor` | color | `#4DB6AC` (teal) |
| `density` | radio | `regular` (`compact`/`comfy`) |
| `showCalculator` | toggle | `true` |
| `showStoryboard` | toggle | `true` |
| `showProofStrip` | toggle | `true` |

Controles usados em `App.jsx`: `TweakSection`, `TweakColor`, `TweakRadio`, `TweakToggle` (o módulo define outros). O painel fala com um frame pai via `postMessage` (`__activate_edit_mode`, `__edit_mode_set_keys`, …) — não remover esse protocolo.

### Sistema de cor de destaque

`App.jsx` define `ACCENT_PRESETS` (teal `#4DB6AC`, verde `#7AE582`, amarelo `#F4B400`, roxo `#7A5AE0`), cada um com `{ accent, soft, text }`. Ao mudar `t.accentColor`, seta `--accent`, `--accent-soft`, `--accent-text` no `:root`. Use esses tokens em vez de teal hardcoded quando a cor deve seguir o tema.

### Estilos & design tokens

`index.html` carrega `styles/tokens.css` (tokens) e `styles/landing.css` (utilitários). Não há `base.css`.

Fontes (via Google Fonts no `index.html`):
- `--font-display` → **Fraunces** (títulos, serif editorial; fallback Playfair Display)
- `--font-sans` → **Hanken Grotesk** (corpo/UI; fallback system)
- `--font-mono` → `JetBrains Mono` (fallback; não carregada explicitamente)

Tokens em `tokens.css`: cores `--navy-*` (marca/primário), `--teal-*` (accent), `--surface`/`--paper`/`--line`, texto `--ink-900…--ink-400`, semânticas (`--success`/`--warning`/`--danger`), escala `--text-xs…--text-6xl`, espaçamento `--space-*`, line-height/tracking, sombras e motion. `--section-pad` é definido dinamicamente pelo tweak de densidade em `App.jsx`.

### Ícones Lucide

`<Icon name="nome" />`. Após mudanças dinâmicas, chamar `window.lucide.createIcons()` (já feito globalmente no effect de render do `App.jsx`).
