import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Magical Candle SVG Component ─────────────────────────────────────────────
function MagicalCandle({
  blown,
  isCounting,
  onClick,
}: {
  blown: boolean;
  isCounting: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none"
      onClick={onClick}
    >
      {/* Outer glow rings when active */}
      {!blown && (
        <>
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 90 + ring * 45,
                height: 90 + ring * 45,
                border: '1.5px solid rgba(245,93,132,0.18)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.15, 0.45] }}
              transition={{ duration: 2 + ring * 0.5, repeat: Infinity, ease: 'easeInOut', delay: ring * 0.3 }}
            />
          ))}
        </>
      )}

      {/* Orbiting particles during 7s countdown */}
      {isCounting && (
        <>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute text-sm pointer-events-none"
              style={{
                top: '40%',
                left: '50%',
                color: i % 2 === 0 ? '#f55d84' : '#e8c07a',
              }}
              animate={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * 75,
                  Math.cos(((angle + 360) * Math.PI) / 180) * 75,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 75,
                  Math.sin(((angle + 360) * Math.PI) / 180) * 75,
                ],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2,
              }}
            >
              ✦
            </motion.div>
          ))}
        </>
      )}

      <svg viewBox="0 0 100 180" className="w-24 h-44" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="wishCandleBody" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fdeef2" />
            <stop offset="100%" stopColor="#f5c8d8" />
          </radialGradient>
          <radialGradient id="wishFlameGrad" cx="50%" cy="70%" r="70%">
            <stop offset="0%" stopColor="#fff9c4" />
            <stop offset="40%" stopColor="#ffcc02" />
            <stop offset="70%" stopColor="#ff6b9d" />
            <stop offset="100%" stopColor="#f55d84" />
          </radialGradient>
          <radialGradient id="wishGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,200,100,0.65)" />
            <stop offset="100%" stopColor="rgba(255,200,100,0)" />
          </radialGradient>
        </defs>

        {/* Candle body */}
        <rect x="37" y="80" width="26" height="80" rx="8" fill="url(#wishCandleBody)" />
        <rect x="37" y="92" width="26" height="4" rx="2" fill="rgba(245,93,132,0.25)" />
        <rect x="37" y="104" width="26" height="4" rx="2" fill="rgba(245,93,132,0.25)" />
        <rect x="37" y="116" width="26" height="4" rx="2" fill="rgba(245,93,132,0.25)" />
        <ellipse cx="50" cy="80" rx="13" ry="5" fill="#f8d7e3" />

        {/* Wick */}
        <line x1="50" y1="80" x2="50" y2="73" stroke="#8b6060" strokeWidth="1.5" strokeLinecap="round" />

        {/* Flame (active when not blown) */}
        {!blown && (
          <>
            <motion.ellipse
              cx="50" cy="50" rx="30" ry="35"
              fill="url(#wishGlow)"
              animate={{
                scaleY: [1, 1.2, 1],
                scaleX: [1, 1.15, 1],
                opacity: [0.55, 0.85, 0.55],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '50px 50px' }}
            />
            <motion.ellipse
              cx="50" cy="42" rx="12" ry="30"
              fill="url(#wishFlameGrad)"
              animate={{
                scaleY: [1, 1.12, 0.9, 1.08, 1],
                scaleX: [1, 0.9, 1.08, 0.92, 1],
                opacity: [1, 0.9, 1],
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '50px 72px' }}
            />
            <motion.ellipse
              cx="50" cy="48" rx="7" ry="20"
              fill="#fff9c4"
              animate={{ scaleY: [1, 1.15, 0.88], scaleX: [1, 0.9, 1.1] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '50px 68px' }}
            />
          </>
        )}

        {/* Blown out smoke */}
        {blown && (
          <>
            <motion.path
              d="M50 73 Q44 60 50 48 Q56 36 50 24"
              stroke="rgba(200,160,180,0.55)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
            <motion.path
              d="M50 73 Q55 62 47 50 Q43 38 50 28"
              stroke="rgba(200,160,180,0.35)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              transition={{ duration: 2.2, ease: 'easeOut', delay: 0.2 }}
            />
          </>
        )}
      </svg>

      {!blown && (
        <motion.p
          className="font-body text-xs mt-2 tracking-wide font-medium"
          style={{ color: '#c9849a' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          tap to make a wish ✨
        </motion.p>
      )}
    </div>
  );
}

