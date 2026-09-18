import type { CupSizeOption } from '../types';

export const SIZES: CupSizeOption[] = [
  { id: 'kicik', label: 'Kiçik', volumeLabel: '250 ml', basePrice: 3.5, visualScale: 0.86, capacityMultiplier: 0.82 },
  { id: 'orta', label: 'Orta', volumeLabel: '350 ml', basePrice: 4.5, visualScale: 1, capacityMultiplier: 1 },
  { id: 'boyuk', label: 'Böyük', volumeLabel: '450 ml', basePrice: 5.5, visualScale: 1.14, capacityMultiplier: 1.24 },
];

export const DEFAULT_SIZE_ID: CupSizeOption['id'] = 'orta';
