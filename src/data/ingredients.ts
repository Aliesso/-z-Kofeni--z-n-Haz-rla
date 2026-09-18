import type { Ingredient, IngredientCategory } from '../types';

export const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  baza: 'Baza',
  sud: 'Süd',
  serbet: 'Şərbətlər',
  ustuluk: 'Üstlük',
  elave: 'Əlavələr',
};

export const INGREDIENTS: Ingredient[] = [
  { id: 'espresso', name: 'Espresso', category: 'baza', color: '#3C2A21', icon: '☕', maxQty: 3, unit: 'şot' },
  { id: 'water', name: 'İsti su', category: 'baza', color: '#D9C7B8', icon: '💧', maxQty: 2, unit: 'hissə' },
  { id: 'milk', name: 'Süd', category: 'sud', color: '#F4E3D3', icon: '🥛', maxQty: 3, unit: 'hissə' },
  { id: 'oat-milk', name: 'Yulaf südü', category: 'sud', color: '#EADCC8', icon: '🌾', maxQty: 3, unit: 'hissə' },
  { id: 'caramel', name: 'Karamel şərbəti', category: 'serbet', color: '#B9772C', icon: '🍯', maxQty: 3, unit: 'pump' },
  { id: 'vanilla', name: 'Vanil şərbəti', category: 'serbet', color: '#E9D9B6', icon: '🌼', maxQty: 3, unit: 'pump' },
  { id: 'chocolate', name: 'Şokolad şərbəti', category: 'serbet', color: '#5A3524', icon: '🍫', maxQty: 3, unit: 'pump' },
  { id: 'hazelnut', name: 'Fındıq şərbəti', category: 'serbet', color: '#8A5A34', icon: '🌰', maxQty: 3, unit: 'pump' },
  { id: 'whipped-cream', name: 'Krem', category: 'ustuluk', color: '#FFF8ED', icon: '🍦', maxQty: 2, unit: 'qat' },
  { id: 'cinnamon', name: 'Darçın', category: 'ustuluk', color: '#A0592E', icon: '✨', maxQty: 2, unit: 'çimdik' },
  { id: 'cocoa-powder', name: 'Kakao tozu', category: 'ustuluk', color: '#4A2E1F', icon: '🌫️', maxQty: 2, unit: 'çimdik' },
  { id: 'ice', name: 'Buz', category: 'elave', color: '#CFE9F1', icon: '🧊', maxQty: 4, unit: 'kub' },
  { id: 'sugar', name: 'Şəkər', category: 'elave', color: '#FBEFD8', icon: '🧂', maxQty: 3, unit: 'qaşıq' },
];

export const CATEGORY_ORDER: IngredientCategory[] = ['baza', 'sud', 'serbet', 'ustuluk', 'elave'];
