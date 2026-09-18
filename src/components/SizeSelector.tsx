import { motion } from 'framer-motion';
import { SIZES } from '../data/sizes';
import { formatPrice } from '../lib/format';
import type { CupSizeId } from '../types';
import './SizeSelector.css';

interface SizeSelectorProps {
  value: CupSizeId;
  onChange: (id: CupSizeId) => void;
}

export function SizeSelector({ value, onChange }: SizeSelectorProps) {
  return (
    <div className="size-field">
      <span className="size-field__label">Ölçü</span>
      <div className="size-selector" role="radiogroup" aria-label="Stəkan ölçüsü">
        {SIZES.map((size) => {
          const active = size.id === value;
          return (
            <button
              key={size.id}
              type="button"
              role="radio"
              aria-checked={active}
              className={`size-option ${active ? 'size-option--active' : ''}`}
              onClick={() => onChange(size.id)}
            >
              {active && (
                <motion.span
                  className="size-option__bg"
                  layoutId="size-option-bg"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className="size-option__content">
                <span className="size-option__label">{size.label}</span>
                <span className="size-option__meta">{size.volumeLabel} · {formatPrice(size.basePrice)}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
