import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ── SVG Icons for each intent option ─────────────────────────────────────────
const IconBirthday = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M12 3v2M10 1l2 2 2-2" />
  </svg>
);
const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconEvent = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </svg>
);
const IconLotus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
    <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Options ───────────────────────────────────────────────────────────────────
const OPTIONS = [
  { value: 'birthday',  Icon: IconBirthday, label: 'Birthday Tithi',    desc: 'Discover the lunar energy of your birth day' },
  { value: 'daily',     Icon: IconMoon,     label: 'Daily Guidance',     desc: 'Understand today\'s spiritual vibration' },
  { value: 'muhurtham', Icon: IconEvent,    label: 'Muhurtham / Event',  desc: 'Find the sacred timing for your occasion' },
  { value: 'practice',  Icon: IconLotus,    label: 'Spiritual Practice', desc: 'Align your sadhana with the lunar cycle' },
];

// ── CustomDropdown ─────────────────────────────────────────────────────────────
const CustomDropdown = ({ value, onChange, label, dark = false }) => {
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const selected = OPTIONS.find(o => o.value === value);

  // Derived styles
  const labelColor = dark ? 'rgba(255,255,255,0.75)' : '#0F2318';
  const triggerBg = dark ? 'rgba(255,255,255,0.08)' : 'white';
  const triggerBorderColor = open
    ? (dark ? '#C8A96E' : '#1B6B4A')
    : (dark ? 'rgba(255,255,255,0.15)' : '#DDE8E2');
  const textColor = dark ? 'white' : '#0F2318';
  const placeholderColor = dark ? 'rgba(255,255,255,0.35)' : '#8FA89E';
  const iconColor = dark ? 'rgba(255,255,255,0.5)' : '#1B6B4A';

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
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setFocusedIdx(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); }
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedIdx(i => Math.min(i + 1, OPTIONS.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocusedIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && focusedIdx >= 0) { select(OPTIONS[focusedIdx].value); }
    else if (e.key === 'Escape') { setOpen(false); setFocusedIdx(-1); }
  };

  const select = (val) => {
    onChange(val);
    setOpen(false);
    setFocusedIdx(-1);
  };

  const optionList = (
    <div>
      {OPTIONS.map((opt, idx) => {
        const isSelected = value === opt.value;
        const isFocused = focusedIdx === idx;
        return (
          <motion.button
            key={opt.value}
            type="button"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04 }}
            onClick={() => select(opt.value)}
            onMouseEnter={() => setFocusedIdx(idx)}
            onMouseLeave={() => setFocusedIdx(-1)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center',
              gap: '14px', padding: isMobile ? '16px 18px' : '13px 16px',
              background: isFocused ? 'rgba(27,107,74,0.07)' : (isSelected ? 'rgba(27,107,74,0.04)' : 'transparent'),
              border: 'none',
              borderLeft: `3px solid ${isFocused || isSelected ? '#1B6B4A' : 'transparent'}`,
              cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.18s ease',
            }}
          >
            {/* SVG icon in a tinted circle */}
            <span style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: isSelected ? 'rgba(27,107,74,0.15)' : 'rgba(27,107,74,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: isSelected ? '#1B6B4A' : '#4A5D54',
              flexShrink: 0, transition: 'all 0.18s ease',
            }}>
              <opt.Icon />
            </span>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '14px', fontWeight: '600',
                color: isSelected ? '#1B6B4A' : '#0F2318',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: '2px',
              }}>{opt.label}</div>
              <div style={{
                fontSize: '11px', color: '#8FA89E',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{opt.desc}</div>
            </div>

            {isSelected && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{ color: '#C8A96E', flexShrink: 0, display: 'flex' }}
              >
                <CheckIcon />
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Label */}
      {label && (
        <div style={{ marginBottom: '6px' }}>
          <label style={{
            fontSize: '12px', fontWeight: '700',
            color: labelColor,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            {label}
          </label>
        </div>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          width: '100%', height: '50px',
          padding: '0 16px',
          background: triggerBg,
          border: `1.5px solid ${triggerBorderColor}`,
          borderRadius: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '12px',
          boxShadow: open ? (dark ? '0 0 0 4px rgba(200,169,110,0.15)' : '0 0 0 4px rgba(27,107,74,0.1)') : 'none',
          transition: 'all 0.25s ease',
        }}
      >
        {selected ? (
          <>
            <span style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: dark ? 'rgba(200,169,110,0.15)' : 'rgba(27,107,74,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: dark ? '#C8A96E' : '#1B6B4A', flexShrink: 0,
            }}>
              <selected.Icon />
            </span>
            <span style={{
              flex: 1, textAlign: 'left',
              fontSize: '14px', fontWeight: '600',
              color: textColor,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              {selected.label}
            </span>
          </>
        ) : (
          <>
            <span style={{ color: iconColor, display: 'flex', flexShrink: 0, width: '28px', justifyContent: 'center' }}>
              <ChevronDownIcon />
            </span>
            <span style={{
              flex: 1, textAlign: 'left',
              fontSize: '14px', color: placeholderColor,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              Select your intent…
            </span>
          </>
        )}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: iconColor, display: 'flex', flexShrink: 0 }}
        >
          <ChevronDownIcon />
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <>
            {isMobile ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => { setOpen(false); setFocusedIdx(-1); }}
                  style={{ position: 'fixed', inset: 0, background: 'rgba(10,47,31,0.45)', backdropFilter: 'blur(4px)', zIndex: 9000 }}
                />
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                  style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderRadius: '28px 28px 0 0', boxShadow: '0 -20px 60px rgba(0,0,0,0.2)', zIndex: 9001, paddingBottom: '32px' }}
                >
                  <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid rgba(27,107,74,0.08)', position: 'relative' }}>
                    <div style={{ width: '40px', height: '4px', background: '#DDE8E2', borderRadius: '2px', margin: '0 auto 12px' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F2318', fontFamily: "'Cormorant Garamond', serif" }}>
                        Choose Your Intent
                      </span>
                      <button onClick={() => setOpen(false)} style={{ background: 'rgba(27,107,74,0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#1B6B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>✕</button>
                    </div>
                  </div>
                  <div ref={listRef}>{optionList}</div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                role="listbox"
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
                  background: 'white', borderRadius: '18px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(27,107,74,0.12)',
                  overflow: 'hidden', zIndex: 1000,
                }}
              >
                {optionList}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
