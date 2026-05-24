/* global React, lucide */
// Shared atoms — Button, Badge, Icon helper, Container, Eyebrow

const { useEffect, useRef } = React;

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

Object.assign(window, { Icon, Button, Badge, Container, Eyebrow, Reveal });
