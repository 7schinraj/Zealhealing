import React, { useEffect, useRef, useState } from 'react';

const upcomingSessions = [
  {
    title: 'Full Moon Meditation',
    type: 'Group Ritual',
    date: 'April 24, 2024',
    time: '7:00 PM - 8:30 PM',
    spots: '5 spots left',
    price: '₹499',
    badge: 'Popular',
  },
  {
    title: 'Chakra Awakening Workshop',
    type: 'Intensive Session',
    date: 'May 02, 2024',
    time: '10:00 AM - 1:00 PM',
    spots: 'Only 2 spots!',
    price: '₹1,499',
    badge: 'Limited',
  },
  {
    title: 'Inner Peace Retreat',
    type: 'Full Day Event',
    date: 'May 15, 2024',
    time: '9:00 AM - 5:00 PM',
    spots: '8 spots available',
    price: '₹4,999',
    badge: null,
  },
];

const Session = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="sessions"
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
          <div className="badge badge-gold" style={{ marginBottom: '20px' }}>✦ Live Events ✦</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            marginBottom: '16px',
            fontFamily: "'Cormorant Garamond', serif",
            color: 'var(--text-main)',
          }}>
            Upcoming <span className="text-gradient">Sessions</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', fontSize: '16px', lineHeight: 1.7 }}>
            Join our live spiritual sessions and workshops designed to deepen your practice and connect with the community.
          </p>
        </div>

        {/* Sessions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {upcomingSessions.map((s, idx) => (
            <div
              key={idx}
              className="glass-card session-card"
              style={{
                padding: 'clamp(20px, 3vw, 32px) clamp(20px, 4vw, 40px)',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '20px',
                alignItems: 'center',
                background: 'white',
              }}
            >
              {/* Left: Date + Info + Time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{
                  width: '60px', height: '60px',
                  borderRadius: '12px',
                  background: 'var(--color-primary-subtle)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-primary)',
                  fontWeight: '700',
                  lineHeight: 1,
                  flexShrink: 0,
                }}>
                  <div style={{ fontSize: '18px' }}>{s.date.split(' ')[1].replace(',', '')}</div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', marginTop: '4px' }}>{s.date.split(' ')[0]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 'clamp(16px, 2vw, 19px)', fontFamily: "'Cormorant Garamond', serif", color: 'var(--text-main)', marginBottom: '4px' }}>
                    {s.title}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>{s.type}</div>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: '500' }}>🕒 {s.time}</span>
                    <span style={{
                      fontSize: '12px',
                      color: s.spots.includes('Only') ? '#e63946' : 'var(--color-primary)',
                      fontWeight: '600'
                    }}>🌿 {s.spots}</span>
                  </div>
                </div>
              </div>

              {/* Right: Price & CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                <div>
                  <div style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: '700', color: 'var(--color-primary)', fontFamily: "'Cormorant Garamond', serif", textAlign: 'right' }}>
                    {s.price}
                  </div>
                  {s.badge && (
                    <div style={{ fontSize: '10px', color: 'var(--color-accent-gold)', fontWeight: '700', textTransform: 'uppercase', textAlign: 'right' }}>
                      {s.badge}
                    </div>
                  )}
                </div>
                <button className="btn btn-primary" style={{ padding: 'clamp(9px, 1.2vw, 12px) clamp(16px, 2vw, 28px)', fontSize: 'clamp(12px, 1vw, 14px)' }}>
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 480px) {
            .session-card {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
            .session-card > div:last-child {
              flex-direction: row !important;
              justify-content: space-between !important;
              align-items: center !important;
              border-top: 1px solid var(--color-border-soft);
              padding-top: 14px;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Session;
