import type { RecipePreset } from '../types';

export const RECIPE_PRESETS: RecipePreset[] = [
  {
    id: 'latte',
    name: 'Klassik Latte',
    icon: '🥛',
    tagline: 'Espresso + bol süd',
    items: [
      { ingredientId: 'espresso', qty: 1 },
      { ingredientId: 'milk', qty: 2 },
    ],
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    icon: '☕',
    tagline: 'Espresso + süd + krem köpüyü',
    items: [
      { ingredientId: 'espresso', qty: 1 },
      { ingredientId: 'milk', qty: 1 },
      { ingredientId: 'whipped-cream', qty: 1 },
    ],
  },
  {
    id: 'caramel-macchiato',
    name: 'Karamel Macchiato',
    icon: '🍯',
    tagline: 'Vanil, karamel və krem',
    items: [
      { ingredientId: 'espresso', qty: 1 },
      { ingredientId: 'milk', qty: 2 },
      { ingredientId: 'vanilla', qty: 1 },
      { ingredientId: 'caramel', qty: 1 },
      { ingredientId: 'whipped-cream', qty: 1 },
    ],
  },
  {
    id: 'mocha',
    name: 'Mokka',
    icon: '🍫',
    tagline: 'Şokoladlı espresso qarışığı',
    items: [
      { ingredientId: 'espresso', qty: 1 },
      { ingredientId: 'milk', qty: 1 },
      { ingredientId: 'chocolate', qty: 2 },
      { ingredientId: 'whipped-cream', qty: 1 },
    ],
  },
  {
    id: 'vanilla-latte',
    name: 'Vanilla Latte',
    icon: '🌼',
    tagline: 'Yumşaq vanil notları',
    items: [
      { ingredientId: 'espresso', qty: 1 },
      { ingredientId: 'milk', qty: 2 },
      { ingredientId: 'vanilla', qty: 2 },
    ],
  },
  {
    id: 'iced-latte',
    name: 'Buzlu Latte',
    icon: '🧊',
    tagline: 'Sərinləyici yay içkisi',
    items: [
      { ingredientId: 'espresso', qty: 1 },
      { ingredientId: 'milk', qty: 2 },
      { ingredientId: 'ice', qty: 3 },
    ],
  },
];
