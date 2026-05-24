# CLINIQ — Landing Page

> **"Agenda cheia, no-show zerado e 5★ no Google, no piloto automático."**

Sistema de vendas automatizado para clínicas de estética. Esta landing page captura leads qualificados, apresenta a solução CLINIQ e converte visitantes via quiz interativo.

---

## Proposta de valor

| Problema da clínica | O que a CLINIQ resolve |
|---|---|
| Leads que somem sem agendar | WhatsApp AI faz follow-up automático |
| No-show destrói o faturamento | Confirmações 48h/24h/2h + IA de reagendamento |
| Poucas avaliações no Google | Filtro automático de reviews 5★ |
| Site que não converte | Landing page SEO otimizada integrada |
| WhatsApp desorganizado | Funil centralizado no GoHighLevel |

---

## Stack & dependências

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18.3.1 | UI — todos os componentes |
| ReactDOM | 18.x | Renderização no DOM (`#app`) |
| Babel Standalone | latest | Transpilação JSX no browser |
| Lucide Icons | latest | Ícones via `window.lucide.createIcons()` |
| Bricolage Grotesque | 500–800 | Fonte display (headlines) |
| Manrope | 400–700 | Fonte corpo (texto corrido) |

> Não há build step. Tudo roda direto no browser via Babel Standalone + script tags.

---

## Estrutura de arquivos

```
cliniq/
│
├── index.html                  ← Entrada — carrega todos os módulos em ordem
│
├── styles/
│   ├── tokens.css              ← Design tokens (cores, tipografia, espaçamento, sombras)
│   ├── base.css                ← Reset + estilos semânticos (h1–h6, p, a, code…)
│   └── landing.css             ← Utilitários compartilhados (btn, badge, card, reveal…)
│
├── components/
│   ├── atoms.jsx               ← Primitivos: Icon, Button, Badge, Container, Eyebrow, Reveal
│   ├── Nav.jsx                 ← Navbar fixa com scroll-aware frosted-glass
│   ├── Hero.jsx                ← Hero + HeroDashboard + ChatMock + floating chips
│   ├── Problem.jsx             ← Grid de 6 dores (seção #problema)
│   ├── Flow.jsx                ← Storyboard de 5 passos auto-cycling (seção #solucao)
│   ├── Calculator.jsx          ← Calculadora de prejuízo no-show (dark navy)
│   ├── Benefits.jsx            ← Grid de 8 benefícios
│   ├── Proof.jsx               ← Stat bar + credibility bar + depoimentos
│   ├── Offer.jsx               ← Precificação / stack de módulos (seção #oferta)
│   ├── Guarantee.jsx           ← Garantia 30 dias + escassez (4 vagas)
│   ├── Objections.jsx          ← Accordion de 6 objeções respondidas
│   ├── Faq.jsx                 ← Accordion de 8 perguntas frequentes
│   ├── CtaFinal.jsx            ← CTA final dark navy + urgência
│   ├── Footer.jsx              ← Rodapé 4 colunas
│   ├── Quiz.jsx                ← Modal overlay — quiz de 4 perguntas + WhatsApp CTA
│   └── TweaksPanel.jsx         ← Painel de design-time: cor, densidade, seções visíveis
│
└── fonts/                      ← Arquivos .woff2 de Bricolage Grotesque e Manrope
    ├── bricolage-*.woff2
    └── manrope-*.woff2
```

---

## Componentes

### Átomos compartilhados (`atoms.jsx`)

Primitivos usados em todas as seções. Exportados para `window` para que os outros módulos os consumam sem import explícito.

| Componente | Descrição |
|---|---|
| `Icon` | Renderiza ícone Lucide por nome (`name`, `size`, `strokeWidth`) |
| `Button` | Botão com variantes: `primary`, `secondary`, `teal`, `ghost`, `onnavy`, `link-light` |
| `Badge` | Tag pill com variantes: `teal`, `navy`, `outline`, `on-navy` |
| `Container` | Wrapper `max-width: 1200px` com padding responsivo |
| `Eyebrow` | Rótulo capslock em teal — texto acima de títulos de seção |
| `Reveal` | Wrapper com IntersectionObserver — anima entrada via `translateY + opacity` |

### Seções da página

