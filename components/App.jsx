/* global React, ReactDOM, lucide,
   Nav, Hero, Integrations, Diagnosis, Solution, Proof, Offer, Close, Footer, Quiz, FlowBackdrop,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#4DB6AC",
  "density": "regular"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  '#4DB6AC': { accent: '#4DB6AC', soft: '#E0F4F2', text: '#2F8B82' },
  '#7AE582': { accent: '#7AE582', soft: '#E8FBE9', text: '#1F8A3D' }, // verde neon Revex
  '#F4B400': { accent: '#F4B400', soft: '#FBF1DC', text: '#8A6A0A' },
  '#7A5AE0': { accent: '#7A5AE0', soft: '#EFE9FC', text: '#4A2EA8' },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [quizOpen, setQuizOpen] = useState(false);

  // Apply accent color tokens to root
  useEffect(() => {
    const preset = ACCENT_PRESETS[t.accentColor] || ACCENT_PRESETS['#4DB6AC'];
    const root = document.documentElement;
    root.style.setProperty('--accent', preset.accent);
    root.style.setProperty('--accent-soft', preset.soft);
    root.style.setProperty('--accent-text', preset.text);
  }, [t.accentColor]);

  // Apply density (controls section padding)
  useEffect(() => {
    const root = document.documentElement;
    if (t.density === 'compact') root.style.setProperty('--section-pad', '64px');
    else if (t.density === 'comfy') root.style.setProperty('--section-pad', '140px');
    else root.style.setProperty('--section-pad', '112px');
    const css = document.getElementById('density-css');
    if (css) css.remove();
    const style = document.createElement('style');
    style.id = 'density-css';
    const pad = t.density === 'compact' ? 64 : t.density === 'comfy' ? 140 : 112;
    const padMobile = t.density === 'compact' ? 48 : t.density === 'comfy' ? 96 : 80;
    style.innerHTML = `
      section { padding: ${padMobile}px 0; }
      @media (min-width: 900px) { section { padding: ${pad}px 0; } }
    `;
    document.head.appendChild(style);
  }, [t.density]);

  // Lucide icons after each render
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  // Parallax engine — desloca [data-parallax] proporcional ao scroll (depth)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let els = [];
    let ticking = false;
    const collect = () => { els = Array.from(document.querySelectorAll('[data-parallax]')); };
    const apply = () => {
      const vh = window.innerHeight;
      for (const el of els) {
        const speed = parseFloat(el.dataset.parallax) || 0;
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue; // fora de vista
        const offset = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${(-offset * speed * 100).toFixed(2)}px, 0)`;
      }
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
    const onResize = () => { collect(); onScroll(); };
    collect(); apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const t = setTimeout(() => { collect(); apply(); }, 500); // recoleta após mount completo
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, []);

  // Lenis — smooth scroll (rolagem com peso)
  useEffect(() => {
    if (!window.Lenis) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new window.Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; };
  }, []);

  const openQuiz = () => setQuizOpen(true);
  const closeQuiz = () => setQuizOpen(false);

  return (
    <>
      <Nav onCtaClick={openQuiz} />
      <Hero onCtaClick={openQuiz} />

      {/* Canvas contínuo único — integra da seção 2 até o fim */}
      <div className="page-flow">
        <FlowBackdrop />
        <Integrations />
        <Diagnosis onCtaClick={openQuiz} />
        <Solution />
        <Proof />
        <Offer onCtaClick={openQuiz} />
        <Close onCtaClick={openQuiz} />
      </div>

      <Footer />

      <Quiz open={quizOpen} onClose={closeQuiz} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Estética" />
        <TweakColor
          label="Cor de destaque"
          value={t.accentColor}
          options={['#4DB6AC', '#7AE582', '#F4B400', '#7A5AE0']}
          onChange={(v) => setTweak('accentColor', v)}
        />
        <TweakRadio
          label="Densidade"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
