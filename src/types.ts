export type IngredientCategory = 'baza' | 'sud' | 'serbet' | 'ustuluk' | 'elave';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  color: string;
  icon: string;
  maxQty: number;
  unit: string;
  price: number;
}

export interface SelectedIngredient {
  id: string;
  qty: number;
}

export type CupSizeId = 'kicik' | 'orta' | 'boyuk';

export interface CupSizeOption {
  id: CupSizeId;
  label: string;
  volumeLabel: string;
  basePrice: number;
  visualScale: number;
  capacityMultiplier: number;
}

export interface RecipePreset {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  items: Array<{ ingredientId: string; qty: number }>;
}

export interface Order {
  orderNumber: string;
  coffeeName: string;
  size: CupSizeOption;
  items: Array<{ ingredient: Ingredient; qty: number }>;
  totalPrice: number;
  createdAt: string;
}