// ─── MakeAWish Component with 7-Second Timer ──────────────────────────────────
export default function MakeAWish() {
  const [wishStage, setWishStage] = useState<'idle' | 'counting' | 'completed'>('idle');
  const [countdown, setCountdown] = useState(7);
  const [particles, setParticles] = useState<Array<{ id: number; tx: number; ty: number; char: string }>>([]);

  const handleStartWish = useCallback(() => {
    if (wishStage !== 'idle') return;
    setWishStage('counting');
    setCountdown(7);
  }, [wishStage]);

  // 7-second countdown logic
  useEffect(() => {
    if (wishStage !== 'counting') return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown finished (0 reached) -> complete wish!
      setWishStage('completed');

      // Burst celebratory star particles
      const newParticles = Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const r = 90 + Math.random() * 70;
        return {
          id: i,
          tx: Math.cos(angle) * r,
          ty: Math.sin(angle) * r - 25,
          char: ['✦', '·', '✶', '♡', '🌸'][i % 5],
        };
      });
      setParticles(newParticles);
    }
  }, [wishStage, countdown]);

  return (
    <section
      id="make-a-wish"
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #fae2ed 0%, #f7c5d7 50%, #fae2ed 100%)',
        minHeight: '100vh',
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >
      {/* Ambient Radial Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={wishStage === 'completed' ? { opacity: 0.18 } : { opacity: 0.06 }}
        transition={{ duration: 1.5 }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(245,93,132,1) 0%, transparent 60%)',
        }}
      />

      <div className="content-wrapper flex flex-col items-center text-center">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2
            className="font-display text-4xl sm:text-5xl font-semibold mb-3"
            style={{ color: '#a85f7a' }}
          >
            Make a Wish ✨
          </h2>
          <p
            className="font-body text-base sm:text-lg max-w-md mx-auto"
            style={{ color: '#c9849a', lineHeight: '1.7' }}
          >
            Close your eyes, make a little wish...
            <br />
            and let the magic begin.
          </p>
        </motion.div>

        {/* Candle Box */}
        <motion.div
          className="relative my-4"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <MagicalCandle
            blown={wishStage !== 'idle'}
            isCounting={wishStage === 'counting'}
            onClick={handleStartWish}
          />

          {/* Particle burst on completion */}
          <AnimatePresence>
            {wishStage === 'completed' &&
              particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute text-sm pointer-events-none select-none"
                  style={{
                    left: '50%',
                    top: '40%',
                    transform: 'translate(-50%, -50%)',
                    color: '#f55d84',
                  }}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.3, 1, 0],
                    x: p.tx,
                    y: p.ty,
                  }}
                  transition={{ duration: 1.8, ease: 'easeOut', delay: 0.1 }}
                >
                  {p.char}
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* Action Button (Idle State) */}
        <AnimatePresence>
          {wishStage === 'idle' && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                id="make-wish-btn"
                onClick={handleStartWish}
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
                Make My Wish ✨
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7-Second Countdown Display (Counting State) */}
        <AnimatePresence>
          {wishStage === 'counting' && (
            <motion.div
              className="mt-6 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <p
                className="font-body text-base sm:text-lg mb-3 font-medium"
                style={{ color: '#a85f7a' }}
              >
                ✨ Close your eyes, Nazish... making your wish 💭
              </p>

              {/* Glowing Countdown Number */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 240, 245, 0.9)',
                  border: '2px solid rgba(245, 93, 132, 0.5)',
                  boxShadow: '0 0 25px rgba(245, 93, 132, 0.35)',
                }}
              >
                <motion.span
                  key={countdown}
                  className="font-display text-3xl font-bold"
                  style={{ color: '#f55d84' }}
                  initial={{ scale: 1.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {countdown}s
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completed Message after 7 seconds */}
        <AnimatePresence>
          {wishStage === 'completed' && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            >
              <motion.h3
                className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #c9849a, #f55d84, #a85f7a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 14px rgba(245,93,132,0.2))',
                }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                May all your wishes come true, Nazish! ✨🌸
              </motion.h3>

              <p
                className="font-body text-base sm:text-lg mb-4"
                style={{ color: '#c9849a' }}
              >
                May your wish find its way to you in this beautiful new year of your life.
              </p>

              {/* Decorative Stars */}
              <motion.div
                className="flex gap-3 justify-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {['✦', '♡', '🌸', '♡', '✦'].map((s, i) => (
                  <motion.span
                    key={i}
                    className="text-base"
                    style={{ color: 'rgba(201,132,154,0.6)' }}
                    animate={{ y: [0, -5, 0], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
