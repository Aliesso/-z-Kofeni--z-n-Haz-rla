import { useCallback, useMemo, useState } from 'react';
import { INGREDIENTS } from '../data/ingredients';
import type { SelectedIngredient } from '../types';

export function useCoffeeBuilder() {
  const [coffeeName, setCoffeeName] = useState('');
  const [selected, setSelected] = useState<SelectedIngredient[]>([]);

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

  const reset = useCallback(() => {
    setSelected([]);
    setCoffeeName('');
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

  return {
    coffeeName,
    setCoffeeName,
    selected,
    items,
    totalItems,
    addIngredient,
    decrementIngredient,
    removeIngredient,
    reset,
  };
}
