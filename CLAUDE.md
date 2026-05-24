# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # serve at http://localhost:3000 (uses npx serve, no build step)
npm start      # same, without --no-clipboard
```

There is no build, lint, or test command — this is a zero-build project.

## Architecture

This is a **no-bundler, browser-rendered React app**. There is no Webpack, Vite, or Next.js. JSX is transpiled at runtime in the browser by Babel (`vendor/babel.min.js`). All React and Lucide icons are also served from `vendor/`.

### Script loading order matters

`index.html` loads scripts in a specific sequence via `<script type="text/babel" src="...">`. Each file can reference globals set by prior files. The order is:

1. `atoms.jsx` — exposes shared primitives to `window`
2. `TweaksPanel.jsx` — exposes the tweaks system to `window`
3. Section components (`Nav`, `Hero`, `Problem`, `Flow`, `Calculator`, `Benefits`, `Proof`, `Offer`, `Guarantee`, `Objections`, `Faq`, `CtaFinal`, `Footer`, `Quiz`)
4. `App.jsx` — mounts `ReactDOM.createRoot(document.getElementById('app'))`

Adding a new component requires adding it to `index.html` **before** `App.jsx` and referencing it in `App.jsx`.

### Inter-component communication via `window`

Components don't use ES module imports. Each file assigns its exports to `window` at the bottom:

```js
Object.assign(window, { Icon, Button, Badge, Container, Eyebrow, Reveal });
```

All JSX files declare `/* global React, ... */` at the top to document which globals they depend on.

### Shared atoms (`components/atoms.jsx`)

Reusable primitives used across all section components:
- `Icon` — renders a Lucide icon via `data-lucide` attribute + `window.lucide.createIcons()`
- `Button` — `variant` prop: `'primary'` | `'secondary'` | `'ghost'`; `size`: `'sm'` | `'md'` | `'lg'`
- `Badge` — `variant` prop: `'teal'` | other; optional `dot` and `icon` props
- `Container` — wraps content in `.container` div
- `Eyebrow` — uppercased label with `.eyebrow` class
- `Reveal` — scroll-triggered fade-up animation via `IntersectionObserver`; accepts `delay` (ms) and `as` (HTML tag)

### TweaksPanel system (`components/TweaksPanel.jsx`)

`App.jsx` uses `useTweaks(TWEAK_DEFAULTS)` to manage live design tweaks. The defaults live in a `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` block so a host tool can rewrite them on disk. Available controls: `TweakColor`, `TweakRadio`, `TweakToggle`, `TweakSlider`, `TweakNumber`, `TweakText`, `TweakSelect`, `TweakButton`, `TweakSection`.

The panel communicates with a parent frame via `postMessage` (`__activate_edit_mode`, `__edit_mode_set_keys`, etc.) — do not remove this protocol.

### Accent color system

`App.jsx` defines `ACCENT_PRESETS` mapping hex colors to `{ accent, soft, text }` triplets. When `t.accentColor` changes, it sets `--accent`, `--accent-soft`, and `--accent-text` on `:root`. Use these tokens in components instead of hardcoded teal values when the color should be theme-aware.

### Design tokens (`styles/tokens.css`)

All colors, spacing, typography, radius, shadows, and motion values are CSS custom properties. Key ones:

- Colors: `--navy-800` (primary brand), `--teal-500` (accent), `--surface`, `--paper`, `--line`
- Text: `--ink-900` (headings) → `--ink-400` (disabled)
- Fonts: `--font-sans` (Manrope), `--font-display` (Bricolage Grotesque)
- Spacing: `--space-1` (4px) through `--space-32` (128px)
- Shadows: `--shadow-xs` through `--shadow-xl`, `--shadow-teal`
- Motion: `--ease-out`, `--dur-fast` (140ms), `--dur-base` (220ms), `--dur-slow` (420ms)

Section padding is controlled by `--section-pad`, dynamically set by the density tweak in `App.jsx`.

### Lucide icons

Icons render via `<Icon name="icon-name" />`. After dynamic content changes, call `window.lucide.createIcons()` (already handled globally in `App.jsx`'s render effect).
