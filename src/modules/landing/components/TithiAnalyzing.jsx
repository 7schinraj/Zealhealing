import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Analysis phases ────────────────────────────────────────────────────────────
const PHASES = [
  { text: 'Reading your birth vibrations…',   sub: 'Aligning with your cosmic signature' },
  { text: 'Mapping the lunar positions…',      sub: 'Calculating Moon–Sun elongation' },
  { text: 'Consulting the ancient almanac…',   sub: 'Cross-referencing Panchang records' },
  { text: 'Channelling divine guidance…',      sub: 'The Tithi Devathai is meditating' },
  { text: 'Unveiling your sacred Tithi…',      sub: 'Preparing your spiritual report' },
];

// ── Particle dot ──────────────────────────────────────────────────────────────
const Particle = ({ angle, radius, delay }) => {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return (
    <motion.div
      animate={{
        x: [x * 0.6, x, x * 0.8, x * 0.6],
        y: [y * 0.6, y, y * 0.8, y * 0.6],
        opacity: [0, 0.9, 0.5, 0],
        scale: [0, 1, 0.8, 0],
      }}
      transition={{ duration: 2.8, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 5, height: 5,
        borderRadius: '50%',
        background: '#C8A96E',
        boxShadow: '0 0 6px #C8A96E',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}
    />
  );
};

// ── Main Overlay ───────────────────────────────────────────────────────────────
const TithiAnalyzing = ({ visible, onComplete }) => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      setPhaseIdx(0);
      setProgress(0);
      return;
    }

    // Progress bar — fills over ~3500ms
    const TOTAL = 3600;
    const TICK = 40;
    let elapsed = 0;
    const progressTimer = setInterval(() => {
      elapsed += TICK;
      setProgress(Math.min((elapsed / TOTAL) * 100, 100));
      if (elapsed >= TOTAL) clearInterval(progressTimer);
    }, TICK);

    // Phase cycling
    const phaseInterval = setInterval(() => {
      setPhaseIdx(p => (p + 1) % PHASES.length);
    }, 720);

    // Complete after full duration
    const done = setTimeout(() => {
      clearInterval(phaseInterval);
      if (onComplete) onComplete();
    }, TOTAL);

    return () => {
      clearInterval(progressTimer);
      clearInterval(phaseInterval);
      clearTimeout(done);
    };
  }, [visible]);

  // 12 particles around the goddess
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    radius: 140,
    delay: i * 0.22,
  }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at 40% 30%, #1B4332 0%, #0A2F1F 45%, #060F09 100%)',
            overflow: 'hidden',
          }}
        >
          {/* ── Cosmic star field (static dots) ────────────────────────── */}
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              style={{
                position: 'absolute',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: Math.random() > 0.8 ? 3 : 2,
                height: Math.random() > 0.8 ? 3 : 2,
                borderRadius: '50%',
                background: 'white',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* ── Large radial glow behind devi ──────────────────────────── */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.32, 0.18] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '520px', height: '520px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(200,169,110,0.35) 0%, rgba(200,169,110,0.05) 55%, transparent 75%)',
              pointerEvents: 'none',
            }}
          />

          {/* ── Goddess figure area ─────────────────────────────────────── */}
          <div style={{ position: 'relative', marginBottom: '48px' }}>
            {/* Orbital ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px', height: '300px',
                borderRadius: '50%',
                border: '1px dashed rgba(200,169,110,0.3)',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '350px', height: '350px',
                borderRadius: '50%',
                border: '1px dashed rgba(200,169,110,0.15)',
                pointerEvents: 'none',
              }}
            />

            {/* Particles orbiting */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 0, height: 0 }}>
              {particles.map((p, i) => (
                <Particle key={i} {...p} />
              ))}
            </div>

            {/* ── Goddess image ─────────────────────────────────────────── */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 3 }}
            >
              {/* Halo glow */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(200,169,110,0.4) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Image */}
              <div style={{
                width: '200px', height: '200px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid rgba(200,169,110,0.5)',
                boxShadow: '0 0 40px rgba(200,169,110,0.4), 0 0 80px rgba(200,169,110,0.15)',
                background: 'rgba(200,169,110,0.1)',
                flexShrink: 0,
              }}>
                <img
                  src="/tithi-devi.jpg"
                  alt="Tithi Devathai"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>

              {/* Sparkle dots on corners */}
              {[
                { top: '-8px', right: '20px' },
                { top: '30px', right: '-10px' },
                { bottom: '20px', left: '-8px' },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5 }}
                  style={{
                    position: 'absolute', ...pos,
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    background: '#C8A96E',
                    boxShadow: '0 0 8px #C8A96E',
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* ── Animated text phases ─────────────────────────────────────── */}
          <div style={{ textAlign: 'center', maxWidth: '380px', padding: '0 24px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={phaseIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  fontWeight: '600',
                  color: 'white',
                  lineHeight: 1.3,
                  marginBottom: '8px',
                }}>
                  {PHASES[phaseIdx].text}
                </p>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.03em',
                }}>
                  {PHASES[phaseIdx].sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div style={{
              marginTop: '32px',
              width: '240px',
              height: '3px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              margin: '32px auto 0',
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #C8A96E, #F0D08E)',
                  borderRadius: '2px',
                  width: `${progress}%`,
                  boxShadow: '0 0 8px rgba(200,169,110,0.6)',
                }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Dots loader */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '20px' }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: d }}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8A96E' }}
                />
              ))}
            </div>
          </div>

          {/* ── Bottom corner decorations ────────────────────────────────── */}
          <div style={{
            position: 'absolute', bottom: '24px', left: 0, right: 0,
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '11px',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Sacred lunar astronomy · Ancient Panchang
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TithiAnalyzing;
