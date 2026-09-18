import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TithiCanvas from './components/TithiCanvas';
import CustomCalendar from './components/CustomCalendar';
import CustomDropdown from './components/CustomDropdown';
import CustomTimePicker from './components/CustomTimePicker';
import TimezoneDropdown from './components/TimezoneDropdown';
import TithiAnalyzing from './components/TithiAnalyzing';
import TithiModal from './components/TithiModal';
import { computeTithi } from './tithi.utils';

// ── SVG Icons ──────────────────────────────────────────────────────────────────
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconMoonSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconSpinner = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);
const IconAlert = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconRefresh = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

// ── Shared constants ───────────────────────────────────────────────────────────
const LABEL = {
  display: 'block', marginBottom: '7px',
  fontSize: '11px', fontWeight: '700',
  color: 'rgba(255,255,255,0.6)',
  letterSpacing: '0.09em', textTransform: 'uppercase',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

// Trigger style used by all 4 custom pickers — ensures identical height/padding
const TRIGGER_H = '50px'; // fixed height for all inputs

// ── IconInput — native text input with leading icon ───────────────────────────
const IconInput = ({ icon: Icon, value, onChange, placeholder, maxLength }) => (
  <div style={{ position: 'relative' }}>
    <span style={{
      position: 'absolute', left: '14px', top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255,255,255,0.38)', display: 'flex', pointerEvents: 'none', zIndex: 1,
    }}><Icon /></span>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      style={{
        width: '100%', height: TRIGGER_H,
        padding: '0 16px 0 42px',
        background: 'rgba(255,255,255,0.07)',
        border: '1.5px solid rgba(255,255,255,0.13)',
        borderRadius: '14px', color: 'white',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '14px', outline: 'none',
        transition: 'all 0.22s ease', boxSizing: 'border-box',
      }}
      onFocus={e => {
        e.currentTarget.style.borderColor = '#C8A96E';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,169,110,0.13)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
      }}
    />
  </div>
);

// ── Field wrapper — label + child ─────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={LABEL}>{label}</label>
    {children}
  </div>
);

