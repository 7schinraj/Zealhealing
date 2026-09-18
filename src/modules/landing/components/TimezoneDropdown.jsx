import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ── Icon ──────────────────────────────────────────────────────────────────────
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

// ── Timezone Data ─────────────────────────────────────────────────────────────
const TIMEZONES = [
  // Asia
  { value: 'Asia/Kolkata',       label: 'India Standard Time',         abbr: 'IST',   offset: '+05:30', region: 'Asia' },
  { value: 'Asia/Colombo',       label: 'Sri Lanka Time',               abbr: 'SLT',   offset: '+05:30', region: 'Asia' },
  { value: 'Asia/Dhaka',         label: 'Bangladesh Standard Time',     abbr: 'BST',   offset: '+06:00', region: 'Asia' },
  { value: 'Asia/Kathmandu',     label: 'Nepal Time',                   abbr: 'NPT',   offset: '+05:45', region: 'Asia' },
  { value: 'Asia/Karachi',       label: 'Pakistan Standard Time',       abbr: 'PKT',   offset: '+05:00', region: 'Asia' },
  { value: 'Asia/Dubai',         label: 'Gulf Standard Time',           abbr: 'GST',   offset: '+04:00', region: 'Asia' },
  { value: 'Asia/Riyadh',        label: 'Arabia Standard Time',         abbr: 'AST',   offset: '+03:00', region: 'Asia' },
  { value: 'Asia/Singapore',     label: 'Singapore Time',               abbr: 'SGT',   offset: '+08:00', region: 'Asia' },
  { value: 'Asia/Kuala_Lumpur',  label: 'Malaysia Time',                abbr: 'MYT',   offset: '+08:00', region: 'Asia' },
  { value: 'Asia/Jakarta',       label: 'Indonesia Western Time',       abbr: 'WIB',   offset: '+07:00', region: 'Asia' },
  { value: 'Asia/Bangkok',       label: 'Indochina Time',               abbr: 'ICT',   offset: '+07:00', region: 'Asia' },
  { value: 'Asia/Shanghai',      label: 'China Standard Time',          abbr: 'CST',   offset: '+08:00', region: 'Asia' },
  { value: 'Asia/Hong_Kong',     label: 'Hong Kong Time',               abbr: 'HKT',   offset: '+08:00', region: 'Asia' },
  { value: 'Asia/Tokyo',         label: 'Japan Standard Time',          abbr: 'JST',   offset: '+09:00', region: 'Asia' },
  { value: 'Asia/Seoul',         label: 'Korea Standard Time',          abbr: 'KST',   offset: '+09:00', region: 'Asia' },
  { value: 'Asia/Taipei',        label: 'Taipei Standard Time',         abbr: 'CST',   offset: '+08:00', region: 'Asia' },
  { value: 'Asia/Muscat',        label: 'Gulf Standard Time (Oman)',    abbr: 'GST',   offset: '+04:00', region: 'Asia' },
  { value: 'Asia/Beirut',        label: 'Eastern European Time',        abbr: 'EET',   offset: '+02:00', region: 'Asia' },
  { value: 'Asia/Kabul',         label: 'Afghanistan Time',             abbr: 'AFT',   offset: '+04:30', region: 'Asia' },
  { value: 'Asia/Tashkent',      label: 'Uzbekistan Time',              abbr: 'UZT',   offset: '+05:00', region: 'Asia' },
  // Europe
  { value: 'Europe/London',      label: 'Greenwich Mean Time',          abbr: 'GMT',   offset: '+00:00', region: 'Europe' },
  { value: 'Europe/Paris',       label: 'Central European Time',        abbr: 'CET',   offset: '+01:00', region: 'Europe' },
  { value: 'Europe/Berlin',      label: 'Central European Time',        abbr: 'CET',   offset: '+01:00', region: 'Europe' },
  { value: 'Europe/Rome',        label: 'Central European Time',        abbr: 'CET',   offset: '+01:00', region: 'Europe' },
  { value: 'Europe/Madrid',      label: 'Central European Time',        abbr: 'CET',   offset: '+01:00', region: 'Europe' },
  { value: 'Europe/Moscow',      label: 'Moscow Standard Time',         abbr: 'MSK',   offset: '+03:00', region: 'Europe' },
  { value: 'Europe/Athens',      label: 'Eastern European Time',        abbr: 'EET',   offset: '+02:00', region: 'Europe' },
  { value: 'Europe/Amsterdam',   label: 'Central European Time',        abbr: 'CET',   offset: '+01:00', region: 'Europe' },
  { value: 'Europe/Stockholm',   label: 'Central European Time',        abbr: 'CET',   offset: '+01:00', region: 'Europe' },
  // Americas
  { value: 'America/New_York',   label: 'Eastern Time',                 abbr: 'ET',    offset: '-05:00', region: 'Americas' },
  { value: 'America/Chicago',    label: 'Central Time',                 abbr: 'CT',    offset: '-06:00', region: 'Americas' },
  { value: 'America/Denver',     label: 'Mountain Time',                abbr: 'MT',    offset: '-07:00', region: 'Americas' },
  { value: 'America/Los_Angeles',label: 'Pacific Time',                 abbr: 'PT',    offset: '-08:00', region: 'Americas' },
  { value: 'America/Anchorage',  label: 'Alaska Time',                  abbr: 'AKT',   offset: '-09:00', region: 'Americas' },
  { value: 'Pacific/Honolulu',   label: 'Hawaii Time',                  abbr: 'HST',   offset: '-10:00', region: 'Americas' },
  { value: 'America/Toronto',    label: 'Eastern Time (Canada)',        abbr: 'ET',    offset: '-05:00', region: 'Americas' },
  { value: 'America/Vancouver',  label: 'Pacific Time (Canada)',        abbr: 'PT',    offset: '-08:00', region: 'Americas' },
  { value: 'America/Sao_Paulo',  label: 'Brazil Time',                  abbr: 'BRT',   offset: '-03:00', region: 'Americas' },
  { value: 'America/Buenos_Aires',label: 'Argentina Time',              abbr: 'ART',   offset: '-03:00', region: 'Americas' },
  { value: 'America/Mexico_City',label: 'Central Time (Mexico)',        abbr: 'CST',   offset: '-06:00', region: 'Americas' },
  // Australia & Pacific
  { value: 'Australia/Sydney',   label: 'Australian Eastern Time',      abbr: 'AEST',  offset: '+10:00', region: 'Pacific' },
  { value: 'Australia/Melbourne',label: 'Australian Eastern Time',      abbr: 'AEST',  offset: '+10:00', region: 'Pacific' },
  { value: 'Australia/Adelaide', label: 'Australian Central Time',      abbr: 'ACST',  offset: '+09:30', region: 'Pacific' },
  { value: 'Australia/Perth',    label: 'Australian Western Time',      abbr: 'AWST',  offset: '+08:00', region: 'Pacific' },
  { value: 'Pacific/Auckland',   label: 'New Zealand Time',             abbr: 'NZST',  offset: '+12:00', region: 'Pacific' },
  { value: 'Pacific/Fiji',       label: 'Fiji Time',                    abbr: 'FJT',   offset: '+12:00', region: 'Pacific' },
  // Africa
  { value: 'Africa/Lagos',       label: 'West Africa Time',             abbr: 'WAT',   offset: '+01:00', region: 'Africa' },
  { value: 'Africa/Cairo',       label: 'Eastern European Time',        abbr: 'EET',   offset: '+02:00', region: 'Africa' },
  { value: 'Africa/Nairobi',     label: 'East Africa Time',             abbr: 'EAT',   offset: '+03:00', region: 'Africa' },
  { value: 'Africa/Johannesburg',label: 'South Africa Standard Time',   abbr: 'SAST',  offset: '+02:00', region: 'Africa' },
  // UTC
  { value: 'UTC',                label: 'Coordinated Universal Time',   abbr: 'UTC',   offset: '+00:00', region: 'Universal' },
];

