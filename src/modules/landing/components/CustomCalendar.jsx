import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ── Helpers ────────────────────────────────────────────────────────────────────
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAYS_OF_WEEK = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const MOON_PHASES = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function getMoonPhaseIcon(weekIndex) {
  return MOON_PHASES[weekIndex % MOON_PHASES.length];
}

// ── CustomCalendar ─────────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ChevronDownCal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const CustomCalendar = ({ value, onChange, label, dark = false }) => {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value ? parseInt(value.split('-')[0]) : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(value ? parseInt(value.split('-')[1]) - 1 : today.getMonth());
  const [mode, setMode] = useState('days'); // 'days' | 'months' | 'years'
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);

  // Years range
  const years = [];
  for (let y = 1920; y <= 2030; y++) years.push(y);

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
        setMode('days');
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [open]);

  // Swipe handlers
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) nextMonth(); else prevMonth();
    }
    touchStartX.current = null;
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDay = (day) => {
    const m = String(viewMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    onChange(`${viewYear}-${m}-${d}`);
    setOpen(false);
    setMode('days');
  };

  const formatDisplay = () => {
    if (!value) return 'DD / MM / YYYY';
    const [y, m, d] = value.split('-');
    return `${d} / ${m} / ${y}`;
  };

  // Build grid
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedDay = value ? parseInt(value.split('-')[2]) : null;
  const selectedMonth = value ? parseInt(value.split('-')[1]) - 1 : null;
  const selectedYear = value ? parseInt(value.split('-')[0]) : null;

  const isSelected = (day) =>
    day && day === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear;
  const isToday = (day) =>
    day && day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  // ── Panel content ─────────────────────────────────────────────────────────
  const panelContent = (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ userSelect: 'none' }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px 12px',
        borderBottom: '1px solid rgba(27,107,74,0.1)',
      }}>
        <button onClick={prevMonth} style={navBtnStyle}>‹</button>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button
            onClick={() => setMode(mode === 'months' ? 'days' : 'months')}
            style={headerBtnStyle}
          >
            {MONTHS[viewMonth]}
          </button>
          <button
            onClick={() => setMode(mode === 'years' ? 'days' : 'years')}
            style={headerBtnStyle}
          >
            {viewYear} ▾
          </button>
        </div>
        <button onClick={nextMonth} style={navBtnStyle}>›</button>
      </div>

      {/* Month picker */}
      {mode === 'months' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}
        >
          {MONTHS.map((mon, idx) => (
            <button key={mon} onClick={() => { setViewMonth(idx); setMode('days'); }}
              style={{
                padding: '10px 6px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: idx === viewMonth ? '700' : '400',
                background: idx === viewMonth ? '#1B6B4A' : 'transparent',
                color: idx === viewMonth ? 'white' : '#0F2318',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={e => { if (idx !== viewMonth) e.currentTarget.style.background = 'rgba(27,107,74,0.08)'; }}
              onMouseOut={e => { if (idx !== viewMonth) e.currentTarget.style.background = 'transparent'; }}
            >{mon.slice(0, 3)}</button>
          ))}
        </motion.div>
      )}

      {/* Year picker */}
      {mode === 'years' && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: '8px 16px', maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}
        >
          {years.map(yr => (
            <button key={yr} onClick={() => { setViewYear(yr); setMode('days'); }}
              style={{
                padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                textAlign: 'left', fontSize: '14px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: yr === viewYear ? '700' : '400',
                background: yr === viewYear ? '#1B6B4A' : 'transparent',
                color: yr === viewYear ? 'white' : '#0F2318',
                transition: 'background 0.15s ease',
                flexShrink: 0,
              }}
              onMouseOver={e => { if (yr !== viewYear) e.currentTarget.style.background = 'rgba(27,107,74,0.08)'; }}
              onMouseOut={e => { if (yr !== viewYear) e.currentTarget.style.background = 'transparent'; }}
            >{yr}</button>
          ))}
        </motion.div>
      )}

      {/* Day grid */}
      {mode === 'days' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '12px 16px 16px' }}>
          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '8px' }}>
            {DAYS_OF_WEEK.map(d => (
              <div key={d} style={{
                textAlign: 'center', fontSize: '11px', fontWeight: '700',
                color: '#C8A96E', letterSpacing: '0.05em',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                padding: '4px 0',
              }}>{d}</div>
            ))}
          </div>
          {/* Cells with moon phase per row */}
          {Array.from({ length: Math.ceil(cells.length / 7) }, (_, rowIdx) => (
            <div key={rowIdx} style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '2px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1 }}>
                {cells.slice(rowIdx * 7, rowIdx * 7 + 7).map((day, ci) => (
                  <button
                    key={ci}
                    onClick={() => day && selectDay(day)}
                    disabled={!day}
                    style={{
                      minWidth: '36px', minHeight: '36px',
                      padding: '0',
                      border: isToday(day) ? '2px solid #C8A96E' : '2px solid transparent',
                      borderRadius: '50%',
                      background: isSelected(day) ? '#1B6B4A' : 'transparent',
                      color: isSelected(day) ? 'white' : day ? '#0F2318' : 'transparent',
                      cursor: day ? 'pointer' : 'default',
                      fontSize: '13px',
                      fontWeight: isSelected(day) ? '700' : '400',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: 'all 0.15s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    onMouseOver={e => { if (day && !isSelected(day)) e.currentTarget.style.background = 'rgba(27,107,74,0.1)'; }}
                    onMouseOut={e => { if (day && !isSelected(day)) e.currentTarget.style.background = 'transparent'; }}
                  >{day || ''}</button>
                ))}
              </div>
              <span style={{ fontSize: '12px', opacity: 0.5, flexShrink: 0, width: '18px', textAlign: 'center' }}>
                {getMoonPhaseIcon(rowIdx)}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Today button */}
      {mode === 'days' && (
        <div style={{ padding: '0 16px 14px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => { selectDay(today.getDate()); setViewMonth(today.getMonth()); setViewYear(today.getFullYear()); }}
            style={{
              background: 'none', border: '1px solid rgba(27,107,74,0.25)', borderRadius: '20px',
              padding: '5px 18px', fontSize: '12px', color: '#1B6B4A',
              cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: '600',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(27,107,74,0.08)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'none'; }}
          >Today</button>
        </div>
      )}
    </div>
  );

  const triggerBg = dark ? 'rgba(255,255,255,0.07)' : 'white';
  const triggerBorder = dark
    ? `1.5px solid ${open ? '#C8A96E' : 'rgba(255,255,255,0.13)'}`
    : `1.5px solid ${open ? '#1B6B4A' : '#DDE8E2'}`;
  const triggerShadow = open
    ? (dark ? '0 0 0 3px rgba(200,169,110,0.13)' : '0 0 0 4px rgba(27,107,74,0.1)')
    : 'none';
  const triggerText = dark ? (value ? 'white' : 'rgba(255,255,255,0.35)') : (value ? '#0F2318' : '#8FA89E');
  const iconColor = dark ? 'rgba(255,255,255,0.38)' : '#1B6B4A';

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Label — only shown if non-empty and not dark (dark = parent handles label) */}
      {label && !dark && (
        <div style={{ marginBottom: '7px' }}>
          <label style={{ fontSize: '11px', fontWeight: '700', color: '#0F2318', letterSpacing: '0.09em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {label}
          </label>
        </div>
      )}
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setMode('days'); }}
        style={{
          width: '100%', height: '50px',
          padding: '0 16px',
          background: triggerBg,
          border: triggerBorder,
          borderRadius: '14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
          boxShadow: triggerShadow,
          transition: 'all 0.25s ease',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
          <span style={{ color: iconColor, display: 'flex', flexShrink: 0 }}><CalendarIcon /></span>
          <span style={{ fontSize: '14px', color: triggerText, fontFamily: "'Plus Jakarta Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {formatDisplay()}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
          style={{ color: iconColor, display: 'flex', flexShrink: 0 }}><ChevronDownCal /></motion.span>
      </button>

      {/* Panel — bottom sheet on mobile, inline dropdown on desktop */}
      <AnimatePresence>
        {open && (
          <>
            {isMobile ? (
              <>
                {/* Mobile backdrop */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => { setOpen(false); setMode('days'); }}
                  style={{
                    position: 'fixed', inset: 0, background: 'rgba(10,47,31,0.55)',
                    backdropFilter: 'blur(6px)', zIndex: 9000,
                  }}
                />
                {/* Mobile bottom sheet */}
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                  style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0,
                    background: 'white',
                    borderRadius: '28px 28px 0 0',
                    boxShadow: '0 -20px 60px rgba(0,0,0,0.2)',
                    zIndex: 9001,
                    maxHeight: '85vh', overflowY: 'auto',
                  }}
                >
                  {/* Drag handle */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 0' }}>
                    <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: '#DDE8E2', margin: '0 auto 0 auto' }} />
                    <button onClick={() => { setOpen(false); setMode('days'); }}
                      style={{ position: 'absolute', right: '20px', top: '16px', background: 'rgba(27,107,74,0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '14px', color: '#1B6B4A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                  </div>
                  <div style={{ padding: '8px 0 24px' }}>
                    {panelContent}
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 1000,
                  background: 'white', borderRadius: '18px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(27,107,74,0.12)',
                  minWidth: '320px', overflow: 'hidden',
                }}
              >
                {panelContent}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Shared Button Styles ───────────────────────────────────────────────────────
const navBtnStyle = {
  width: '32px', height: '32px', border: 'none', background: 'rgba(27,107,74,0.08)',
  borderRadius: '50%', cursor: 'pointer', fontSize: '18px', color: '#1B6B4A',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'background 0.2s ease', fontFamily: 'inherit',
};
const headerBtnStyle = {
  background: 'none', border: 'none', cursor: 'pointer',
  fontSize: '15px', fontWeight: '700', color: '#0F2318',
  fontFamily: "'Cormorant Garamond', serif",
  padding: '4px 8px', borderRadius: '8px',
  transition: 'background 0.2s ease',
};

export default CustomCalendar;
