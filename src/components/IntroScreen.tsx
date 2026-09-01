import { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundEffects from './BackgroundEffects';

interface IntroScreenProps {
  onEnter: () => void;
}

const FloatingElement = ({
  delay,
  x,
  y,
  size,
  type,
}: {
  delay: number;
  x: number;
  y: number;
  size: number;
  type: 'star' | 'heart' | 'dot';
}) => {
  const emojis = { star: '✦', heart: '♡', dot: '·' };
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: size,
        color: 'rgba(215,130,160,0.65)',
      }}
      animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {emojis[type]}
    </motion.div>
  );
};

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [hovered, setHovered] = useState(false);

  const floaters = [
    { delay: 0, x: 8, y: 15, size: 20, type: 'star' as const },
    { delay: 1, x: 92, y: 20, size: 16, type: 'heart' as const },
    { delay: 0.5, x: 15, y: 75, size: 24, type: 'star' as const },
    { delay: 1.5, x: 88, y: 70, size: 18, type: 'heart' as const },
    { delay: 0.8, x: 50, y: 8, size: 14, type: 'star' as const },
    { delay: 2, x: 5, y: 50, size: 12, type: 'dot' as const },
    { delay: 1.2, x: 95, y: 45, size: 12, type: 'dot' as const },
    { delay: 0.3, x: 30, y: 90, size: 16, type: 'heart' as const },
    { delay: 1.8, x: 70, y: 88, size: 14, type: 'star' as const },
    { delay: 0.6, x: 75, y: 12, size: 18, type: 'heart' as const },
  ];

  const handleClick = () => {
    setTimeout(onEnter, 800);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fcdde8 0%, #f7c5d7 35%, #fbe0ec 65%, #f5b7ce 100%)',
        zIndex: 50,
        padding: '2rem 1.5rem',
      }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <BackgroundEffects intensity="medium" />

      {/* Decorative ambient orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          left: '-10%',
          top: '-10%',
          background: 'radial-gradient(circle, rgba(245,93,132,0.12) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          right: '-8%',
          bottom: '-8%',
          background: 'radial-gradient(circle, rgba(200,120,180,0.1) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Floating decorative elements */}
      {floaters.map((f, i) => (
        <FloatingElement key={i} {...f} />
      ))}

      {/* Center content */}
      <div
        className="relative z-10 flex flex-col items-center text-center mx-auto"
        style={{ maxWidth: '36rem', padding: '0 1rem' }}
      >
        {/* Glow behind content */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 420,
            height: 420,
            background: 'radial-gradient(circle, rgba(245,93,132,0.14) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <motion.p
          className="font-display text-2xl sm:text-3xl italic"
          style={{ color: '#b05877', marginBottom: '1rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          A little surprise for you...
        </motion.p>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
          style={{
            background: 'linear-gradient(135deg, #a84e6f 0%, #eb4f79 50%, #8c3856 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '2.5rem',
            lineHeight: 1.25,
            filter: 'drop-shadow(0 2px 14px rgba(235,79,121,0.2))',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        >
          Made especially
          <br />
          for Nazish. 🌸
        </motion.h1>

        {/* Shimmering Button with Generous Guaranteed Padding */}
        <motion.button
          id="open-surprise-btn"
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative overflow-hidden cursor-pointer select-none"
          style={{
            background: 'linear-gradient(135deg, #f55d84 0%, #e06886 50%, #b85072 100%)',
            padding: '1.2rem 3rem',
            borderRadius: '9999px',
            border: 'none',
            color: '#ffffff',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '1.15rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            boxShadow: hovered
              ? '0 10px 42px rgba(220,60,105,0.65), 0 0 60px rgba(245,93,132,0.3)'
              : '0 6px 28px rgba(220,60,105,0.45)',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <span className="relative z-10">Open Your Birthday Surprise ✨</span>
        </motion.button>

        {/* Tiny floating stars below button */}
        <motion.div
          className="flex gap-4"
          style={{ marginTop: '2.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {['✦', '♡', '✦', '♡', '✦'].map((s, i) => (
            <motion.span
              key={i}
              className="text-sm"
              style={{ color: 'rgba(180,85,115,0.55)' }}
              animate={{ y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