const REGIONS = ['All', 'Asia', 'Europe', 'Americas', 'Pacific', 'Africa', 'Universal'];

// ── TimezoneDropdown ───────────────────────────────────────────────────────────
const TimezoneDropdown = ({ value, onChange, label, dark = false }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);

  const selected = TIMEZONES.find(t => t.value === value);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

  // Auto-focus search when panel opens
  useEffect(() => {
    if (open && !isMobile) {
      setTimeout(() => searchRef.current?.focus(), 80);
    }
  }, [open, isMobile]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return TIMEZONES.filter(t => {
      const regionMatch = region === 'All' || t.region === region;
      const searchMatch = !q
        || t.label.toLowerCase().includes(q)
        || t.abbr.toLowerCase().includes(q)
        || t.offset.includes(q)
        || t.value.toLowerCase().includes(q);
      return regionMatch && searchMatch;
    });
  }, [search, region]);

  const select = (tz) => {
    onChange(tz.value);
    close();
  };

  const close = () => {
    setOpen(false);
    setSearch('');
  };

  // Styles
  const labelColor = dark ? 'rgba(255,255,255,0.75)' : '#0F2318';
  const triggerBg = dark ? 'rgba(255,255,255,0.08)' : 'white';
  const triggerBorder = (active) => dark
    ? `1.5px solid ${active ? '#C8A96E' : 'rgba(255,255,255,0.15)'}`
    : `1.5px solid ${active ? '#1B6B4A' : '#DDE8E2'}`;
  const textColor = dark ? 'white' : '#0F2318';
  const placeholderColor = dark ? 'rgba(255,255,255,0.35)' : '#8FA89E';
  const iconColor = dark ? 'rgba(255,255,255,0.5)' : '#1B6B4A';

  const listContent = (
    <div>
      {/* Search */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(27,107,74,0.08)', position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8FA89E', display: 'flex' }}>
            <SearchIcon />
          </span>
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search timezone or city…"
            style={{
              width: '100%', padding: '10px 12px 10px 34px',
              border: '1.5px solid #DDE8E2', borderRadius: '10px',
              fontSize: '13px', fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: '#0F2318', outline: 'none',
              transition: 'border-color 0.2s ease', background: '#F4F8F5',
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#1B6B4A'}
            onBlur={e => e.currentTarget.style.borderColor = '#DDE8E2'}
          />
        </div>
      </div>

      {/* Region filter pills */}
      <div style={{ padding: '10px 14px 8px', display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {REGIONS.map(r => (
          <button key={r} type="button" onClick={() => setRegion(r)}
            style={{
              padding: '4px 12px', border: 'none', borderRadius: '20px', cursor: 'pointer',
              fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: region === r ? '#1B6B4A' : 'rgba(27,107,74,0.07)',
              color: region === r ? 'white' : '#4A5D54',
              transition: 'all 0.15s ease', flexShrink: 0,
            }}
          >{r}</button>
        ))}
      </div>

      {/* Timezone list */}
      <div ref={listRef} style={{ maxHeight: '220px', overflowY: 'auto', padding: '4px 0' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#8FA89E', fontSize: '13px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            No timezones found
          </div>
        ) : (
          filtered.map((tz, idx) => {
            const isSelected = value === tz.value;
            return (
              <button key={tz.value} type="button" onClick={() => select(tz)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  gap: '12px', padding: '10px 16px',
                  background: isSelected ? 'rgba(27,107,74,0.06)' : 'transparent',
                  border: 'none', borderLeft: `3px solid ${isSelected ? '#1B6B4A' : 'transparent'}`,
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'background 0.15s ease',
                }}
                onMouseOver={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(27,107,74,0.04)'; }}
                onMouseOut={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Offset badge */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: '54px', padding: '3px 6px',
                  background: isSelected ? 'rgba(27,107,74,0.12)' : 'rgba(0,0,0,0.04)',
                  borderRadius: '6px', fontSize: '10px', fontWeight: '700',
                  color: isSelected ? '#1B6B4A' : '#8FA89E',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.04em',
                  flexShrink: 0,
                }}>{tz.offset}</span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#0F2318', fontFamily: "'Plus Jakarta Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tz.abbr} — {tz.label}
                  </div>
                  <div style={{ fontSize: '10px', color: '#8FA89E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {tz.value.replace('_', ' ')}
                  </div>
                </div>

                {isSelected && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{ color: '#C8A96E', flexShrink: 0, display: 'flex' }}>
                    <CheckIcon />
                  </motion.span>
                )}
              </button>
            );
          })
        )}
      </div>
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
          boxShadow: open ? (dark ? '0 0 0 4px rgba(200,169,110,0.15)' : '0 0 0 4px rgba(27,107,74,0.1)') : 'none',
          transition: 'all 0.25s ease',
        }}
      >
        <span style={{ color: iconColor, display: 'flex', flexShrink: 0 }}><GlobeIcon /></span>
        <span style={{ flex: 1, textAlign: 'left' }}>
          {selected ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', padding: '2px 8px', background: 'rgba(27,107,74,0.15)', borderRadius: '5px', color: '#1B6B4A', fontWeight: '700', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{selected.offset}</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: textColor, fontFamily: "'Plus Jakarta Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selected.abbr} — {selected.label}</span>
            </span>
          ) : (
            <span style={{ fontSize: '14px', color: placeholderColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Select timezone…
            </span>
          )}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
          style={{ color: iconColor, display: 'flex', flexShrink: 0 }}>
          <ChevronDownIcon />
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
                  style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderRadius: '28px 28px 0 0', boxShadow: '0 -20px 60px rgba(0,0,0,0.2)', zIndex: 9001, maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
                    <div style={{ width: '40px', height: '4px', background: '#DDE8E2', borderRadius: '2px', margin: '0 auto 16px' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F2318', fontFamily: "'Cormorant Garamond', serif" }}>Select Timezone</span>
                      <button onClick={close} style={{ background: 'rgba(27,107,74,0.08)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: '#1B6B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>✕</button>
                    </div>
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '32px' }}>{listContent}</div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
                  background: 'white', borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                  border: '1px solid rgba(27,107,74,0.12)',
                  overflow: 'hidden', zIndex: 1000,
                  minWidth: '340px',
                }}
              >
                {listContent}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimezoneDropdown;
