import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '../tithi.utils';

const ROW_ITEMS = [
  { key: 'deity',      label: 'Ruling Deity',    symbol: '☽' },
  { key: 'mantra',     label: 'Sacred Mantra',   symbol: '᳜' },
  { key: 'qualities',  label: 'Qualities',        symbol: '✧' },
];

const pillStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '5px',
  padding: '4px 12px',
  background: 'rgba(27,107,74,0.08)',
  border: '1px solid rgba(27,107,74,0.15)',
  borderRadius: '20px',
  fontSize: '11px', fontWeight: '600',
  color: '#4A5D54',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  letterSpacing: '0.02em',
};


const TithiResult = ({ result, date, name, intent, birthTime, birthPlace, timezone }) => {
  if (!result) return null;

  const intentLabels = {
    birthday: 'Your Birth Tithi',
    daily: 'Today\'s Tithi',
    muhurtham: 'Event Tithi',
    practice: 'Practice Tithi',
  };

  return (
    <AnimatePresence>
      <motion.div
        key="result"
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(200,169,110,0.25)',
          boxShadow: '0 24px 80px rgba(27,107,74,0.14), 0 0 0 1px rgba(200,169,110,0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top gradient bar */}
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #1B6B4A, #C8A96E, #1B6B4A)',
          backgroundSize: '200% auto',
          animation: 'shimmer 3s linear infinite',
        }} />

        {/* Header section */}
        <div style={{
          padding: 'clamp(24px, 4vw, 40px)',
          background: 'linear-gradient(135deg, rgba(27,107,74,0.04) 0%, rgba(200,169,110,0.06) 100%)',
          borderBottom: '1px solid rgba(200,169,110,0.15)',
          textAlign: 'center',
        }}>
          {/* Intent label */}
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(200,169,110,0.12)', border: '1px solid rgba(200,169,110,0.3)',
              borderRadius: '40px', padding: '6px 18px',
              fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em',
              color: '#C8A96E', textTransform: 'uppercase',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: '16px',
            }}
          >
            ✦ {intentLabels[intent] || 'Your Tithi'} ✦
          </motion.div>

          {/* Moon phase + tithi name */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 100 }}
          >
            {/* Pulsing orb */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                fontSize: 'clamp(48px, 8vw, 80px)',
                lineHeight: 1, marginBottom: '12px',
                display: 'block',
                filter: 'drop-shadow(0 0 20px rgba(200,169,110,0.5))',
              }}
            >
              {result.moonPhase}
            </motion.div>
          </motion.div>

          {/* Tithi name — shimmer gradient */}
          <motion.h3
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: '700',
              background: 'linear-gradient(120deg, #1B6B4A 0%, #C8A96E 50%, #1B6B4A 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite',
              marginBottom: '4px',
              lineHeight: 1.1,
            }}
          >
            {result.paksha} {result.name}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{
              fontSize: 'clamp(12px, 1.2vw, 14px)', color: '#4A5D54',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: '8px',
            }}
          >
            {result.pakshaMeaning} • {formatDate(date)}
          </motion.p>

          {name && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: '13px', color: '#C8A96E', fontWeight: '600',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: '16px',
              }}
            >
              Revealed for {name}
            </motion.p>
          )}

          {/* Birth detail pills */}
          {(birthTime || birthPlace || timezone) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}
            >
              {birthTime && (
                <span style={pillStyle}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {birthTime}
                </span>
              )}
              {birthPlace && (
                <span style={pillStyle}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {birthPlace}
                </span>
              )}
              {timezone && (
                <span style={pillStyle}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  {timezone.split('/').pop()?.replace('_', ' ')}
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* Details grid */}
        <div style={{ padding: 'clamp(20px, 4vw, 36px)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'clamp(12px, 2vw, 20px)',
            marginBottom: 'clamp(20px, 3vw, 28px)',
          }}>
            {ROW_ITEMS.map(({ key, label, symbol }, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, type: 'spring', stiffness: 90 }}
                style={{
                  background: 'rgba(27,107,74,0.04)',
                  border: '1px solid rgba(27,107,74,0.1)',
                  borderRadius: '16px',
                  padding: 'clamp(14px, 2vw, 20px)',
                }}
              >
                <div style={{ fontSize: '18px', marginBottom: '8px', color: '#1B6B4A', fontWeight: '300' }}>{symbol}</div>
                <div style={{
                  fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em',
                  color: '#C8A96E', textTransform: 'uppercase',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  marginBottom: '4px',
                }}>{label}</div>
                <div style={{
                  fontSize: 'clamp(12px, 1.2vw, 14px)', fontWeight: '600', color: '#0F2318',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.4,
                }}>
                  {key === 'qualities' ? result.qualities.join(' · ') : result[key]}
                </div>
              </motion.div>
            ))}

            {/* Lucky Color card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 90 }}
              style={{
                background: 'rgba(27,107,74,0.04)',
                border: '1px solid rgba(27,107,74,0.1)',
                borderRadius: '16px',
                padding: 'clamp(14px, 2vw, 20px)',
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>🎨</div>
              <div style={{
                fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em',
                color: '#C8A96E', textTransform: 'uppercase',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: '6px',
              }}>Lucky Color</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: result.luckyColor,
                    boxShadow: `0 0 12px ${result.luckyColor}88`,
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  fontSize: 'clamp(12px, 1.2vw, 14px)', fontWeight: '600', color: '#0F2318',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>{result.luckyColorName}</span>
              </div>
            </motion.div>
          </div>

          {/* Significance */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{
              background: 'linear-gradient(135deg, rgba(27,107,74,0.06) 0%, rgba(200,169,110,0.08) 100%)',
              border: '1px solid rgba(200,169,110,0.2)',
              borderRadius: '18px',
              padding: 'clamp(18px, 3vw, 28px)',
              marginBottom: 'clamp(14px, 2vw, 20px)',
            }}
          >
            <div style={{
              fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em',
              color: '#1B6B4A', textTransform: 'uppercase',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: '10px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ fontSize: '16px' }}>{result.symbol}</span> Significance
            </div>
            <p style={{
              fontSize: 'clamp(13px, 1.2vw, 15px)', color: '#4A5D54',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              lineHeight: 1.75, margin: 0,
            }}>{result.significance}</p>
          </motion.div>

          {/* Spiritual Insight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            style={{
              background: 'linear-gradient(135deg, rgba(27,107,74,0.04) 0%, rgba(200,169,110,0.06) 100%)',
              borderLeft: '4px solid #C8A96E',
              borderRadius: '0 16px 16px 0',
              padding: 'clamp(18px, 3vw, 28px)',
            }}
          >
            <div style={{
              fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em',
              color: '#C8A96E', textTransform: 'uppercase',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: '10px',
            }}>
              🌟 Spiritual Insight for You
            </div>
            <p style={{
              fontSize: 'clamp(13px, 1.2vw, 15px)', color: '#0F2318',
              fontFamily: "'Cormorant Garamond', serif",
              lineHeight: 1.8, margin: 0, fontStyle: 'italic',
              fontWeight: '500', fontSize: 'clamp(15px, 1.5vw, 18px)',
            }}>&ldquo;{result.insight}&rdquo;</p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ textAlign: 'center', marginTop: 'clamp(20px, 3vw, 28px)' }}
          >
            <a href="#contact" className="btn btn-primary" style={{
              padding: 'clamp(12px, 1.5vw, 16px) clamp(28px, 3vw, 44px)',
              fontSize: 'clamp(13px, 1vw, 15px)',
              boxShadow: '0 12px 36px rgba(27,107,74,0.25)',
            }}>
              🌿 Book a Personal Session
            </a>
            <p style={{
              marginTop: '10px', fontSize: '12px', color: '#4A5D54',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Explore your tithi deeper with a guided spiritual consultation</p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TithiResult;
