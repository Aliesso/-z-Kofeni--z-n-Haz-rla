import { motion } from 'framer-motion';
import { RECIPE_PRESETS } from '../data/recipes';
import { INGREDIENTS } from '../data/ingredients';
import type { RecipePreset } from '../types';
import './RecipePresets.css';

interface RecipePresetsProps {
  onApply: (preset: RecipePreset) => void;
  activePresetId: string | null;
}

function presetIngredientSummary(preset: RecipePreset) {
  return preset.items
    .map((item) => INGREDIENTS.find((i) => i.id === item.ingredientId)?.name)
    .filter(Boolean)
    .join(', ');
}

export function RecipePresets({ onApply, activePresetId }: RecipePresetsProps) {
  return (
    <div className="recipes">
      <span className="recipes__label">Hazır resept ilə başla</span>
      <div className="recipes__row">
        {RECIPE_PRESETS.map((preset, index) => {
          const isActive = preset.id === activePresetId;
          return (
            <motion.button
              key={preset.id}
              type="button"
              className={`recipe-card ${isActive ? 'recipe-card--active' : ''}`}
              onClick={() => onApply(preset)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="recipe-card__icon">{preset.icon}</span>
              <span className="recipe-card__body">
                <span className="recipe-card__name">{preset.name}</span>
                <span className="recipe-card__tagline">{preset.tagline}</span>
                <span className="recipe-card__ingredients">{presetIngredientSummary(preset)}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
