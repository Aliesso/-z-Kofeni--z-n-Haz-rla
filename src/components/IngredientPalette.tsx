import { motion } from 'framer-motion';
import { CATEGORY_LABELS, CATEGORY_ORDER, INGREDIENTS } from '../data/ingredients';
import type { SelectedIngredient } from '../types';
import { IngredientChip } from './IngredientChip';
import type { RectLike } from './FlyingParticles';
import './IngredientPalette.css';

interface IngredientPaletteProps {
  selected: SelectedIngredient[];
  onAdd: (id: string, rect?: RectLike) => void;
}

export function IngredientPalette({ selected, onAdd }: IngredientPaletteProps) {
  const qtyOf = (id: string) => selected.find((s) => s.id === id)?.qty ?? 0;

  return (
    <div className="palette">
      {CATEGORY_ORDER.map((category, groupIndex) => {
        const categoryIngredients = INGREDIENTS.filter((i) => i.category === category);
        return (
          <motion.section
            className="palette__group"
            key={category}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: groupIndex * 0.06, ease: 'easeOut' }}
          >
            <h3 className="palette__group-title">{CATEGORY_LABELS[category]}</h3>
            <div className="palette__grid">
              {categoryIngredients.map((ingredient) => (
                <IngredientChip key={ingredient.id} ingredient={ingredient} qty={qtyOf(ingredient.id)} onAdd={onAdd} />
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
