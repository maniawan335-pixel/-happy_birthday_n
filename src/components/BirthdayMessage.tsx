import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BirthdayMessageProps {
  visible?: boolean;
}

const MESSAGE_LINES = [
  "Some people make ordinary days a little better just by being around.",
  "",
  "I'm genuinely grateful that our paths crossed, and I'm lucky to call you a friend.",
  "",
  "On your birthday, I just hope this new year of your life brings you lots of happiness, success, peace, and countless reasons to smile.",
  "",
  "Keep being the wonderful person you are.",
  "",
  "Happy Birthday once again, Nazish! 🎂💗",
];

function TypewriterLine({
  text,
  startTyping,
  delay = 0,
  onFinished,
}: {
  text: string;
  startTyping: boolean;
  delay?: number;
  onFinished?: () => void;
}) {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!startTyping) {
      setDisplayed('');
      return;
    }

    if (text === '') {
      const emptyTimer = setTimeout(() => {
        onFinished?.();
      }, delay + 150);
      return () => clearTimeout(emptyTimer);
    }

    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      // Gentle, readable typing speed (~40ms per char)
      const speed = text.length > 60 ? 36 : 42;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          onFinished?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [startTyping, text, delay, onFinished]);

  if (text === '') return <div className="h-4" />;

  return (
    <p className="min-h-[1.75rem] my-1 text-base sm:text-lg leading-relaxed">
      <span>{displayed}</span>
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.45, repeat: Infinity }}
          className="inline-block w-0.5 h-4 ml-1 align-middle rounded"
          style={{ background: '#f55d84' }}
        />
      )}
    </p>
  );
}

export default function BirthdayMessage({ visible: _visible }: BirthdayMessageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  // Calculate cumulative delays for each line matching the slowed speed
  const delays: number[] = [];
  let cumulative = 0;
  MESSAGE_LINES.forEach((line) => {
    delays.push(cumulative);
    if (line === '') {
      cumulative += 400;
    } else {
      cumulative += line.length * 40 + 600;
    }
  });

  return (
    <section
      id="birthday-message"
      ref={sectionRef}
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #fae2ed 0%, #f7c5d7 50%, #fae2ed 100%)',
        minHeight: '100vh',
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >
      {/* Background soft glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 650,
          height: 650,
          background: 'radial-gradient(circle, rgba(200,150,220,0.07) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating gentle hearts */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-base select-none"
          style={{
            left: `${12 + i * 15}%`,
            top: `${15 + (i % 3) * 28}%`,
            color: 'rgba(245,93,132,0.22)',
          }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          ♡
        </motion.div>
      ))}

      <motion.div
        className="content-wrapper"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {/* Message Glass Card */}
        <div
          className="glass-card mx-auto max-w-2xl"
          style={{
            padding: '3rem 2.25rem',
            margin: '0 auto',
          }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="text-4xl mb-3">💗</div>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: '#a85f7a' }}
            >
              A little birthday message
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #c9849a, #f55d84)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                for you
              </span>
            </h2>
          </motion.div>

          {/* Delicate Divider */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,180,200,0.6))' }} />
            <span className="text-sm" style={{ color: '#e8b4c8' }}>✦</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(232,180,200,0.6), transparent)' }} />
          </motion.div>

          {/* Message Text – Typed with 750ms start delay and gentle smooth speed */}
          <div
            className="font-body text-base sm:text-lg leading-relaxed text-center sm:text-left"
            style={{ color: '#6d4554', lineHeight: '2' }}
          >
            {MESSAGE_LINES.map((line, i) => (
              <TypewriterLine
                key={i}
                text={line}
                startTyping={isInView}
                delay={delays[i] + 750}
              />
            ))}
          </div>

          {/* Footer Stars */}
          <motion.div
            className="mt-8 pt-6 flex justify-center"
            style={{ borderTop: '1px solid rgba(232,180,200,0.35)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: cumulative / 1000 + 1.2, duration: 0.8 }}
          >
            {['✦', '♡', '✦', '♡', '✦'].map((s, i) => (
              <motion.span
                key={i}
                className="mx-2 text-sm"
                style={{ color: 'rgba(201,132,154,0.55)' }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
