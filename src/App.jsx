import React, { useState, useEffect } from 'react';
import Navbar from './modules/landing/Navbar';
import Hero from './modules/landing/Hero';
import Services from './modules/landing/Services';
import About from './modules/landing/About';
import Shop from './modules/landing/Shop';
import Session from './modules/landing/Session';
import Contact from './modules/landing/Contact';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <main>
        <Hero />
        <Services />
        <About />
        <Shop />
        <Session />
        <Contact />
      </main>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #0A2F1F, #1B4332)',
        color: 'rgba(255,255,255,0.75)',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px) 40px',
      }}>
        <div style={{ maxWidth: 'var(--section-max-w)', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'clamp(28px, 4vw, 48px)',
            marginBottom: '60px'
          }}>
            {/* Brand column */}
            <div>
              <div style={{
                fontSize: '28px', fontWeight: '700', color: 'white',
                fontFamily: "'Cormorant Garamond', serif",
                marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                  <path d="M32 4C32 4 12 20 12 38C12 49.05 21.17 58 32 58C42.83 58 52 49.05 52 38C52 20 32 4 32 4Z" fill="#C8A96E" />
                  <path d="M32 16C32 16 20 28 20 38C20 44.63 25.37 50 32 50C38.63 50 44 44.63 44 38C44 28 32 16 32 16Z" fill="white" opacity="0.6" />
                </svg>
                The Tarot Queen
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.7, maxWidth: '260px' }}>
                Guiding souls to peace, clarity, and spiritual wholeness through sacred healing practices.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                {[
                  {
                    key: 'facebook',
                    href: '#',
                    label: 'Facebook',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    ),
                  },
                  {
                    key: 'instagram',
                    href: '#',
                    label: 'Instagram',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    ),
                  },
                  {
                    key: 'youtube',
                    href: 'https://www.youtube.com/@RekhaTheTarotQueen',
                    label: 'YouTube',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    ),
                  },
                ].map(({ key, href, label, icon }) => (
                  <a
                    key={key}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    aria-label={label}
                    style={{
                      width: '40px', height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      transition: 'var(--transition)',
                      flexShrink: 0,
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = 'var(--color-accent-gold)';
                      e.currentTarget.style.borderColor = 'var(--color-accent-gold)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ color: 'white', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Services</h4>
              {['Tarot Readings', 'Chakra Healing', 'Pranic Healing', 'Aura Cleansing', 'Spiritual Guidance'].map(link => (
                <a key={link} href="#services" style={{ display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', marginBottom: '12px', transition: 'var(--transition)' }}
                  onMouseOver={e => e.target.style.color = 'var(--color-accent-gold)'}
                  onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >{link}</a>
              ))}
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: 'white', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quick Links</h4>
              {['Home', 'About Us', 'Shop', 'Sessions', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} style={{ display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', marginBottom: '12px', transition: 'var(--transition)' }}
                  onMouseOver={e => e.target.style.color = 'var(--color-accent-gold)'}
                  onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >{link}</a>
              ))}
            </div>

            {/* Contact info */}
            <div>
              <h4 style={{ color: 'white', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Contact</h4>
              {[
                { icon: '📧', text: 'hello@thetarotqueen.com' },
                { icon: '📞', text: '+91 98400 00000' },
                { icon: '📍', text: 'Chennai, Tamil Nadu, India' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)'
          }}>
            <span>© 2026 The Tarot Queen. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Privacy Policy', 'Terms of Service'].map(t => (
                <a key={t} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'var(--transition)' }}
                  onMouseOver={e => e.target.style.color = 'white'}
                  onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                >{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '100px', /* Shifted up to make room for WhatsApp */
            right: '32px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px var(--color-primary-glow)',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 998,
            transition: 'var(--transition)'
          }}
          aria-label="Scroll to top"
        >↑</button>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919840000000"
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 32px rgba(37,211,102,0.4)',
          zIndex: 999,
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        aria-label="Chat on WhatsApp"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="white">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.333 4.976L1.838 22l5.166-1.353a9.96 9.96 0 0 0 4.996 1.338h.004c5.504 0 9.988-4.479 9.989-9.985a9.965 9.965 0 0 0-2.924-7.06A9.957 9.957 0 0 0 12.012 2zm5.495 14.536c-.23.646-1.332 1.233-1.83 1.298-.445.059-1.026.152-3.23-.761-2.668-1.106-4.385-3.826-4.516-4.004-.131-.176-1.077-1.432-1.077-2.731 0-1.3.666-1.942.906-2.193.238-.25.518-.314.693-.314.173 0 .348.006.5.013.161.009.38-.063.593.454.215.52.737 1.796.802 1.927.065.131.108.283.022.456-.086.173-.131.282-.26.435-.131.15-.276.326-.395.455-.132.144-.27.302-.115.568.157.266.697 1.147 1.498 1.867.973.874 1.839 1.144 2.103 1.274.264.13.418.109.574-.065.156-.176.671-.78.851-1.048.18-.268.36-.223.598-.135.239.088 1.507.712 1.765.843.26.13.433.195.496.304.065.109.065.632-.165 1.278z" />
        </svg>
      </a>

    </div>
  );
}

export default App;
