import React, { useEffect, useRef, useState } from 'react';

const reasons = [
  {
    icon: '💧',
    title: 'Emotional Healing',
    desc: 'Release stress, anxiety, and deep emotional patterns to rediscover your inner balance and joy.',
    color: 'var(--color-primary)',
  },
  {
    icon: '☀️',
    title: 'Clarity & Purpose',
    desc: "Gain profound insight into your life's direction, unlock your true purpose, and walk your sacred path.",
    color: 'var(--color-accent-gold)',
  },
  {
    icon: '⭐',
    title: 'Spiritual Connection',
    desc: 'Align with your highest self, deepen your values, and experience the sacred presence within you.',
    color: 'var(--color-secondary)',
  },
];

const About = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="aboutus"
      className="section-alt"
      ref={ref}
      style={{
        padding: 'var(--section-py) var(--section-px)',
        width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div style={{ maxWidth: 'var(--section-max-w)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--section-header-mb)' }}>
          <div className="badge badge-green" style={{ marginBottom: '20px' }}>✦ Why Choose Us ✦</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            marginBottom: '16px',
            fontFamily: "'Cormorant Garamond', serif",
            color: 'var(--text-main)',
          }}>
            The Zealhealing <span className="text-gradient">Difference</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto', fontSize: '16px', lineHeight: 1.7 }}>
            We combine ancient wisdom with compassionate care to create transformative experiences for mind, body & spirit.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--section-gap)',
        }}>
          {reasons.map((r, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                textAlign: 'center',
                padding: '48px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--color-bg-surface)',
                border: `1.5px solid ${r.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                boxShadow: `0 10px 30px rgba(0,0,0,0.05)`,
              }}>
                {r.icon}
              </div>
              <h3 style={{
                fontSize: '22px',
                fontFamily: "'Cormorant Garamond', serif",
                color: 'var(--text-main)',
              }}>
                {r.title}
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '14.5px',
                lineHeight: 1.7,
              }}>
                {r.desc}
              </p>
              <div style={{
                width: '40px',
                height: '2.5px',
                background: r.color,
                borderRadius: '2px',
                marginTop: 'auto',
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
