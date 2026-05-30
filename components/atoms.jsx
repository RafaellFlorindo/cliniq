/* global React, lucide */
// Shared atoms — Button, Badge, Icon helper, Container, Eyebrow, GlowCard

const { useEffect, useRef } = React;

// Global cursor tracker — feeds --cursor-x / --cursor-y to all .glow-card::before
(function () {
  document.addEventListener('pointermove', function (e) {
    document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
  });
})();

/** Renders a Lucide icon. Re-creates on mount/update. */
function Icon({ name, size = 18, strokeWidth = 1.75, color, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = `<i data-lucide="${name}" style="width:${size}px;height:${size}px;stroke-width:${strokeWidth}"></i>`;
      window.lucide.createIcons({
        attrs: { 'stroke-width': strokeWidth, width: size, height: size },
      });
    }
  }, [name, size, strokeWidth]);
  return <span ref={ref} style={{ display: 'inline-flex', color, ...(style || {}) }} />;
}

function Button({ children, variant = 'primary', size = 'md', icon, iconRight, onClick, type = 'button', disabled, style, ...rest }) {
  const cls = ['btn', `btn-${variant}`];
  if (size === 'lg') cls.push('btn-lg');
  if (size === 'sm') cls.push('btn-sm');
  return (
    <button type={type} className={cls.join(' ')} onClick={onClick} disabled={disabled} style={style} {...rest}>
      {icon && <Icon name={icon} size={size === 'lg' ? 18 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 18 : 16} />}
    </button>
  );
}

function Badge({ children, variant = 'teal', dot = false, icon, style }) {
  const cls = ['badge', `badge-${variant}`];
  if (dot) cls.push('badge-dot');
  return (
    <span className={cls.join(' ')} style={style}>
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}

function Container({ children, style, className = '' }) {
  return <div className={`container ${className}`} style={style}>{children}</div>;
}

function Eyebrow({ children, style }) {
  return <span className="eyebrow" style={style}>{children}</span>;
}

/** Reveals children on scroll into view */
function Reveal({ children, delay = 0, as: Tag = 'div', style, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already in viewport on mount, reveal immediately (after delay)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    // Fallback: if IO never fires (rare), reveal after 1s
    const fb = setTimeout(() => setVisible(true), 1000 + delay);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, [delay]);
  const mergedStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 420ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1)',
    ...(style || {}),
  };
  return <Tag ref={ref} style={mergedStyle} {...rest}>{children}</Tag>;
}

/** Full per-element spotlight glow card — tracks mouse per-element for precise border glow. */
function SpotlightCard({ children, className, style, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onMove(e) {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', (e.clientX - r.left) + 'px');
      el.style.setProperty('--y', (e.clientY - r.top) + 'px');
    }
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);
  return (
    <div ref={ref} data-glow="" className={className || ''} style={style} {...rest}>
      {children}
    </div>
  );
}

const GlowCard = SpotlightCard;

/* ─── MagneticButton — o alvo "puxa" levemente o cursor ──────────────────── */
function MagneticButton({ children, strength = 0.35, className = '', style = {}, ...props }) {
  const ref = useRef(null);
  const fine = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(pointer: fine)').matches : true;
  const onMove = (e) => {
    if (!fine) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px)`;
  };
  const reset = () => { const el = ref.current; if (el) el.style.transform = 'translate(0px, 0px)'; };
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{
        display: 'inline-flex',
        transition: 'transform 320ms cubic-bezier(0.34,1.56,0.64,1)',
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}

/* ─── useCountUp — anima 0 → alvo quando entra na viewport ────────────────── */
function useCountUp(target, options) {
  const duration = (options && options.duration) || 1600;
  const ref = useRef(null);
  const [val, setVal] = React.useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(target); return; }
    let raf = null;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(target * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.45 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [target, duration]);
  return [ref, val];
}

/* ─── CountUp — número que sobe (prefixo/sufixo/decimais opcionais) ───────── */
function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1600, className = '', style = {} }) {
  const [ref, val] = useCountUp(to, { duration });
  const formatted = val.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return <span ref={ref} className={className} style={style}>{prefix}{formatted}{suffix}</span>;
}

/* ─── SourceTag — procedência discreta de um dado ("Fonte: …") ───────────── */
function SourceTag({ children, href, onNavy = false }) {
  const cls = onNavy ? 'source-tag source-tag-navy' : 'source-tag';
  const inner = <>Fonte: {children}</>;
  if (href) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
    );
  }
  return <span className={cls}>{inner}</span>;
}

/* ─── Stat — número grande com count-up + label + fonte citada ────────────── */
function Stat({ to, prefix = '', suffix = '', decimals = 0, duration = 1500, label, source, sourceHref, onNavy = false, big = false }) {
  return (
    <div className={`stat${onNavy ? ' stat-navy' : ''}${big ? ' stat-big' : ''}`}>
      <div className="stat-value tnum">
        <CountUp to={to} prefix={prefix} suffix={suffix} decimals={decimals} duration={duration} />
      </div>
      {label && <div className="stat-label">{label}</div>}
      {source && <SourceTag href={sourceHref} onNavy={onNavy}>{source}</SourceTag>}
    </div>
  );
}

/* ─── IllustrativeTag — selo honesto "Ilustrativo" ───────────────────────── */
function IllustrativeTag({ style }) {
  return <span className="illustrative" style={style}>Ilustrativo</span>;
}

/* ─── ImagePlaceholder — slot reservado com descrição da imagem ideal ─────── */
function ImagePlaceholder({ label, hint, ratio = '16 / 10', round = false, style = {} }) {
  return (
    <div
      className={`img-ph${round ? ' img-ph-round' : ''}`}
      style={{ aspectRatio: round ? '1 / 1' : ratio, ...style }}
      role="img"
      aria-label={label}
    >
      <Icon name="image" size={round ? 18 : 26} strokeWidth={1.6} />
      <span className="img-ph-label">{label}</span>
      {hint && <span className="img-ph-hint">{hint}</span>}
    </div>
  );
}

Object.assign(window, {
  Icon, Button, Badge, Container, Eyebrow, Reveal, GlowCard, SpotlightCard,
  MagneticButton, useCountUp, CountUp,
  SourceTag, Stat, IllustrativeTag, ImagePlaceholder,
});
