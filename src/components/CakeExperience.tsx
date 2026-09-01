import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiEffect from './ConfettiEffect';

interface CakeExperienceProps {
  onCakeComplete: () => void;
}

// ─── SVG Cake Component ───────────────────────────────────────────────────────
function CakeSVG({ cut, pieces }: { cut: boolean; pieces: boolean }) {
  return (
    <svg
      viewBox="0 0 320 300"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="plateGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff5f7" />
          <stop offset="100%" stopColor="#fdeef2" />
        </radialGradient>
        <radialGradient id="layer1grad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f8d7e3" />
          <stop offset="100%" stopColor="#e8b4c8" />
        </radialGradient>
        <radialGradient id="layer2grad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fdeef2" />
          <stop offset="100%" stopColor="#f5c8d8" />
        </radialGradient>
        <radialGradient id="layer3grad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f8d7e3" />
          <stop offset="100%" stopColor="#dfa0bc" />
        </radialGradient>
        <radialGradient id="frostingGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fdeef2" />
        </radialGradient>
        <filter id="cakeShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(200,130,155,0.25)" />
        </filter>
        <radialGradient id="candleFlame1" cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor="#fff9c4" />
          <stop offset="50%" stopColor="#ffcc02" />
          <stop offset="100%" stopColor="#ff8a00" />
        </radialGradient>
        <radialGradient id="candleFlame2" cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor="#fff9c4" />
          <stop offset="50%" stopColor="#ffb3c1" />
          <stop offset="100%" stopColor="#ff6b9d" />
        </radialGradient>
        <radialGradient id="glowOrb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(245,93,132,0.45)" />
          <stop offset="100%" stopColor="rgba(245,93,132,0)" />
        </radialGradient>
      </defs>

      {/* ── Plate ── */}
      <ellipse cx="160" cy="278" rx="130" ry="14" fill="url(#plateGrad)" stroke="#e8b4c8" strokeWidth="1.5" />

      {/* ── Main Cake Body (not cut) ── */}
      {!cut && (
        <g filter="url(#cakeShadow)">
          {/* Layer 3 – bottom */}
          <rect x="52" y="220" width="216" height="52" rx="6" fill="url(#layer3grad)" />
          <rect x="52" y="220" width="216" height="8" rx="4" fill="#f5c8d8" />
          {[70, 95, 120, 145, 170, 195, 220, 245].map((x) => (
            <rect key={x} x={x} y="230" width="2" height="36" rx="1" fill="rgba(255,255,255,0.3)" />
          ))}

          {/* Frosting drips */}
          {[65, 95, 130, 165, 200, 235, 255].map((x, i) => (
            <ellipse key={i} cx={x} cy="224" rx="7" ry="9" fill="#fff5f7" opacity="0.9" />
          ))}

          {/* Layer 2 – middle */}
          <rect x="68" y="162" width="184" height="60" rx="6" fill="url(#layer2grad)" />
          <rect x="68" y="162" width="184" height="8" rx="4" fill="#fdeef2" />
          {[82, 110, 138, 166, 194, 222, 240].map((x) => (
            <rect key={x} x={x} y="172" width="2" height="44" rx="1" fill="rgba(255,255,255,0.35)" />
          ))}

          {/* Frosting drips */}
          {[78, 110, 142, 174, 206, 238].map((x, i) => (
            <ellipse key={i} cx={x} cy="166" rx="6" ry="8" fill="#fff5f7" opacity="0.95" />
          ))}

          {/* Layer 1 – top */}
          <rect x="88" y="112" width="144" height="52" rx="6" fill="url(#layer1grad)" />
          <rect x="88" y="112" width="144" height="8" rx="4" fill="#f8d7e3" />
          {[102, 128, 154, 180, 206, 222].map((x) => (
            <rect key={x} x={x} y="122" width="2" height="36" rx="1" fill="rgba(255,255,255,0.3)" />
          ))}

          {/* Top frosting */}
          <rect x="88" y="108" width="144" height="12" rx="6" fill="url(#frostingGrad)" />

          {/* Frosting drips */}
          {[96, 120, 148, 176, 204, 224].map((x, i) => (
            <ellipse key={i} cx={x} cy="112" rx="5" ry="7" fill="white" opacity="0.95" />
          ))}

          {/* Decorative pearls & flowers */}
          {[80, 140, 200, 245].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="248" r="4" fill="rgba(245,93,132,0.4)" />
              <circle cx={x} cy="248" r="2" fill="rgba(255,255,255,0.8)" />
            </g>
          ))}
          {[90, 160, 230].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="193" r="4" fill="rgba(245,93,132,0.35)" />
              <circle cx={x} cy="193" r="2" fill="rgba(255,255,255,0.8)" />
            </g>
          ))}
          {[105, 135, 165, 195, 225].map((x, i) => (
            <circle key={i} cx={x} cy="133" r="3" fill="white" opacity="0.9" />
          ))}
        </g>
      )}

      {/* ── Cut Cake – Three Separated Pieces ── */}
      {cut && (
        <g filter="url(#cakeShadow)">
          {/* Left piece */}
          <motion.g
            initial={{ x: 0 }}
            animate={{ x: pieces ? -30 : 0, rotate: pieces ? -7 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ originX: '0px', originY: '260px' }}
          >
            <rect x="52" y="220" width="68" height="52" rx="4" fill="url(#layer3grad)" />
            <rect x="52" y="220" width="68" height="8" rx="3" fill="#f5c8d8" />
            <rect x="68" y="162" width="56" height="60" rx="4" fill="url(#layer2grad)" />
            <rect x="68" y="162" width="56" height="8" rx="3" fill="#fdeef2" />
            <rect x="88" y="112" width="44" height="52" rx="4" fill="url(#layer1grad)" />
            <rect x="88" y="108" width="44" height="12" rx="5" fill="url(#frostingGrad)" />
            <rect x="120" y="112" width="3" height="160" fill="#fff5f7" opacity="0.95" />
            {[65, 88, 108].map((x, i) => (
              <ellipse key={i} cx={x} cy="222" rx="5" ry="7" fill="#fff5f7" opacity="0.9" />
            ))}
          </motion.g>

          {/* Center piece */}
          <motion.g
            initial={{ x: 0, y: 0 }}
            animate={{ x: 0, y: pieces ? -16 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <rect x="122" y="220" width="76" height="52" rx="4" fill="url(#layer3grad)" />
            <rect x="122" y="220" width="76" height="8" rx="3" fill="#f5c8d8" />
            <rect x="126" y="162" width="68" height="60" rx="4" fill="url(#layer2grad)" />
            <rect x="126" y="162" width="68" height="8" rx="3" fill="#fdeef2" />
            <rect x="134" y="112" width="52" height="52" rx="4" fill="url(#layer1grad)" />
            <rect x="134" y="108" width="52" height="12" rx="5" fill="url(#frostingGrad)" />
            <rect x="122" y="112" width="3" height="160" fill="#fff5f7" opacity="0.95" />
            <rect x="197" y="112" width="3" height="160" fill="#fff5f7" opacity="0.95" />
            {[130, 155, 180].map((x, i) => (
              <ellipse key={i} cx={x} cy="222" rx="5" ry="7" fill="#fff5f7" opacity="0.9" />
            ))}
            <circle cx="160" cy="118" r="8" fill="rgba(245,93,132,0.3)" />
            <circle cx="160" cy="118" r="4" fill="rgba(245,93,132,0.5)" />
            <circle cx="160" cy="118" r="2" fill="white" opacity="0.8" />
          </motion.g>

          {/* Right piece */}
          <motion.g
            initial={{ x: 0 }}
            animate={{ x: pieces ? 30 : 0, rotate: pieces ? 7 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ originX: '320px', originY: '260px' }}
          >
            <rect x="200" y="220" width="68" height="52" rx="4" fill="url(#layer3grad)" />
            <rect x="200" y="220" width="68" height="8" rx="3" fill="#f5c8d8" />
            <rect x="196" y="162" width="56" height="60" rx="4" fill="url(#layer2grad)" />
            <rect x="196" y="162" width="56" height="8" rx="3" fill="#fdeef2" />
            <rect x="188" y="112" width="44" height="52" rx="4" fill="url(#layer1grad)" />
            <rect x="188" y="108" width="44" height="12" rx="5" fill="url(#frostingGrad)" />
            <rect x="197" y="112" width="3" height="160" fill="#fff5f7" opacity="0.95" />
            {[212, 232, 258].map((x, i) => (
              <ellipse key={i} cx={x} cy="222" rx="5" ry="7" fill="#fff5f7" opacity="0.9" />
            ))}
          </motion.g>

          {/* Post-cut glow */}
          {pieces && (
            <motion.ellipse
              cx="160" cy="200"
              rx="110" ry="65"
              fill="url(#glowOrb)"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.7, 0.4], scale: [0.5, 1.25, 1] }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          )}
        </g>
      )}

      {/* ── Candles (3) ── */}
      <AnimatePresence>
        {!cut && (
          <motion.g exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {/* Candle 1 */}
            <rect x="118" y="90" width="9" height="22" rx="4" fill="#f8d7e3" />
            <rect x="118" y="90" width="9" height="6" rx="3" fill="#ffc5d8" />
            <line x1="122.5" y1="90" x2="122.5" y2="87" stroke="#8b6060" strokeWidth="1" />
            <motion.ellipse
              cx="122.5" cy="82" rx="5" ry="8"
              fill="url(#candleFlame1)"
              animate={{ scaleY: [1, 1.15, 0.9, 1.1, 1], scaleX: [1, 0.9, 1.1, 0.95, 1], opacity: [1, 0.85, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx="122.5" cy="83" rx="2.5" ry="4"
              fill="rgba(255,249,196,0.9)"
              animate={{ scaleY: [1, 1.2, 0.9], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Candle 2 */}
            <rect x="155" y="85" width="9" height="25" rx="4" fill="#fdeef2" />
            <rect x="155" y="85" width="9" height="6" rx="3" fill="#f8d7e3" />
            <line x1="159.5" y1="85" x2="159.5" y2="82" stroke="#8b6060" strokeWidth="1" />
            <motion.ellipse
              cx="159.5" cy="76" rx="5.5" ry="9"
              fill="url(#candleFlame2)"
              animate={{ scaleY: [1, 1.2, 0.88, 1.12, 1], scaleX: [1, 0.88, 1.12, 0.95, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            />
            <motion.ellipse
              cx="159.5" cy="77" rx="2.8" ry="4.5"
              fill="rgba(255,249,196,0.9)"
              animate={{ scaleY: [1, 1.2, 0.9] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Candle 3 */}
            <rect x="193" y="90" width="9" height="22" rx="4" fill="#f5c8d8" />
            <rect x="193" y="90" width="9" height="6" rx="3" fill="#ffc5d8" />
            <line x1="197.5" y1="90" x2="197.5" y2="87" stroke="#8b6060" strokeWidth="1" />
            <motion.ellipse
              cx="197.5" cy="82" rx="5" ry="8"
              fill="url(#candleFlame1)"
              animate={{ scaleY: [1, 1.1, 0.92, 1.08, 1], scaleX: [1, 0.92, 1.08, 0.97, 1] }}
              transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.ellipse
              cx="197.5" cy="83" rx="2.5" ry="4"
              fill="rgba(255,249,196,0.9)"
              animate={{ scaleY: [1, 1.15, 0.92] }}
              transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
            />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

// ─── Knife SVG ────────────────────────────────────────────────────────────────
function KnifeSVG() {
  return (
    <svg viewBox="0 0 60 160" className="w-8 h-28" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bladeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d4d4d8" />
          <stop offset="50%" stopColor="#f4f4f5" />
          <stop offset="100%" stopColor="#a1a1aa" />
        </linearGradient>
        <linearGradient id="handleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f8d7e3" />
          <stop offset="100%" stopColor="#e8b4c8" />
        </linearGradient>
      </defs>
      <rect x="18" y="0" width="24" height="55" rx="10" fill="url(#handleGrad)" />
      <rect x="22" y="5" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
      <rect x="22" y="10" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
      <rect x="12" y="52" width="36" height="8" rx="4" fill="#e8b4c8" />
      <path d="M20 60 L24 150 L36 150 L40 60 Z" fill="url(#bladeGrad)" />
      <path d="M30 60 L30 150" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <path d="M24 150 L30 158 L36 150" fill="#c4c4cc" />
    </svg>
  );
}

// ─── Main Cake Experience Component ──────────────────────────────────────────
export default function CakeExperience({ onCakeComplete }: CakeExperienceProps) {
  const [cutState, setCutState] = useState<'idle' | 'cutting' | 'celebrating' | 'done'>('idle');
  const [knifeY, setKnifeY] = useState(-80);
  const [showConfetti, setShowConfetti] = useState(false);
  const cakeRef = useRef<HTMLDivElement>(null);

  const handleCut = useCallback(() => {
    if (cutState !== 'idle') return;
    setCutState('cutting');

    // 1. Knife animation comes down (0 - 650ms)
    setTimeout(() => setKnifeY(120), 50);

    // 2. Cut occurs & cake splits into 3 pieces (700ms)
    setTimeout(() => {
      setCutState('celebrating');
    }, 700);

    // 3. Confetti burst wave 1 (900ms)
    setTimeout(() => {
      setShowConfetti(true);
    }, 900);

    // 4. Second confetti burst wave (2200ms)
    setTimeout(() => {
      setShowConfetti(false);
      setTimeout(() => setShowConfetti(true), 100);
    }, 2200);

    // 5. 3.5 - 4 seconds wait before proceeding to the message screen! (4200ms)
    setTimeout(() => {
      setCutState('done');
      onCakeComplete();
    }, 4200);
  }, [cutState, onCakeComplete]);

  return (
    <section
      id="cake-section"
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #fae2ed 0%, #f7bed4 45%, #f9cde0 100%)',
        minHeight: '100vh',
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 650,
          height: 650,
          background: 'radial-gradient(circle, rgba(245,93,132,0.07) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <ConfettiEffect trigger={showConfetti} />

      <div className="content-wrapper flex flex-col items-center text-center">
        {/* Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="font-body text-xs sm:text-sm tracking-widest uppercase font-medium mb-3" style={{ color: '#c9849a', letterSpacing: '0.18em' }}>
            ✦ &nbsp; a moment just for you &nbsp; ✦
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-3" style={{ color: '#a85f7a' }}>
            Every birthday needs a cake... 🎂
          </h2>
          <p className="font-body text-base sm:text-lg" style={{ color: '#c9849a' }}>
            And this one is waiting for you.
          </p>
        </motion.div>

        {/* Cake + Knife container */}
        <motion.div
          ref={cakeRef}
          className="relative my-4"
          style={{ width: 280, height: 320 }}
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        >
          {/* Plate glow */}
          <div
            className="absolute bottom-2 left-1/2 pointer-events-none"
            style={{
              transform: 'translateX(-50%)',
              width: 240,
              height: 40,
              background: 'radial-gradient(ellipse, rgba(245,93,132,0.18) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Animated Knife */}
          <AnimatePresence>
            {cutState === 'cutting' && (
              <motion.div
                className="absolute left-1/2 z-20 pointer-events-none"
                style={{ transform: 'translateX(-50%)', top: -40, zIndex: 20 }}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: knifeY, opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeInOut' }}
              >
                <KnifeSVG />
              </motion.div>
            )}
          </AnimatePresence>

          {/* SVG Cake with 3 Pieces */}
          <CakeSVG
            cut={cutState === 'celebrating' || cutState === 'done'}
            pieces={cutState === 'celebrating' || cutState === 'done'}
          />

          {/* Sparkle particles around cake after cut */}
          <AnimatePresence>
            {(cutState === 'celebrating' || cutState === 'done') && (
              <>
                {Array.from({ length: 14 }).map((_, i) => {
                  const angle = (i / 14) * Math.PI * 2;
                  const r = 110 + Math.random() * 45;
                  const tx = Math.cos(angle) * r;
                  const ty = Math.sin(angle) * r;
                  return (
                    <motion.div
                      key={i}
                      className="absolute text-sm pointer-events-none select-none"
                      style={{
                        left: '50%',
                        top: '55%',
                        transform: 'translate(-50%,-50%)',
                        color: i % 2 === 0 ? '#f55d84' : '#e8c07a',
                      }}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.2, 1, 0],
                        x: tx,
                        y: ty,
                      }}
                      transition={{ duration: 1.6, ease: 'easeOut', delay: i * 0.05 }}
                    >
                      {i % 3 === 0 ? '✦' : i % 3 === 1 ? '·' : '♡'}
                    </motion.div>
                  );
                })}
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Cut Button */}
        <AnimatePresence>
          {cutState === 'idle' && (
            <motion.div
              className="mt-6 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="font-body text-xs sm:text-sm mb-3" style={{ color: '#c9849a' }}>
                Tap the button to cut the cake 🎂
              </p>
              <button
                id="cut-cake-btn"
                onClick={handleCut}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #f55d84 0%, #e8809a 50%, #c9849a 100%)',
                  padding: '1.1rem 2.75rem',
                  borderRadius: '9999px',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 6px 28px rgba(245, 93, 132, 0.42)',
                  whiteSpace: 'nowrap',
                }}
              >
                Cut the Cake 🎂
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebrating Badge during 4 seconds */}
        <AnimatePresence>
          {cutState === 'celebrating' && (
            <motion.div
              className="mt-6 px-6 py-3 rounded-full"
              style={{
                background: 'rgba(255, 240, 245, 0.85)',
                border: '1px solid rgba(245, 93, 132, 0.35)',
                boxShadow: '0 8px 24px rgba(245,93,132,0.15)',
              }}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display text-lg sm:text-xl font-medium" style={{ color: '#a85f7a' }}>
                🎉 Happy Birthday Nazish! Celebrating you... ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Done State */}
        <AnimatePresence>
          {cutState === 'done' && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-body text-base" style={{ color: '#c9849a' }}>
                A birthday message is unfolding below... 💗 ↓
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
