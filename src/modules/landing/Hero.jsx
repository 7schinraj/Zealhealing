import React, { useEffect, useRef, useState } from 'react';

const trustItems = [
  { icon: '⭐', value: '4.9', label: 'Rating' },
  { icon: '👥', value: '500+', label: 'Clients' },
  { icon: '🏆', value: '8 Yrs', label: 'Experience' },
  { icon: '🌿', value: '100%', label: 'Natural' },
];

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      style={{
        minHeight: 'calc(100svh - 72px)',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(40px, 6vh, 80px) var(--section-px)',
        width: '100%',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Subtle bg blob */}
      <div style={{
        position: 'absolute',
        top: '-80px', right: '-80px',
        width: '420px', height: '420px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--color-primary-subtle) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      {/* Small floating dots */}
      {[
        { top: '18%', left: '6%', delay: '0s', size: '7px' },
        { top: '72%', left: '38%', delay: '0.8s', size: '5px' },
        { bottom: '22%', right: '18%', delay: '0.4s', size: '6px' },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: d.size, height: d.size,
          borderRadius: '50%',
          background: 'var(--color-accent-gold)',
          opacity: 0.45,
          animation: `floatY 3.5s ease-in-out infinite`,
          animationDelay: d.delay,
          top: d.top, left: d.left, bottom: d.bottom, right: d.right,
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      ))}

      {/* Inner centered content */}
      <div style={{ width: '100%', maxWidth: 'var(--section-max-w)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">

          {/* ══ LEFT — Text ══ */}
          <div style={{
            textAlign: 'left',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.75s ease, transform 0.75s ease',
          }}>
            {/* Badge */}
            <div className="badge badge-gold" style={{ marginBottom: '20px' }}>
              <span>✦</span> Spiritual Counselling <span>✦</span>
            </div>

            {/* Heading */}
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 66px)',
              lineHeight: 1.06,
              marginBottom: '16px',
              maxWidth: '14ch',
            }}>
              Finally Find{' '}
              <span className="text-gradient">Peace Of Mind</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              maxWidth: '420px',
              fontSize: 'clamp(14px, 1.1vw, 16px)',
              color: 'var(--text-muted)',
              marginBottom: '28px',
              lineHeight: 1.7,
            }}>
              Helping you navigate life's challenges with wisdom, compassion, and inner peace.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <a href="#contact" className="btn btn-primary" style={{
                padding: 'clamp(12px, 1.2vw, 16px) clamp(22px, 2.5vw, 40px)',
                fontSize: 'clamp(13px, 1vw, 15px)',
              }}>
                🌿 Book Free Consultation
              </a>
              <a href="#services" className="btn btn-outline" style={{
                padding: 'clamp(12px, 1.2vw, 16px) clamp(22px, 2.5vw, 36px)',
                fontSize: 'clamp(13px, 1vw, 15px)',
              }}>
                Learn More →
              </a>
            </div>

            {/* Trust row — 2x2 on mobile */}
            <div style={{
              paddingTop: '20px',
              borderTop: '1px solid var(--color-border-soft)',
            }}>
              <div className="trust-grid">
                {trustItems.map(({ icon, value, label }) => (
                  <div key={label} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <span style={{ fontSize: '22px' }}>{icon}</span>
                    <div>
                      <div style={{
                        fontSize: 'clamp(15px, 1.4vw, 19px)',
                        fontWeight: '700',
                        color: 'var(--text-main)',
                        fontFamily: "'Cormorant Garamond', serif",
                        lineHeight: 1.1,
                      }}>
                        {value}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ RIGHT — Image ══ */}
          <div className="hero-image-col" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.85s ease 0.18s, transform 0.85s ease 0.18s',
          }}>
            {/*
              Fixed-size wrapper — both arches share the same coordinate system.
              Overflow visible so floating badges are not clipped.
            */}
            <div className="hero-arch-wrap">

              {/* Gold decorative arch (behind, offset bottom-right) */}
              <div style={{
                position: 'absolute',
                top: '14px', left: '14px',
                width: '100%', height: '100%',
                borderRadius: '50% 50% 16px 16px / 40% 40% 16px 16px',
                border: '1.5px solid var(--color-accent-gold)',
                opacity: 0.55,
                pointerEvents: 'none',
                zIndex: 1,
              }} />

              {/* Main green arch (front) */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                borderRadius: '50% 50% 16px 16px / 40% 40% 16px 16px',
                border: '2.5px solid var(--color-primary)',
                padding: '10px',
                overflow: 'hidden',
                background: 'var(--color-bg-surface)',
                boxShadow: '0 20px 60px var(--color-primary-glow)',
                zIndex: 2,
              }}>
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=90"
                  alt="Spiritual meditation and healing session"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: '48% 48% 6px 6px / 38% 38% 6px 6px',
                    display: 'block',
                  }}
                />
              </div>

              {/* Floating badge — YouTube (bottom-left) */}
              <a href="https://www.youtube.com/@RekhaTheTarotQueen" target="_blank" rel="noreferrer"
                className="hero-badge hero-badge-yt"
                style={{
                  position: 'absolute',
                  bottom: '-5%',
                  left: '-8%',
                  background: 'white',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  boxShadow: '0 10px 32px rgba(0,0,0,0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  zIndex: 10,
                  animation: 'floatY 3.5s ease-in-out infinite',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  whiteSpace: 'nowrap',
                }}>
                <div style={{
                  width: '34px', height: '34px',
                  borderRadius: '50%',
                  background: '#FF0000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: 'white',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-main)' }}>YouTube</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>@RekhaTheTarotQueen</div>
                </div>
              </a>

              {/* Floating badge — Instagram (top-right) */}
              <a href="#" target="_blank" rel="noreferrer"
                className="hero-badge hero-badge-ig"
                style={{
                  position: 'absolute',
                  top: '6%',
                  right: '-8%',
                  background: 'white',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  boxShadow: '0 10px 32px rgba(0,0,0,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 10,
                  animation: 'floatY 4s ease-in-out infinite',
                  animationDelay: '1s',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  whiteSpace: 'nowrap',
                }}>
                <div style={{
                  width: '34px', height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: 'white',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-main)' }}>Instagram</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Follow our journey</div>
                </div>
              </a>

            </div>{/* /hero-arch-wrap */}
          </div>

        </div>{/* /hero-grid */}
      </div>

      <style>{`
        /* ── Hero responsive grid ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 4vw, 72px);
          align-items: center;
        }

        /* ── Trust strip: 4 across on desktop, 2x2 on mobile ── */
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, auto);
          gap: clamp(14px, 2.5vw, 32px);
          width: fit-content;
        }

        /* ── Arch wrapper ── */
        .hero-arch-wrap {
          position: relative;
          width: min(340px, 44vw);
          aspect-ratio: 3 / 4;
        }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .hero-arch-wrap {
            width: min(280px, 52vw);
          }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-image-col {
            order: -1; /* image goes above text on mobile */
          }

          .hero-arch-wrap {
            width: min(260px, 72vw);
            aspect-ratio: 3 / 3.6;
          }

          /* Pull badges in so they don't overflow the screen edge */
          .hero-badge-yt {
            left: -6px !important;
            bottom: -12px !important;
          }
          .hero-badge-ig {
            right: -6px !important;
            top: 4% !important;
          }

          .trust-grid {
            grid-template-columns: repeat(2, auto);
            gap: 16px 28px;
          }
        }

        /* Hover effect on floating badges */
        .hero-badge:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 16px 40px rgba(0,0,0,0.18) !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;
