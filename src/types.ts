export type IngredientCategory = 'baza' | 'sud' | 'serbet' | 'ustuluk' | 'elave';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  color: string;
  icon: string;
  maxQty: number;
  unit: string;
}

export interface SelectedIngredient {
  id: string;
  qty: number;
}

export interface Order {
  orderNumber: string;
  coffeeName: string;
  items: Array<{ ingredient: Ingredient; qty: number }>;
  createdAt: string;
}
