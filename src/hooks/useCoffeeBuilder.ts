import { useCallback, useMemo, useState } from 'react';
import { INGREDIENTS } from '../data/ingredients';
import { DEFAULT_SIZE_ID, SIZES } from '../data/sizes';
import type { CupSizeId, RecipePreset, SelectedIngredient } from '../types';

export function useCoffeeBuilder() {
  const [coffeeName, setCoffeeName] = useState('');
  const [selected, setSelected] = useState<SelectedIngredient[]>([]);
  const [sizeId, setSizeId] = useState<CupSizeId>(DEFAULT_SIZE_ID);

  const addIngredient = useCallback((id: string) => {
    const ingredient = INGREDIENTS.find((item) => item.id === id);
    if (!ingredient) return;

    setSelected((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        if (existing.qty >= ingredient.maxQty) return prev;
        return prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const decrementIngredient = useCallback((id: string) => {
    setSelected((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  }, []);

  const removeIngredient = useCallback((id: string) => {
    setSelected((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const applyPreset = useCallback((preset: RecipePreset) => {
    setSelected(preset.items.map((item) => ({ id: item.ingredientId, qty: item.qty })));
  }, []);

  const reset = useCallback(() => {
    setSelected([]);
    setCoffeeName('');
    setSizeId(DEFAULT_SIZE_ID);
  }, []);

  const items = useMemo(
    () =>
      selected
        .map((sel) => {
          const ingredient = INGREDIENTS.find((item) => item.id === sel.id);
          return ingredient ? { ingredient, qty: sel.qty } : null;
        })
        .filter((v): v is { ingredient: (typeof INGREDIENTS)[number]; qty: number } => v !== null),
    [selected]
  );

  const totalItems = useMemo(() => selected.reduce((sum, item) => sum + item.qty, 0), [selected]);

  const size = useMemo(() => SIZES.find((s) => s.id === sizeId) ?? SIZES[0], [sizeId]);

  const totalPrice = useMemo(
    () => size.basePrice + items.reduce((sum, item) => sum + item.ingredient.price * item.qty, 0),
    [size, items]
  );

  return {
    coffeeName,
    setCoffeeName,
    selected,
    items,
    totalItems,
    size,
    sizeId,
    setSizeId,
    totalPrice,
    addIngredient,
    decrementIngredient,
    removeIngredient,
    applyPreset,
    reset,
  };
}
