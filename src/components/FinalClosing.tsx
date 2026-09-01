import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FinalClosing() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const lines = [
    {
      text: "That's all for today, birthday girl. 🎀",
      delay: 0.2,
      size: 'text-xl sm:text-2xl',
      italic: true,
      color: '#c9849a',
      isMain: false,
    },
    {
      text: "I hope this little surprise made you smile.",
      delay: 0.6,
      size: 'text-base sm:text-lg',
      italic: false,
      color: '#c9849a',
      isMain: false,
    },
    {
      text: "Happy Birthday,\nNazish Fatima 💗",
      delay: 1.1,
      size: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
      italic: false,
      color: 'gradient',
      isMain: true,
    },
    {
      text: "From someone who genuinely wishes the best for you.",
      delay: 1.8,
      size: 'text-base sm:text-lg',
      italic: true,
      color: '#c9849a',
      isMain: false,
    },
  ];

  return (
    <section
      id="final-closing"
      ref={ref}
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #fae2ed 0%, #f7c5d7 50%, #fae2ed 100%)',
        minHeight: '100vh',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(245,93,132,0.09) 0%, transparent 60%)',
        }}
      />

      {/* Floating stars */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            fontSize: 10 + (i % 3) * 4,
            color: 'rgba(201,132,154,0.35)',
          }}
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
        >
          {i % 3 === 0 ? '✦' : i % 3 === 1 ? '♡' : '✶'}
        </motion.div>
      ))}

      <div className="content-wrapper flex flex-col items-center text-center">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="my-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: line.delay, ease: 'easeOut' }}
          >
            {line.isMain ? (
              <h1
                className={`font-display font-semibold ${line.size} leading-tight my-4`}
                style={{
                  background: 'linear-gradient(135deg, #c9849a 0%, #f55d84 45%, #a85f7a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 20px rgba(245,93,132,0.25))',
                  whiteSpace: 'pre-line',
                }}
              >
                {line.text}
              </h1>
            ) : (
              <p
                className={`font-${line.italic ? 'display' : 'body'} ${line.size} ${line.italic ? 'italic' : ''}`}
                style={{ color: line.color, lineHeight: '1.6' }}
              >
                {line.text}
              </p>
            )}
          </motion.div>
        ))}

        {/* Final icon row */}
        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.4, duration: 1 }}
        >
          {['✦', '♡', '🌸', '♡', '✦'].map((s, i) => (
            <motion.span
              key={i}
              className="text-lg sm:text-2xl"
              style={{ color: 'rgba(201,132,154,0.6)' }}
              animate={{ y: [0, -8, 0], opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
