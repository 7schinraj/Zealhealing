import React, { useState, useEffect } from 'react';

// ─── SVG icon components ───────────────────────────────────────────────────
const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconLeaf = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.17L2 22l2.5-1C8 19 12.42 18 17 8z"/>
    <path d="M17 8c0 0 1 8-8 14"/>
  </svg>
);

const IconShop = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const IconCrystal = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
  </svg>
);

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// ─── Menu data ─────────────────────────────────────────────────────────────
const menus = [
  { label: 'Home',     href: '#home',     Icon: IconHome    },
  { label: 'Services', href: '#services', Icon: IconStar    },
  { label: 'About Us', href: '#aboutus',  Icon: IconLeaf    },
  { label: 'Shop',     href: '#shop',     Icon: IconShop    },
  { label: 'Sessions', href: '#sessions', Icon: IconCrystal },
  { label: 'Contact',  href: '#contact',  Icon: IconMail    },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      for (let i = menus.length - 1; i >= 0; i--) {
        const id  = menus[i].href.replace('#', '');
        const el  = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ─── Top navbar ─────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        padding: `clamp(14px, 1.5vw, 22px) clamp(20px, 5vw, 60px)`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.90)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'var(--color-border-soft)' : 'transparent'}`,
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.07)' : 'none',
        transition: 'all 0.3s ease',
      }}>

        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M32 4C32 4 12 20 12 38C12 49.05 21.17 58 32 58C42.83 58 52 49.05 52 38C52 20 32 4 32 4Z" fill="var(--color-primary)"/>
            <path d="M32 16C32 16 20 28 20 38C20 44.63 25.37 50 32 50C38.63 50 44 44.63 44 38C44 28 32 16 32 16Z" fill="var(--color-accent-gold)" opacity="0.85"/>
            <circle cx="32" cy="38" r="7" fill="white" opacity="0.9"/>
          </svg>
          <span style={{
            fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: '700',
            color: 'var(--color-primary)', fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: '0.02em',
          }}>Zealhealing</span>
        </a>

        {/* Desktop nav links */}
        <div className="nav-menus" style={{ display: 'flex', gap: 'clamp(10px, 1.8vw, 28px)', alignItems: 'center' }}>
          {menus.map(({ label, href }) => {
            const isActive = activeSection === href.replace('#', '');
            return (
              <a key={label} href={href} className={`nav-link ${isActive ? 'active' : ''}`}>
                {label}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <a href="#contact" className="btn btn-primary nav-cta"
          style={{ padding: 'clamp(10px,1vw,12px) clamp(18px,2vw,28px)', fontSize: 'clamp(12px,1vw,14px)' }}>
          🌿 Book Consultation
        </a>

        {/* Hamburger button (mobile only) */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(o => !o)}
          className="hamburger-btn"
          style={{
            display: 'none', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '5px',
            width: '42px', height: '42px', flexShrink: 0,
            background: menuOpen ? 'var(--color-primary-subtle)' : 'none',
            border: `1.5px solid ${menuOpen ? 'var(--color-primary)' : 'transparent'}`,
            borderRadius: '10px', cursor: 'pointer',
            transition: 'all 0.3s ease', padding: '8px',
          }}
        >
          <span style={{
            display: 'block', width: '22px', height: '2.5px', borderRadius: '2px',
            background: 'var(--color-primary)', transition: 'transform 0.35s ease',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2.5px', borderRadius: '2px',
            background: 'var(--color-primary)',
            opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2.5px', borderRadius: '2px',
            background: 'var(--color-primary)', transition: 'transform 0.35s ease',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      </nav>

      {/* ─── Mobile drawer overlay ───────────────────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1100,
        pointerEvents: menuOpen ? 'all' : 'none',
      }}>
        {/* Backdrop */}
        <div onClick={closeMenu} style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10,47,31,0.55)',
          backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          opacity: menuOpen ? 1 : 0, transition: 'opacity 0.4s ease',
        }} />

        {/* Drawer panel */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 'min(320px, 85vw)', height: '100%',
          background: 'linear-gradient(160deg, #ffffff 0%, #f4f8f5 100%)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.18)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(110%)',
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>

          {/* Drawer header */}
          <div style={{
            padding: '24px 28px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: '1px solid var(--color-border-soft)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
                <path d="M32 4C32 4 12 20 12 38C12 49.05 21.17 58 32 58C42.83 58 52 49.05 52 38C52 20 32 4 32 4Z" fill="var(--color-primary)"/>
                <path d="M32 16C32 16 20 28 20 38C20 44.63 25.37 50 32 50C38.63 50 44 44.63 44 38C44 28 32 16 32 16Z" fill="var(--color-accent-gold)" opacity="0.85"/>
                <circle cx="32" cy="38" r="7" fill="white" opacity="0.9"/>
              </svg>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: '700', fontSize: '20px', color: 'var(--color-primary)' }}>
                Zealhealing
              </span>
            </div>
            <button onClick={closeMenu} aria-label="Close menu" style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'var(--color-primary-subtle)',
              border: '1px solid rgba(27,107,74,0.2)',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--color-primary)',
              fontSize: '15px', fontWeight: '700', transition: 'all 0.2s ease',
            }}>✕</button>
          </div>

          {/* Nav links */}
          <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
            {menus.map(({ label, href, Icon }, idx) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <a key={label} href={href} onClick={closeMenu} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '15px 28px', textDecoration: 'none',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-header)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '21px', fontWeight: isActive ? '600' : '500',
                  borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                  background: isActive ? 'var(--color-primary-subtle)' : 'transparent',
                  transition: 'all 0.25s ease',
                  transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
                  transitionDelay: menuOpen ? `${idx * 0.05 + 0.15}s` : '0s',
                }}>
                  {/* SVG icon — inherits active color */}
                  <span style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-body)',
                    display: 'flex', alignItems: 'center', flexShrink: 0,
                  }}>
                    <Icon />
                  </span>
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Bottom CTA */}
          <div style={{ padding: '20px 28px 32px', borderTop: '1px solid var(--color-border-soft)' }}>
            <a href="#contact" className="btn btn-primary" onClick={closeMenu}
              style={{ width: '100%', padding: '16px', fontSize: '15px', justifyContent: 'center' }}>
              🌿 Book Free Consultation
            </a>
            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', opacity: 0.7 }}>
              First consultation is FREE ✨
            </p>
          </div>

          {/* Decorative blob */}
          <div style={{
            position: 'absolute', bottom: '-60px', left: '-60px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, var(--color-primary-subtle) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-menus  { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .nav-cta    { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
