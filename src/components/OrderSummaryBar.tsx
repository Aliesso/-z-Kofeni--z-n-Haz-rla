import { AnimatePresence, motion } from 'framer-motion';
import type { Ingredient } from '../types';
import './OrderSummaryBar.css';

interface OrderSummaryBarProps {
  items: Array<{ ingredient: Ingredient; qty: number }>;
  totalItems: number;
  canSend: boolean;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onReset: () => void;
  onSend: () => void;
}

export function OrderSummaryBar({
  items,
  totalItems,
  canSend,
  onIncrement,
  onDecrement,
  onRemove,
  onReset,
  onSend,
}: OrderSummaryBarProps) {
  return (
    <div className="summary-bar">
      <div className="summary-bar__pills">
        {items.length === 0 ? (
          <span className="summary-bar__empty">Hələ inteqryent seçilməyib</span>
        ) : (
          <AnimatePresence initial={false}>
            {items.map(({ ingredient, qty }) => (
              <motion.div
                key={ingredient.id}
                className="pill"
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15 }}
              >
                <span className="pill__icon">{ingredient.icon}</span>
                <span className="pill__name">{ingredient.name}</span>
                <button type="button" className="pill__step" onClick={() => onDecrement(ingredient.id)} aria-label="Azalt">
                  −
                </button>
                <span className="pill__qty">{qty}</span>
                <button type="button" className="pill__step" onClick={() => onIncrement(ingredient.id)} aria-label="Artır">
                  +
                </button>
                <button type="button" className="pill__remove" onClick={() => onRemove(ingredient.id)} aria-label="Sil">
                  ×
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="summary-bar__actions">
        <span className="summary-bar__count">{totalItems} inteqryent</span>
        <button type="button" className="btn btn--ghost" onClick={onReset} disabled={items.length === 0}>
          Sıfırla
        </button>
        <motion.button
          type="button"
          className={`btn btn--primary ${canSend ? 'btn--primary-live' : ''}`}
          onClick={onSend}
          disabled={!canSend}
          whileHover={canSend ? { scale: 1.03 } : undefined}
          whileTap={canSend ? { scale: 0.95 } : undefined}
        >
          Kassaya göndər <motion.span animate={canSend ? { x: [0, 4, 0] } : { x: 0 }} transition={{ duration: 1.1, repeat: Infinity }}>→</motion.span>
        </motion.button>
      </div>
    </div>
  );
}
