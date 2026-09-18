import { useMemo } from 'react';
import { motion } from 'framer-motion';
import './AmbientBackground.css';

const BEANS = ['☕', '🫘', '✦'];

function seededParticles(count: number) {
  return Array.from({ length: count }).map((_, i) => {
    const seed = i * 137.5;
    return {
      id: i,
      left: (seed * 1.618) % 100,
      size: 14 + ((seed * 3.7) % 20),
      duration: 18 + ((seed * 2.3) % 16),
      delay: (seed % 10) * -1,
      icon: BEANS[i % BEANS.length],
      drift: ((seed % 7) - 3) * 12,
    };
  });
}

export function AmbientBackground() {
  const particles = useMemo(() => seededParticles(9), []);

  return (
    <div className="ambient" aria-hidden="true">
      <motion.span
        className="ambient__orb ambient__orb--one"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="ambient__orb ambient__orb--two"
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="ambient__orb ambient__orb--three"
        animate={{ x: [0, 30, -40, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="ambient__bean"
          style={{ left: `${p.left}%`, fontSize: p.size }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.5, 0.5, 0], x: [0, p.drift, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
        >
          {p.icon}
        </motion.span>
      ))}
    </div>
  );
}
