import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Order } from '../types';
import './ConfirmationOverlay.css';

interface ConfirmationOverlayProps {
  order: Order | null;
  onClose: () => void;
}

const CONFETTI_COLORS = ['#d76b3c', '#c08552', '#7ed957', '#e0b184', '#f2d9b8'];

function makeConfetti(count: number, seed: string) {
  const seedNum = seed.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2 + (i % 2 === 0 ? 0.2 : -0.2);
    const distance = 90 + ((i * 37 + seedNum) % 70);
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 20,
      rotate: (i * 53 + seedNum) % 360,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: 0.75 + (i % 5) * 0.03,
    };
  });
}

export function ConfirmationOverlay({ order, onClose }: ConfirmationOverlayProps) {
  const confetti = useMemo(() => makeConfetti(18, order?.orderNumber ?? '0'), [order?.orderNumber]);

  return (
    <AnimatePresence>
      {order && (
        <motion.div
          className="confirm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Sifariş göndərildi"
        >
          <motion.div
            className="confirm-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <div className="confirm-confetti">
              {confetti.map((c) => (
                <motion.span
                  key={c.id}
                  className="confirm-confetti__piece"
                  style={{ backgroundColor: c.color }}
                  initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.6 }}
                  animate={{ x: c.x, y: c.y, opacity: [0, 1, 1, 0], rotate: c.rotate, scale: 1 }}
                  transition={{ duration: 0.9, delay: c.delay, ease: 'easeOut' }}
                />
              ))}
            </div>

            <div className="confirm-track">
              <motion.span
                className="confirm-cup"
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: '210%', rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              >
                ☕
              </motion.span>
              <motion.span
                className="confirm-register"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1, 1.35, 1] }}
                transition={{ duration: 0.9, times: [0, 0.85, 0.93, 1] }}
              >
                🧾
              </motion.span>
            </div>

            <motion.div
              className="confirm-check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.85, type: 'spring', stiffness: 300, damping: 16 }}
            >
              ✓
            </motion.div>

            <h2 className="confirm-title">Sifariş kassaya göndərildi!</h2>
            <p className="confirm-order-no">Sifariş №{order.orderNumber}</p>

            <div className="confirm-details">
              <p className="confirm-coffee-name">"{order.coffeeName}"</p>
              <ul className="confirm-list">
                {order.items.map(({ ingredient, qty }) => (
                  <li key={ingredient.id}>
                    <span>{ingredient.icon} {ingredient.name}</span>
                    <span className="confirm-list__qty">×{qty}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="confirm-note">Zəhmət olmasa kassaya yaxınlaşın və sifariş nömrənizi bildirin.</p>

            <button type="button" className="btn btn--primary confirm-close" onClick={onClose}>
              Yeni kofe hazırla
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
