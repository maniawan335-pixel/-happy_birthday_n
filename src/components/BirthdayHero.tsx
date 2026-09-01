import { motion, type Variants } from 'framer-motion';

interface BirthdayHeroProps {
  visible: boolean;
}

export default function BirthdayHero({ visible }: BirthdayHeroProps) {
  if (!visible) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatingStars = [
    { x: 12, y: 18, delay: 0, size: 16, char: '✦' },
    { x: 88, y: 15, delay: 0.4, size: 14, char: '✶' },
    { x: 8, y: 70, delay: 0.8, size: 18, char: '♡' },
    { x: 92, y: 65, delay: 1.2, size: 16, char: '✦' },
    { x: 20, y: 85, delay: 0.6, size: 12, char: '·' },
    { x: 80, y: 88, delay: 1.4, size: 14, char: '♡' },
  ];

  return (
    <section
      id="birthday-hero"
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #fcdde8 0%, #f7c5d7 60%, #fae2ed 100%)',
        minHeight: '100vh',
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >
      {/* Soft radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 550,
          height: 550,
          background: 'radial-gradient(circle, rgba(245,93,132,0.08) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating decorative stars */}
      {floatingStars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            fontSize: star.size,
            color: 'rgba(201,132,154,0.45)',
          }}
          animate={{ y: [0, -12, 0], opacity: [0.25, 0.75, 0.25] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: star.delay }}
        >
          {star.char}
        </motion.div>
      ))}

      <motion.div
        className="content-wrapper flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Ribbon bow */}
        <motion.div
          variants={itemVariants}
          className="text-5xl sm:text-6xl mb-6"
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          🎀
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6"
          style={{
            background: 'linear-gradient(135deg, #c9849a 0%, #f55d84 45%, #a85f7a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 18px rgba(245,93,132,0.22))',
          }}
        >
          Happy Birthday,
          <br />
          Nazish!
        </motion.h1>

        {/* Sub-tagline */}
        <motion.p
          variants={itemVariants}
          className="font-body text-xl sm:text-2xl font-light mb-10 max-w-md mx-auto"
          style={{ color: '#c9849a', lineHeight: '1.6' }}
        >
          Today is all about celebrating you. 🌸
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,180,200,0.6))' }} />
          {['✦', '♡', '✦', '♡', '✦'].map((s, i) => (
            <motion.span
              key={i}
              className="text-sm sm:text-base"
              style={{ color: 'rgba(201,132,154,0.6)' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            >
              {s}
            </motion.span>
          ))}
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(232,180,200,0.6), transparent)' }} />
        </motion.div>

        {/* Arrow cue to cake */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 cursor-pointer select-none"
          onClick={() => {
            document.getElementById('cake-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="font-body text-xs sm:text-sm tracking-widest uppercase font-medium" style={{ color: '#c9849a', letterSpacing: '0.18em' }}>
            Your cake is waiting
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-2xl"
            style={{ color: '#f55d84' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
