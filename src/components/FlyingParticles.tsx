import { AnimatePresence, motion } from 'framer-motion';
import './FlyingParticles.css';

export interface RectLike {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface FlyingParticle {
  id: number;
  icon: string;
  color: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

interface FlyingParticlesProps {
  particles: FlyingParticle[];
  onComplete: (id: number) => void;
}

export function FlyingParticles({ particles, onComplete }: FlyingParticlesProps) {
  return (
    <div className="flying-layer" aria-hidden="true">
      <AnimatePresence>
        {particles.map((p) => {
          const dx = p.toX - p.fromX;
          const dy = p.toY - p.fromY;
          return (
            <motion.span
              key={p.id}
              className="flying-particle"
              style={{ backgroundColor: p.color, left: p.fromX, top: p.fromY }}
              initial={{ opacity: 1, scale: 0.7, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [1, 1, 0],
                scale: [0.7, 1.15, 0.35],
                x: [0, dx * 0.5, dx],
                y: [0, dy * 0.5 - 90, dy],
                rotate: [0, dx > 0 ? 90 : -90, dx > 0 ? 170 : -170],
              }}
              transition={{ duration: 0.6, times: [0, 0.55, 1], ease: ['easeOut', 'easeIn'] }}
              onAnimationComplete={() => onComplete(p.id)}
            >
              {p.icon}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
