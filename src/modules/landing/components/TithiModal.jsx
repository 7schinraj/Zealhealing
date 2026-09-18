import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TithiResult from './TithiResult';

const TithiModal = ({ result, date, name, intent, birthTime, birthPlace, timezone, onClose }) => {
  const isOpen = !!result;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 9500,
              background: 'rgba(6,20,12,0.85)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
          />

          {/* ── Centering wrapper (flexbox — no transform needed) ──────── */}
          {/*    Framer Motion's y-animation stays on THIS element;        */}
          {/*    centering is done by the parent flex container.           */}
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 9600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              pointerEvents: 'none', // let clicks fall through to backdrop
            }}
          >
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, y: 56, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 88, damping: 20, delay: 0.08 }}
              style={{
                pointerEvents: 'all', // capture clicks on the card
                width: '100%',
                maxWidth: '700px',
                maxHeight: '88vh',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 48px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,169,110,0.22)',
              }}
            >
              {/* ── Header bar ─────────────────────────────────────────── */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'linear-gradient(135deg, #0A2F1F 0%, #1B4332 100%)',
                borderBottom: '1px solid rgba(200,169,110,0.2)',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid rgba(200,169,110,0.5)',
                    boxShadow: '0 0 14px rgba(200,169,110,0.3)',
                    flexShrink: 0,
                  }}>
                    <img src="/tithi-devi.jpg" alt="Tithi Devathai"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '17px', fontWeight: '700', color: 'white', lineHeight: 1.15,
                    }}>
                      Your Sacred Reading
                    </div>
                    <div style={{
                      fontSize: '10px', color: 'rgba(200,169,110,0.75)',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      letterSpacing: '0.08em',
                    }}>
                      ✦ திதி தேவதை அருளிய ஜோதிடம் ✦
                    </div>
                  </div>
                </div>

                {/* Close */}
                <button onClick={onClose} aria-label="Close"
                  style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    color: 'rgba(255,255,255,0.65)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s ease', flexShrink: 0,
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.16)'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* ── Scrollable result ────────────────────────────────────── */}
              <div style={{
                flex: 1, overflowY: 'auto',
                background: '#F4F8F5',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(27,107,74,0.2) transparent',
              }}>
                <TithiResult
                  result={result}
                  date={date}
                  name={name}
                  intent={intent}
                  birthTime={birthTime}
                  birthPlace={birthPlace}
                  timezone={timezone}
                  inModal
                />
              </div>

              {/* ── Footer ──────────────────────────────────────────────── */}
              <div style={{
                padding: '14px 20px',
                background: 'white',
                borderTop: '1px solid #DDE8E2',
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end',
                flexShrink: 0,
              }}>
                <button onClick={onClose}
                  style={{
                    padding: '9px 20px',
                    background: 'none', border: '1.5px solid #DDE8E2',
                    borderRadius: '10px', color: '#4A5D54',
                    fontSize: '13px', fontWeight: '600',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = '#1B6B4A'; e.currentTarget.style.color = '#1B6B4A'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = '#DDE8E2'; e.currentTarget.style.color = '#4A5D54'; }}
                >
                  Close / மூடு
                </button>
                <a href="#contact" onClick={onClose}
                  style={{
                    padding: '9px 20px',
                    background: 'linear-gradient(135deg, #1B6B4A, #2D8F65)',
                    border: 'none', borderRadius: '10px', color: 'white',
                    fontSize: '13px', fontWeight: '700',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    cursor: 'pointer', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    boxShadow: '0 4px 14px rgba(27,107,74,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(27,107,74,0.4)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(27,107,74,0.3)'; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8C8 10 5.9 16.17 3.82 19.17L2 22l2.5-1C8 19 12.42 18 17 8z" />
                  </svg>
                  Book a Session / அமர்வு பதிவு
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TithiModal;
