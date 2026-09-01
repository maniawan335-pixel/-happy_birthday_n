import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  type: 'dot' | 'star' | 'heart';
  pulseOffset: number;
}

interface BackgroundEffectsProps {
  intensity?: 'low' | 'medium' | 'high';
  celebratory?: boolean;
}

export default function BackgroundEffects({ intensity = 'medium', celebratory = false }: BackgroundEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLORS = [
      'rgba(245, 93, 132, alpha)',
      'rgba(230, 110, 150, alpha)',
      'rgba(205, 90, 130, alpha)',
      'rgba(248, 175, 205, alpha)',
      'rgba(245, 200, 145, alpha)',
      'rgba(200, 140, 210, alpha)',
    ];

    const count = intensity === 'low' ? 30 : intensity === 'high' ? 70 : 48;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const makeParticle = (): Particle => {
      const typeRoll = Math.random();
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.15,
        size: Math.random() * 3.5 + 1.2,
        alpha: Math.random() * 0.55 + 0.15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type: typeRoll < 0.6 ? 'dot' : typeRoll < 0.85 ? 'star' : 'heart',
        pulseOffset: Math.random() * Math.PI * 2,
      };
    };

    particlesRef.current = Array.from({ length: count }, makeParticle);

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const spikes = 4;
      const outerRadius = size;
      const innerRadius = size * 0.4;
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        if (i === 0) ctx.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
        else ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
      }
      ctx.closePath();
      ctx.fill();
    };

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const s = size * 0.85;
      ctx.beginPath();
      ctx.moveTo(x, y + s * 0.5);
      ctx.bezierCurveTo(x, y, x - s, y, x - s, y - s * 0.5);
      ctx.bezierCurveTo(x - s, y - s * 1.2, x, y - s * 1.2, x, y - s * 0.5);
      ctx.bezierCurveTo(x, y - s * 1.2, x + s, y - s * 1.2, x + s, y - s * 0.5);
      ctx.bezierCurveTo(x + s, y, x, y, x, y + s * 0.5);
      ctx.closePath();
      ctx.fill();
    };

    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;

      // Soft background glowing orbs with richer pink tones
      const orbColors = [
        'rgba(245, 93, 132, 0.09)',
        'rgba(235, 135, 175, 0.08)',
        'rgba(200, 130, 200, 0.06)',
      ];
      orbColors.forEach((color, i) => {
        const ox = canvas.width * (0.3 + i * 0.2) + Math.sin(t * 0.5 + i) * 60;
        const oy = canvas.height * (0.3 + i * 0.15) + Math.cos(t * 0.4 + i) * 40;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, 220 + i * 50);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      particlesRef.current.forEach((p, i) => {
        const pulse = Math.sin(t * 1.5 + p.pulseOffset) * 0.3 + 0.7;
        const alpha = p.alpha * pulse;
        const colorStr = p.color.replace('alpha', alpha.toFixed(2));

        ctx.fillStyle = colorStr;

        if (p.type === 'star') {
          drawStar(ctx, p.x, p.y, p.size);
        } else if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size * 0.75);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        p.x += p.vx + Math.sin(t * 0.8 + i * 0.5) * 0.25;
        p.y += p.vy;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
      });

      if (celebratory) {
        for (let i = 0; i < 4; i++) {
          const sx = Math.random() * canvas.width;
          const sy = Math.random() * canvas.height;
          const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 10);
          sg.addColorStop(0, 'rgba(245, 200, 140, 0.85)');
          sg.addColorStop(1, 'transparent');
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.arc(sx, sy, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [intensity, celebratory]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
