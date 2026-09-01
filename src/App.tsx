import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundEffects from './components/BackgroundEffects';
import IntroScreen from './components/IntroScreen';
import BirthdayHero from './components/BirthdayHero';
import CakeExperience from './components/CakeExperience';
import BirthdayMessage from './components/BirthdayMessage';
import WishCards from './components/WishCards';
import MakeAWish from './components/MakeAWish';
import FriendshipMoment from './components/FriendshipMoment';
import FinalClosing from './components/FinalClosing';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [cakeDone, setCakeDone] = useState(false);

  const handleEnter = () => {
    setShowIntro(false);
  };

  const handleCakeComplete = () => {
    setCakeDone(true);
    // Smooth scroll to message section after a brief pause
    setTimeout(() => {
      const el = document.getElementById('birthday-message');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Persistent background canvas (only when main experience is showing) */}
      {!showIntro && <BackgroundEffects intensity="low" celebratory={cakeDone} />}

      {/* Intro overlay */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroScreen key="intro" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* Main experience – revealed after intro */}
      <AnimatePresence>
        {!showIntro && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* 1. Birthday Hero */}
            <BirthdayHero visible={true} />

            {/* 2. Cake */}
            <CakeExperience onCakeComplete={handleCakeComplete} />

            {/* 3. Birthday Message – always rendered but only animated in after cake */}
            <BirthdayMessage visible={true} />

            {/* 4. Wish Cards */}
            <WishCards />

            {/* 5. Make a Wish */}
            <MakeAWish />

            {/* 6. Friendship Moment */}
            <FriendshipMoment />

            {/* 7. Final Closing */}
            <FinalClosing />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
