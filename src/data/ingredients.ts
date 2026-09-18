import type { Ingredient, IngredientCategory } from '../types';

export const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  baza: 'Baza',
  sud: 'Süd',
  serbet: 'Şərbətlər',
  ustuluk: 'Üstlük',
  elave: 'Əlavələr',
};

export const INGREDIENTS: Ingredient[] = [
  { id: 'espresso', name: 'Espresso', category: 'baza', color: '#3C2A21', icon: '☕', maxQty: 3, unit: 'şot', price: 0.8 },
  { id: 'water', name: 'İsti su', category: 'baza', color: '#D9C7B8', icon: '💧', maxQty: 2, unit: 'hissə', price: 0 },
  { id: 'milk', name: 'Süd', category: 'sud', color: '#F4E3D3', icon: '🥛', maxQty: 3, unit: 'hissə', price: 0.3 },
  { id: 'oat-milk', name: 'Yulaf südü', category: 'sud', color: '#EADCC8', icon: '🌾', maxQty: 3, unit: 'hissə', price: 0.6 },
  { id: 'caramel', name: 'Karamel şərbəti', category: 'serbet', color: '#B9772C', icon: '🍯', maxQty: 3, unit: 'pump', price: 0.4 },
  { id: 'vanilla', name: 'Vanil şərbəti', category: 'serbet', color: '#E9D9B6', icon: '🌼', maxQty: 3, unit: 'pump', price: 0.4 },
  { id: 'chocolate', name: 'Şokolad şərbəti', category: 'serbet', color: '#5A3524', icon: '🍫', maxQty: 3, unit: 'pump', price: 0.4 },
  { id: 'hazelnut', name: 'Fındıq şərbəti', category: 'serbet', color: '#8A5A34', icon: '🌰', maxQty: 3, unit: 'pump', price: 0.4 },
  { id: 'whipped-cream', name: 'Krem', category: 'ustuluk', color: '#FFF8ED', icon: '🍦', maxQty: 2, unit: 'qat', price: 0.5 },
  { id: 'cinnamon', name: 'Darçın', category: 'ustuluk', color: '#A0592E', icon: '✨', maxQty: 2, unit: 'çimdik', price: 0.15 },
  { id: 'cocoa-powder', name: 'Kakao tozu', category: 'ustuluk', color: '#4A2E1F', icon: '🌫️', maxQty: 2, unit: 'çimdik', price: 0.15 },
  { id: 'ice', name: 'Buz', category: 'elave', color: '#CFE9F1', icon: '🧊', maxQty: 4, unit: 'kub', price: 0 },
  { id: 'sugar', name: 'Şəkər', category: 'elave', color: '#FBEFD8', icon: '🧂', maxQty: 3, unit: 'qaşıq', price: 0 },
];

export const CATEGORY_ORDER: IngredientCategory[] = ['baza', 'sud', 'serbet', 'ustuluk', 'elave'];
