import { useEffect, type CSSProperties } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { CATEGORY_ORDER } from '../data/ingredients';
import type { CupSizeOption, Ingredient } from '../types';
import './Cup.css';

interface CupProps {
  items: Array<{ ingredient: Ingredient; qty: number }>;
  bumpSignal: number;
  size: CupSizeOption;
}

const LIQUID_CATEGORIES = new Set(['baza', 'sud', 'serbet']);
const FOAM_CATEGORIES = new Set(['ustuluk']);
const FLOAT_CATEGORIES = new Set(['elave']);

export function Cup({ items, bumpSignal, size }: CupProps) {
  const { setNodeRef, isOver } = useDroppable({ id: 'cup-drop-zone' });
  const bodyControls = useAnimationControls();

  const liquidItems = items
    .filter((i) => LIQUID_CATEGORIES.has(i.ingredient.category))
    .sort((a, b) => CATEGORY_ORDER.indexOf(a.ingredient.category) - CATEGORY_ORDER.indexOf(b.ingredient.category));
  const foamItems = items.filter((i) => FOAM_CATEGORIES.has(i.ingredient.category));
  const floatItems = items.filter((i) => FLOAT_CATEGORIES.has(i.ingredient.category));

  const totalLiquidUnits = liquidItems.reduce((sum, i) => sum + i.qty, 0);
  const hasIce = floatItems.some((i) => i.ingredient.id === 'ice' && i.qty > 0);
  const isHot = liquidItems.some((i) => (i.ingredient.id === 'espresso' || i.ingredient.id === 'water') && i.qty > 0) && !hasIce;
  const fillPct = totalLiquidUnits === 0 ? 0 : Math.min(94, (24 + totalLiquidUnits * 9) / size.capacityMultiplier);
  const isEmpty = items.length === 0;
  const topLiquidColor = liquidItems[liquidItems.length - 1]?.ingredient.color ?? '#e0b184';

  useEffect(() => {
    if (bumpSignal > 0) {
      bodyControls.start({
        scale: [1, 1.07, 0.97, 1.02, 1],
        rotate: [0, -1.5, 1.2, -0.5, 0],
        transition: { duration: 0.55, ease: 'easeOut' },
      });
    }
  }, [bumpSignal, bodyControls]);

  return (
    <div className="cup-wrap" style={{ '--size-scale': size.visualScale } as CSSProperties}>
      {isHot && (
        <div className="cup-steam">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="cup-steam-wisp"
              style={{ left: `${30 + i * 20}%` }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.55, 0], y: [-6, -34], x: [0, i % 2 === 0 ? 5 : -5] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      <motion.div
        ref={setNodeRef}
        data-cup-target
        animate={bodyControls}
        className={`cup ${isOver ? 'cup--over' : ''} ${isEmpty ? 'cup--empty' : ''}`}
        whileHover={{ y: -2 }}
      >
        <div className="cup__rim" />
        <div className="cup__body">
          {isEmpty && (
            <div className="cup__hint">
              <motion.span
                className="cup__hint-arrow"
                animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                ↓
              </motion.span>
              <span className="cup__hint-text">
                İnteqryentləri
                <br />
                bura sürüşdür
              </span>
            </div>
          )}

          <div className="cup__liquid" style={{ height: `${fillPct}%` }}>
            {fillPct > 0 && (
              <div className="cup__wave-wrap">
                <svg className="cup__wave cup__wave--back" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path
                    d="M0 10 Q 25 0 50 10 T 100 10 T 150 10 T 200 10 V20 H0 Z"
                    fill={topLiquidColor}
                    opacity="0.55"
                  />
                </svg>
                <svg className="cup__wave cup__wave--front" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path
                    d="M0 12 Q 25 4 50 12 T 100 12 T 150 12 T 200 12 V20 H0 Z"
                    fill={topLiquidColor}
                  />
                </svg>
              </div>
            )}

            <div className="cup__liquid-shine" />

            {liquidItems.map((item) => (
              <motion.div
                key={item.ingredient.id}
                className={`cup__layer ${item.ingredient.category === 'serbet' ? 'cup__layer--swirl' : ''}`}
                style={{ backgroundColor: item.ingredient.color, flexGrow: item.qty }}
                initial={{ flexGrow: 0 }}
                animate={{ flexGrow: item.qty }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              />
            ))}

            {totalLiquidUnits > 0 && (
              <div className="cup__bubbles">
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="cup__bubble"
                    style={{ left: `${18 + i * 20}%` }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -70, opacity: [0, 0.7, 0] }}
                    transition={{ duration: 2.6 + i * 0.3, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
                  />
                ))}
              </div>
            )}
          </div>

          <AnimatePresence>
            {foamItems.length > 0 && (
              <motion.div
                className="cup__foam"
                style={{ bottom: `${fillPct}%`, backgroundColor: foamItems[foamItems.length - 1].ingredient.color }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1, height: `${Math.min(30, 10 + foamItems.reduce((s, i) => s + i.qty, 0) * 5)}px` }}
                exit={{ scaleY: 0, opacity: 0 }}
              >
                <span className="cup__foam-bump" />
                <span className="cup__foam-bump" />
                <span className="cup__foam-bump" />
              </motion.div>
            )}
          </AnimatePresence>

          {floatItems.length > 0 && (
            <div className="cup__floaters">
              {floatItems.map((item) =>
                Array.from({ length: Math.min(item.qty, 4) }).map((_, idx) => (
                  <motion.span
                    key={`${item.ingredient.id}-${idx}`}
                    className="cup__floater"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: [idx % 2 === 0 ? 8 : -8, idx % 2 === 0 ? -6 : 6, idx % 2 === 0 ? 8 : -8],
                      y: [0, -4, 0],
                    }}
                    transition={{
                      scale: { type: 'spring', stiffness: 400, damping: 16 },
                      rotate: { duration: 3 + idx * 0.4, repeat: Infinity, ease: 'easeInOut' },
                      y: { duration: 2.2 + idx * 0.3, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    style={{ left: `${14 + idx * 18}%`, top: `${8 + (idx % 2) * 12}%` }}
                  >
                    {item.ingredient.icon}
                  </motion.span>
                ))
              )}
            </div>
          )}

          <div className="cup__glass-shine" />
        </div>
        <div className="cup__base" />
      </motion.div>

      <div className="cup__saucer" />
      <span className="cup-size-tag">{size.label} · {size.volumeLabel}</span>
    </div>
  );
}
