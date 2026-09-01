import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

export default function ConfettiEffect({ trigger, onComplete }: ConfettiEffectProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!trigger || firedRef.current) return;
    firedRef.current = true;

    const colors = ['#f55d84', '#e8a0b4', '#c9849a', '#f5d4a0', '#fdeef2', '#d4a0c8'];

    // Burst from center
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.5, y: 0.6 },
      colors,
      startVelocity: 35,
      gravity: 0.8,
      scalar: 0.9,
      ticks: 200,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 55,
        origin: { x: 0.3, y: 0.65 },
        colors,
        startVelocity: 30,
        gravity: 0.9,
        scalar: 0.8,
        ticks: 180,
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 55,
        origin: { x: 0.7, y: 0.65 },
        colors,
        startVelocity: 30,
        gravity: 0.9,
        scalar: 0.8,
        ticks: 180,
      });
    }, 400);

    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { x: 0.5, y: 0.55 },
        colors,
        startVelocity: 20,
        gravity: 1.1,
        scalar: 0.7,
        ticks: 150,
        shapes: ['circle'],
      });
      onComplete?.();
    }, 700);
  }, [trigger, onComplete]);

  return null;
}
