import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FriendshipMoment() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="friendship-moment"
      ref={ref}
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #fae2ed 0%, #f7c5d7 50%, #fae2ed 100%)',
        minHeight: '100vh',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Ambient background particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${8 + i * 9}%`,
            top: `${18 + (i % 4) * 20}%`,
            fontSize: 12 + (i % 3) * 4,
            color: 'rgba(201,132,154,0.25)',
          }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          {i % 3 === 0 ? '✦' : i % 3 === 1 ? '♡' : '·'}
        </motion.div>
      ))}

      <div className="content-wrapper flex flex-col items-center text-center">
        {/* First line */}
        <motion.p
          className="font-display text-2xl sm:text-3xl text-center italic mb-10"
          style={{ color: '#c9849a' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          One thing I'm truly thankful for...
        </motion.p>

        {/* Divider with heart */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        >
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,180,200,0.6))' }} />
          <motion.span
            className="text-2xl"
            style={{ color: '#f55d84' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ♡
          </motion.span>
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, rgba(232,180,200,0.6), transparent)' }} />
        </motion.div>

        {/* Second line – The Emotional Statement */}
        <motion.h2
          className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight max-w-xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, #c9849a 0%, #f55d84 50%, #a85f7a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 14px rgba(245,93,132,0.22))',
          }}
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 1.2, ease: 'easeOut' }}
        >
          Having you as a friend.
        </motion.h2>

        {/* Floating hearts below */}
        <motion.div
          className="flex gap-4 justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 1 }}
        >
          {['♡', '✦', '♡', '✦', '♡'].map((s, i) => (
            <motion.span
              key={i}
              className="text-base"
              style={{ color: 'rgba(201,132,154,0.45)' }}
              animate={{ y: [0, -6, 0], opacity: [0.25, 0.65, 0.25] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
