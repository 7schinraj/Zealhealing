import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ── Icons ──────────────────────────────────────────────────────────────────────
const ChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ── CustomTimePicker ───────────────────────────────────────────────────────────
const CustomTimePicker = ({ value, onChange, label, dark = false }) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Parse value → { hour, minute, ampm }
  const parseValue = () => {
    if (!value) return { hour: 12, minute: 0, ampm: 'AM' };
    const [timePart, period] = value.split(' ');
    const [h, m] = timePart.split(':').map(Number);
    return { hour: h, minute: m, ampm: period || 'AM' };
  };

  const [hour, setHour] = useState(parseValue().hour);
  const [minute, setMinute] = useState(parseValue().minute);
  const [ampm, setAmpm] = useState(parseValue().ampm);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) close();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [open]);

  const commit = (h, m, ap) => {
    const hStr = String(h).padStart(2, '0');
    const mStr = String(m).padStart(2, '0');
    onChange(`${hStr}:${mStr} ${ap}`);
  };

  const incHour = () => { const h = hour === 12 ? 1 : hour + 1; setHour(h); commit(h, minute, ampm); };
  const decHour = () => { const h = hour === 1 ? 12 : hour - 1; setHour(h); commit(h, minute, ampm); };
  const incMinute = () => { const m = minute === 59 ? 0 : minute + 1; setMinute(m); commit(hour, m, ampm); };
  const decMinute = () => { const m = minute === 0 ? 59 : minute - 1; setMinute(m); commit(hour, m, ampm); };
  const toggleAmpm = (v) => { setAmpm(v); commit(hour, minute, v); };

  const close = () => setOpen(false);

  const displayValue = value
    ? `${String(hour).padStart(2, '0')} : ${String(minute).padStart(2, '0')}  ${ampm}`
    : null;

  const labelColor = dark ? 'rgba(255,255,255,0.75)' : '#0F2318';
  const triggerBg = dark ? 'rgba(255,255,255,0.08)' : 'white';
  const triggerBorder = (active) => dark
    ? `1.5px solid ${active ? '#C8A96E' : 'rgba(255,255,255,0.15)'}`
    : `1.5px solid ${active ? '#1B6B4A' : '#DDE8E2'}`;
  const textColor = dark ? 'white' : '#0F2318';
  const placeholderColor = dark ? 'rgba(255,255,255,0.35)' : '#8FA89E';
  const iconColor = dark ? 'rgba(255,255,255,0.5)' : '#1B6B4A';

  const panel = (
    <div style={{ padding: '28px 24px 20px' }}>
      {/* Columns */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        marginBottom: '20px',
      }}>
        {/* Hour */}
        <SpinColumn
          value={String(hour).padStart(2, '0')}
          onUp={incHour}
          onDown={decHour}
          label="Hour"
        />

        {/* Separator */}
        <div style={{ fontSize: '28px', fontWeight: '300', color: '#DDE8E2', lineHeight: 1, marginTop: '2px', userSelect: 'none' }}>:</div>

        {/* Minute */}
        <SpinColumn
          value={String(minute).padStart(2, '0')}
          onUp={incMinute}
          onDown={decMinute}
          label="Min"
        />

        {/* AM / PM */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginLeft: '8px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#C8A96E', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans', sans-serif", textAlign: 'center', marginBottom: '2px' }}>AM/PM</div>
          {['AM', 'PM'].map(p => (
            <button key={p} type="button" onClick={() => toggleAmpm(p)}
              style={{
                padding: '10px 14px', border: 'none', borderRadius: '10px',
                cursor: 'pointer', fontSize: '13px', fontWeight: '700',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: ampm === p ? '#1B6B4A' : 'rgba(27,107,74,0.06)',
                color: ampm === p ? 'white' : '#4A5D54',
                transition: 'all 0.2s ease',
              }}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* Set button */}
      <button type="button" onClick={close}
        style={{
          width: '100%', padding: '12px', border: 'none', borderRadius: '12px',
          background: 'linear-gradient(135deg, #1B6B4A, #2D8F65)',
          color: 'white', fontWeight: '700', fontSize: '13px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          cursor: 'pointer', letterSpacing: '0.03em',
          boxShadow: '0 4px 16px rgba(27,107,74,0.25)',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-1px)'}
        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        Confirm Time
      </button>
    </div>
  );

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {label && (
        <label style={{
          display: 'block', marginBottom: '6px',
          fontSize: '12px', fontWeight: '700', color: labelColor,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>{label}</label>
      )}

      {/* Trigger */}
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', height: '50px',
          padding: '0 16px',
          background: triggerBg,
          border: triggerBorder(open),
          borderRadius: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '12px',
          boxShadow: open ? (dark ? '0 0 0 3px rgba(200,169,110,0.13)' : '0 0 0 4px rgba(27,107,74,0.1)') : 'none',
          transition: 'all 0.25s ease',
        }}
      >
        <span style={{ color: iconColor, display: 'flex', flexShrink: 0 }}><ClockIcon /></span>
        <span style={{
          flex: 1, textAlign: 'left',
          fontSize: '14px', fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: displayValue ? textColor : placeholderColor,
          letterSpacing: displayValue ? '0.08em' : 0,
          fontWeight: displayValue ? '600' : '400',
        }}>
          {displayValue || 'HH : MM  AM/PM'}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
          style={{ color: iconColor, display: 'flex', flexShrink: 0 }}>
          <ChevronDown />
        </motion.span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {isMobile ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={close}
                  style={{ position: 'fixed', inset: 0, background: 'rgba(10,47,31,0.55)', backdropFilter: 'blur(6px)', zIndex: 9000 }}
                />
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                  style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderRadius: '28px 28px 0 0', boxShadow: '0 -20px 60px rgba(0,0,0,0.2)', zIndex: 9001, paddingBottom: '24px' }}
                >
                  <div style={{ padding: '16px 20px 0', position: 'relative' }}>
                    <div style={{ width: '40px', height: '4px', background: '#DDE8E2', borderRadius: '2px', margin: '0 auto 16px' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F2318', fontFamily: "'Cormorant Garamond', serif" }}>Select Birth Time</span>
                      <button onClick={close} style={{ background: 'rgba(27,107,74,0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#1B6B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>✕</button>
                    </div>
                  </div>
                  {panel}
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 1000,
                  background: 'white', borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                  border: '1px solid rgba(27,107,74,0.12)',
                  minWidth: '280px', overflow: 'hidden',
                }}
              >
                <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid rgba(27,107,74,0.08)' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F2318', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.03em' }}>Select Birth Time</span>
                </div>
                {panel}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Spin Column (Hour / Minute) ───────────────────────────────────────────────
const SpinColumn = ({ value, onUp, onDown, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
    <div style={{ fontSize: '10px', fontWeight: '700', color: '#C8A96E', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: '2px' }}>{label}</div>
    <button type="button" onClick={onUp}
      style={{ width: '44px', height: '36px', border: '1.5px solid #DDE8E2', borderRadius: '10px', background: 'rgba(27,107,74,0.04)', cursor: 'pointer', color: '#1B6B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s ease' }}
      onMouseOver={e => { e.currentTarget.style.background = 'rgba(27,107,74,0.1)'; e.currentTarget.style.borderColor = '#1B6B4A'; }}
      onMouseOut={e => { e.currentTarget.style.background = 'rgba(27,107,74,0.04)'; e.currentTarget.style.borderColor = '#DDE8E2'; }}
    ><ChevronUp /></button>

    <div style={{
      width: '60px', height: '52px',
      background: 'rgba(27,107,74,0.06)', border: '1.5px solid rgba(27,107,74,0.15)',
      borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <motion.span
        key={value}
        initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.18 }}
        style={{ fontSize: '22px', fontWeight: '800', color: '#0F2318', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.03em' }}
      >{value}</motion.span>
    </div>

    <button type="button" onClick={onDown}
      style={{ width: '44px', height: '36px', border: '1.5px solid #DDE8E2', borderRadius: '10px', background: 'rgba(27,107,74,0.04)', cursor: 'pointer', color: '#1B6B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s ease' }}
      onMouseOver={e => { e.currentTarget.style.background = 'rgba(27,107,74,0.1)'; e.currentTarget.style.borderColor = '#1B6B4A'; }}
      onMouseOut={e => { e.currentTarget.style.background = 'rgba(27,107,74,0.04)'; e.currentTarget.style.borderColor = '#DDE8E2'; }}
    ><ChevronDown /></button>
  </div>
);

export default CustomTimePicker;