// ── TithiCalculator ────────────────────────────────────────────────────────────
const TithiCalculator = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [intent, setIntent] = useState('');

  const [analyzing, setAnalyzing] = useState(false);   // full-page overlay
  const [result, setResult] = useState(null);           // opens modal
  const [submitted, setSubmitted] = useState(false);    // Three.js warp
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!date) { setError('Please select your date of birth.'); return; }
    if (!intent) { setError('Please choose a purpose for this reading.'); return; }

    setAnalyzing(true);
    setSubmitted(true);
  };

  // Called by TithiAnalyzing when its timer completes (~3.6s)
  const handleAnalysisComplete = () => {
    const tithiResult = computeTithi(date);
    setAnalyzing(false);
    setResult(tithiResult);
  };

  const handleCloseModal = () => setResult(null);

  const handleReset = () => {
    setResult(null);
    setSubmitted(false);
    setDate('');
    setBirthTime('');
    setBirthPlace('');
    setTimezone('Asia/Kolkata');
    setName('');
    setIntent('');
    setError('');
  };

  return (
    <>
      {/* ── Full-page Analyzing Overlay ──────────────────────────────────── */}
      <TithiAnalyzing visible={analyzing} onComplete={handleAnalysisComplete} />

      {/* ── Result Modal ─────────────────────────────────────────────────── */}
      <TithiModal
        result={result}
        date={date}
        name={name}
        intent={intent}
        birthTime={birthTime}
        birthPlace={birthPlace}
        timezone={timezone}
        onClose={handleCloseModal}
      />

      {/* ── Section ──────────────────────────────────────────────────────── */}
      <section
        id="tithi"
        ref={sectionRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'var(--section-py) var(--section-px)',
          background: 'linear-gradient(160deg, #0A2F1F 0%, #1B4332 55%, #0F3D27 100%)',
          minHeight: '100vh',
        }}
      >
        <TithiCanvas submitted={submitted} />

        {/* Glows */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,107,74,0.22) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 'var(--section-max-w)', margin: '0 auto' }}>

          {/* ── Header ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, ease: 'easeOut' }}
            style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}
          >
            <div className="badge badge-gold" style={{ marginBottom: '20px', justifyContent: 'center' }}>
              <span>✦</span> Sacred Lunar Calendar <span>✦</span>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: '700', color: 'white',
              lineHeight: 1.1, marginBottom: '16px',
            }}>
              Discover Your{' '}
              <span style={{
                background: 'linear-gradient(120deg, #C8A96E 0%, #F0D08E 50%, #C8A96E 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 4s linear infinite',
              }}>Sacred Tithi</span>
            </h2>
            <p style={{
              fontSize: '12px', color: 'rgba(200,169,110,0.7)',
              fontFamily: "'Noto Sans Tamil', 'Plus Jakarta Sans', sans-serif",
              marginBottom: '12px', letterSpacing: '0.04em',
            }}>உங்கள் புனித திதியை கண்டறியுங்கள்</p>
            <p style={{
              maxWidth: '500px', margin: '0 auto',
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              color: 'rgba(255,255,255,0.55)', lineHeight: 1.8,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Enter your birth details — the Tithi Devathai will analyze your cosmic birth print and reveal your sacred lunar day.
            </p>
          </motion.div>

          {/* ── Form card — centered, max 680px ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.18 }}
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '28px',
              border: '1px solid rgba(200,169,110,0.18)',
              padding: 'clamp(28px, 5vw, 52px)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
            }}
          >
            {/* Card header — devi avatar + title */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center',
              marginBottom: 'clamp(28px, 4vw, 40px)',
              paddingBottom: 'clamp(24px, 3vw, 32px)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '72px', height: '72px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2.5px solid rgba(200,169,110,0.45)',
                  boxShadow: '0 0 24px rgba(200,169,110,0.3)',
                  marginBottom: '14px',
                }}
              >
                <img src="/tithi-devi.jpg" alt="Tithi Devathai" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </motion.div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(20px, 2.5vw, 26px)',
                color: 'white', fontWeight: '700',
                margin: '0 0 4px', lineHeight: 1.2,
              }}>Tithi Devathai Calculator</h3>
              <p style={{
                fontSize: '13px', color: 'rgba(200,169,110,0.8)',
                fontFamily: "'Noto Sans Tamil', 'Plus Jakarta Sans', sans-serif",
                marginBottom: '4px',
              }}>திதி தேவதை கணிப்பான்</p>
              <p style={{
                fontSize: '11px', color: 'rgba(255,255,255,0.35)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: '0.04em',
              }}>Fill in your birth details for a cosmic reading</p>
            </div>

            {/* ── FORM ────────────────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} noValidate>

              {/* Row 1: Name + DOB */}
              <div className="tithi-row">
                <Field label="Full Name / முழு பெயர் (Optional)">
                  <IconInput
                    icon={IconUser}
                    value={name}
                    onChange={setName}
                    placeholder="e.g. Priya Sharma / பிரியா சர்மா"
                    maxLength={50}
                  />
                </Field>
                <Field label="Date of Birth / பிறந்த தேதி *">
                  <CustomCalendar value={date} onChange={setDate} label="" dark />
                </Field>
              </div>

              {/* Row 2: Birth Time + Birthplace */}
              <div className="tithi-row">
                <Field label="Birth Time / பிறந்த நேரம்">
                  <CustomTimePicker value={birthTime} onChange={setBirthTime} dark />
                </Field>
                <Field label="Birthplace / பிறந்த இடம்">
                  <IconInput
                    icon={IconMapPin}
                    value={birthPlace}
                    onChange={setBirthPlace}
                    placeholder="e.g. Chennai / சென்னை"
                    maxLength={80}
                  />
                </Field>
              </div>

              {/* Row 3: Timezone + Intent */}
              <div className="tithi-row" style={{ marginBottom: 0 }}>
                <Field label="Timezone / நேர மண்டலம்">
                  <TimezoneDropdown value={timezone} onChange={setTimezone} dark />
                </Field>
                <Field label="Purpose / வாசிப்பின் நோக்கம் *">
                  <CustomDropdown value={intent} onChange={setIntent} dark />
                </Field>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: 'clamp(24px, 3vw, 32px) 0 clamp(20px, 2.5vw, 28px)' }} />

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      color: '#FFB3B3', fontSize: '13px',
                      marginBottom: '18px',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      background: 'rgba(255,80,80,0.1)',
                      borderRadius: '12px', padding: '12px 16px',
                      border: '1px solid rgba(255,80,80,0.18)',
                    }}
                  >
                    <span style={{ display: 'flex', flexShrink: 0, color: '#FF8080' }}><IconAlert /></span>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: '100%', height: '54px',
                  background: 'linear-gradient(135deg, #C8A96E 0%, #E0C080 50%, #C8A96E 100%)',
                  backgroundSize: '200% auto',
                  border: 'none', borderRadius: '16px',
                  color: '#0A2F1F', fontWeight: '800',
                  fontSize: 'clamp(13px, 1.2vw, 15px)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  cursor: 'pointer', letterSpacing: '0.04em',
                  boxShadow: '0 8px 28px rgba(200,169,110,0.35)',
                  transition: 'all 0.28s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  animation: 'shimmer 3s linear infinite',
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(200,169,110,0.48)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(200,169,110,0.35)'; }}
              >
                <IconMoonSvg />
                Reveal My Tithi / என் திதி காட்டு
              </button>

              {/* Reset */}
              {submitted && (
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  type="button" onClick={handleReset}
                  style={{
                    marginTop: '12px', width: '100%', background: 'none',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                    color: 'rgba(255,255,255,0.45)', fontSize: '13px', cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; }}
                  onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <IconRefresh /> Calculate for another date / வேறு தேதிக்கு கணக்கிடு
                </motion.button>
              )}
            </form>
          </motion.div>

          {/* ── Trust strip ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: 'flex', gap: 'clamp(20px, 4vw, 48px)',
              justifyContent: 'center', flexWrap: 'wrap',
              marginTop: 'clamp(36px, 5vw, 56px)',
            }}
          >
            {[
              { n: '30', label: 'Tithis Covered', tamil: '30 திதிகள்' },
              { n: '100%', label: 'Ancient Algorithm', tamil: 'பண்டைய கணிதம்' },
              { n: '±1', label: 'Day Accuracy', tamil: 'நாள் துல்லியம்' },
            ].map(({ n, label, tamil }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: '700', color: '#C8A96E', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', marginTop: '4px' }}>{label}</div>
                <div style={{ fontFamily: "'Noto Sans Tamil', sans-serif", fontSize: '10px', color: 'rgba(200,169,110,0.5)', marginTop: '2px' }}>{tamil}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Responsive grid styles */}
        <style>{`
          .tithi-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
            margin-bottom: 18px;
          }
          @media (max-width: 560px) {
            .tithi-row {
              grid-template-columns: 1fr;
              gap: 14px;
              margin-bottom: 14px;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default TithiCalculator;
