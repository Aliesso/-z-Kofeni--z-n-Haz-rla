import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import type { Ingredient } from '../types';
import type { RectLike } from './FlyingParticles';
import './IngredientPalette.css';

interface IngredientChipProps {
  ingredient: Ingredient;
  qty: number;
  onAdd: (id: string, rect?: RectLike) => void;
}

export function IngredientChip({ ingredient, qty, onAdd }: IngredientChipProps) {
  const isMaxed = qty >= ingredient.maxQty;
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: ingredient.id,
    disabled: isMaxed,
  });

  return (
    <motion.button
      ref={setNodeRef}
      type="button"
      className={`chip ${isDragging ? 'chip--dragging' : ''} ${isMaxed ? 'chip--maxed' : ''} ${qty > 0 ? 'chip--active' : ''}`}
      onClick={(e) => !isMaxed && onAdd(ingredient.id, e.currentTarget.getBoundingClientRect())}
      disabled={isMaxed}
      aria-label={`${ingredient.name} əlavə et`}
      whileHover={isMaxed ? undefined : { y: -3, rotate: -1 }}
      whileTap={isMaxed ? undefined : { scale: 0.94, rotate: 0 }}
      {...listeners}
      {...attributes}
    >
      <span className="chip__swatch" style={{ backgroundColor: ingredient.color }}>
        <span className="chip__icon">{ingredient.icon}</span>
      </span>
      <span className="chip__label">
        <span className="chip__name">{ingredient.name}</span>
        <span className="chip__unit">{isMaxed ? 'maksimum' : ingredient.unit}</span>
      </span>
      {qty > 0 && (
        <motion.span
          key={qty}
          className="chip__qty"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        >
          {qty}
        </motion.span>
      )}
    </motion.button>
  );
}