| Componente | ID / âncora | Fundo | Descrição curta |
|---|---|---|---|
| `Nav` | — | Transparente → frosted | Navbar fixa; scroll > 24px ativa backdrop-filter |
| `Hero` | — | `--paper` | Headline display-xxl, 2 CTAs, dashboard mockup animado |
| `Problem` | `#problema` | `--surface` | 6 cards de dores; ícones vermelhos |
| `Flow` | `#solucao` | `--paper` | 5 passos auto-cycling (2.800ms), pausa fora do viewport |
| `Calculator` | — | `--navy-900` | 3 sliders → calcula prejuízo mensal em tempo real |
| `Benefits` | — | `--surface` | 8 cards de benefícios com hover lift |
| `Proof` | — | `--paper` | Stats bar 4 cols + credibilidade GHL + 3 depoimentos |
| `Offer` | `#oferta` | `--surface` | Checklist de 9 módulos + card de preço dark navy |
| `Guarantee` | — | `--paper` | Garantia 30 dias + escassez "4 vagas" pulsante |
| `Objections` | — | `--surface` | 6 objeções expandíveis; index 0 aberto por padrão |
| `Faq` | — | `--paper` | 8 perguntas; um item por vez |
| `CtaFinal` | — | `--navy-900` | CTA urgência + botão WhatsApp |
| `Footer` | — | `--paper` | Grid 4 cols; links de produto, empresa, contato e legal |
| `Quiz` | — | overlay | Modal 4 perguntas; auto-avança 280ms após seleção; Esc fecha |

### TweaksPanel (`TweaksPanel.jsx`)

Painel flutuante e arrastável para ajustes em tempo de design. Comunicação via `postMessage` com o host (Cowork/bundler).

Tweaks disponíveis na `App`:

| Chave | Tipo | Opções |
|---|---|---|
| `accentColor` | `TweakColor` | Teal `#4DB6AC`, verde `#7AE582`, amarelo `#F4B400`, roxo `#7A5AE0` |
| `density` | `TweakRadio` | `compact`, `regular`, `comfy` |
| `showCalculator` | `TweakToggle` | boolean |
| `showStoryboard` | `TweakToggle` | boolean |
| `showProofStrip` | `TweakToggle` | boolean |

---

## Design tokens principais (`styles/tokens.css`)

```css
/* Cores primárias */
--navy-900: #081A2C   /* fundo hero escuro, botões */
--navy-800: #0F2E4A   /* headings, brand */
--teal-500: #4DB6AC   /* accent padrão — highlights, links */
--teal-700: #2F8B82   /* texto accent, eyebrow */

/* Superfícies */
--surface:  #F5F7FA   /* fundo de seções alternadas */
--paper:    #FFFFFF   /* cards, seções brancas */
--line:     #E4E9F0   /* bordas, divisores */

/* Tipografia */
--font-display: 'Bricolage Grotesque'  /* headlines display */
--font-sans:    'Manrope'              /* corpo de texto */

/* Escala de tipo */
--text-base: 16px  → --text-6xl: 76px

/* Movimento */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1)
--dur-base: 220ms
```

---

## Ordem de carregamento (`index.html`)

Os módulos precisam ser carregados na seguinte ordem — cada arquivo depende dos `window.*` definidos pelos anteriores:

```
1. styles/tokens.css
2. styles/base.css
3. styles/landing.css
4. fonts (via @font-face no tokens.css)
5. React 18 (react.development.js)
6. ReactDOM 18 (react-dom.development.js)
7. Babel Standalone
8. Lucide Icons
9. components/atoms.jsx        → define window.{ Icon, Button, Badge, Container, Eyebrow, Reveal }
10. components/TweaksPanel.jsx → define window.{ useTweaks, TweaksPanel, … }
11. components/Nav.jsx         → define window.Nav
12. components/Hero.jsx        → define window.Hero
13. components/Problem.jsx     → define window.Problem
14. components/Flow.jsx        → define window.Flow
15. components/Calculator.jsx  → define window.Calculator
16. components/Benefits.jsx    → define window.Benefits
17. components/Proof.jsx       → define window.Proof
18. components/Offer.jsx       → define window.Offer
19. components/Guarantee.jsx   → define window.Guarantee
20. components/Objections.jsx  → define window.Objections
21. components/Faq.jsx         → define window.Faq
22. components/CtaFinal.jsx    → define window.CtaFinal
23. components/Footer.jsx      → define window.Footer
24. components/Quiz.jsx        → define window.Quiz
25. components/App.jsx         → monta ReactDOM.createRoot('#app')
```

---

## Quiz de qualificação

4 perguntas → gera lead qualificado → CTA WhatsApp:

1. **Como está sua agenda hoje?** — Sempre cheia / Metade vazia / Quase vazia / Começando agora
2. **De onde vêm seus clientes?** — Instagram/TikTok / Google / Indicação / Misto
3. **Quantos atendimentos/dia?** — 1–3 / 4–8 / 9–15 / 15+
4. **Quando quer começar?** — Agora / Em 1 mês / Em 3 meses / Só explorando

Após completar: "A gente analisa suas respostas e te chama no WhatsApp em até 24h úteis."

---

## Licença

Projeto proprietário — CLINIQ © 2025. Todos os direitos reservados.
