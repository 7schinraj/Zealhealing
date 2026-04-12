import React, { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: 'Tarot Services',
    subtitle: 'DIVINE GUIDANCE',
    desc: 'Unveil the mysteries of your path through sacred tarot readings and intuitive spiritual insights that illuminate your journey.',
    features: ['Personal Readings', 'Career Guidance', 'Relationship Insights'],
    price: '799',
    image: '/assets/shop/tarot1.png',
    color: 'var(--color-primary)',
    icon: '🔮',
  },
  {
    title: 'Healing Services',
    subtitle: 'SACRED ENERGY',
    desc: 'Restore your inner balance and vitality through divine energy healing and spiritual cleansing sessions tailored to your soul.',
    features: ['Chakra Alignment', 'Pranic Healing', 'Aura Cleansing'],
    price: '999',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    color: 'var(--color-accent-gold)',
    icon: '✨',
  },
  {
    title: 'Life Coaching',
    subtitle: 'SOUL MASTERY',
    desc: 'Empower your transformation with sessions focused on meaningful growth, abundance, and aligning with your higher purpose.',
    features: ['Purpose Discovery', 'Mindset Shifts', 'Spiritual Growth'],
    price: '1299',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    color: 'var(--color-primary)',
    icon: '🌱',
  },
];

const Services = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
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
          <div className="badge badge-gold" style={{ marginBottom: '20px' }}>✦ Our Offerings ✦</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            marginBottom: '16px',
            fontFamily: "'Cormorant Garamond', serif",
            color: 'var(--text-main)',
          }}>
            Direct <span className="text-gradient">Sacred Services</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto', fontSize: '16px', lineHeight: 1.7 }}>
            Experience divine intervention through our specialized healing and tarot practices, guided with love and wisdom.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--section-gap)',
        }}>
          {services.map((s, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '0',
                overflow: 'hidden',
                borderTop: `4px solid ${s.color}`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div className="card-img-wrap" style={{ height: '200px' }}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="hover-zoom"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '32px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: s.color,
                  letterSpacing: '0.1em',
                  marginBottom: '12px',
                  textTransform: 'uppercase'
                }}>
                  {s.subtitle}
                </div>
                <h3 style={{
                  fontSize: '26px',
                  marginBottom: '16px',
                  fontFamily: "'Cormorant Garamond', serif",
                  color: 'var(--text-main)',
                }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  {s.desc}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {s.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-main)' }}>
                      <span style={{ fontSize: '16px' }}>{s.icon}</span> {f}
                    </li>
                  ))}
                </ul>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--color-border-soft)'
                }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    Starting <span style={{ fontWeight: '700', color: 'var(--color-primary)', fontSize: '18px' }}>₹{s.price}</span> →
                  </div>
                  <a href="#contact" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '12px' }}>
                    Explore Service
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
