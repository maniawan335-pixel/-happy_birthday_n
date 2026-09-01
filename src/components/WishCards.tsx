import { motion } from 'framer-motion';

const WISHES = [
  {
    icon: '🌸',
    title: 'Happiness',
    text: 'May you always have reasons to smile.',
    color: '#f55d84',
    bg: 'linear-gradient(135deg, rgba(255,240,245,0.85) 0%, rgba(253,238,242,0.65) 100%)',
    borderColor: 'rgba(245,93,132,0.3)',
  },
  {
    icon: '✨',
    title: 'Success',
    text: 'May all your hard work take you where you want to go.',
    color: '#a85f7a',
    bg: 'linear-gradient(135deg, rgba(255,248,238,0.85) 0%, rgba(253,238,242,0.65) 100%)',
    borderColor: 'rgba(232,192,122,0.35)',
  },
  {
    icon: '🌙',
    title: 'Peace',
    text: 'May life give you peaceful moments between all the chaos.',
    color: '#7a5a8a',
    bg: 'linear-gradient(135deg, rgba(246,240,255,0.85) 0%, rgba(253,238,242,0.65) 100%)',
    borderColor: 'rgba(200,170,220,0.35)',
  },
  {
    icon: '💗',
    title: 'Memories',
    text: 'May this year give you memories worth keeping.',
    color: '#c9849a',
    bg: 'linear-gradient(135deg, rgba(255,242,246,0.85) 0%, rgba(250,225,235,0.65) 100%)',
    borderColor: 'rgba(201,132,154,0.35)',
  },
];

function WishCard({
  icon,
  title,
  text,
  color,
  bg,
  borderColor,
  index,
}: typeof WISHES[0] & { index: number }) {
  return (
    <motion.div
      className="wish-card-box cursor-default group"
      style={{
        background: bg,
        borderColor: borderColor,
        padding: '2.5rem 2.25rem',
        borderRadius: '1.75rem',
      }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 40px rgba(201,132,154,0.18), 0 0 25px rgba(245,93,132,0.08)',
      }}
    >
      {/* Icon & Corner Sparkle */}
      <div className="flex items-center justify-between mb-4">
        <motion.div
          className="text-4xl"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
        >
          {icon}
        </motion.div>
        <span className="text-xs opacity-50" style={{ color }}>✦</span>
      </div>

      {/* Title */}
      <h3
        className="font-display text-2xl sm:text-3xl font-semibold mb-2"
        style={{ color }}
      >
        {title}
      </h3>

      {/* Divider */}
      <div
        className="mb-4 h-0.5 w-10 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}80, transparent)` }}
      />

      {/* Text */}
      <p
        className="font-body text-base leading-relaxed"
        style={{ color: '#6d4554', lineHeight: '1.7' }}
      >
        {text}
      </p>
    </motion.div>
  );
}

export default function WishCards() {
  return (
    <section
      id="wish-cards"
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #fae2ed 0%, #f7c5d7 50%, #fae2ed 100%)',
        minHeight: '100vh',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Ambient background particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-lg opacity-25"
          style={{
            left: `${8 + i * 16}%`,
            top: `${12 + (i % 2) * 65}%`,
            color: '#e8b4c8',
          }}
          animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 4.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          {i % 2 === 0 ? '✦' : '♡'}
        </motion.div>
      ))}

      <div className="content-wrapper">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p
            className="font-body text-xs sm:text-sm tracking-widest uppercase font-medium mb-3"
            style={{ color: '#c9849a', letterSpacing: '0.18em' }}
          >
            ✦ &nbsp; from the heart &nbsp; ✦
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl font-semibold"
            style={{ color: '#a85f7a' }}
          >
            A few wishes for you ✨
          </h2>
        </motion.div>

        {/* 2x2 Grid of Beautiful Wish Cards - Moved Down (margin-top: 4.5rem) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{
            marginTop: '4.5rem',
            gap: '2rem',
            width: '100%',
          }}
        >
          {WISHES.map((wish, index) => (
            <WishCard key={wish.title} {...wish} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
