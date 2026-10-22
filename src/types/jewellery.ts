export interface DiamondSpecs {
  carat: number;
  cut: 'Excellent' | 'Ideal' | 'Very Good';
  color: 'D' | 'E' | 'F' | 'G' | 'H';
  clarity: 'FL' | 'IF' | 'VVS1' | 'VVS2' | 'VS1';
  fluorescence: 'None' | 'Faint' | 'Medium';
  polish: 'Excellent';
  symmetry: 'Excellent';
  giaNumber: string;
  tablePercentage: number;
  depthPercentage: number;
}

export interface Product {
  id: string;
  name: string;
  frenchName: string;
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets';
  categoryLabel: string;
  price: number;
  image: string;
  originalPrice?: number;
  description: string;
  editorialQuote: string;
  metal: '18k Champagne Gold' | '18k Yellow Gold' | '18k Rose Gold' | '950 Platinum';
  totalCaratWeight: string;
  specs: DiamondSpecs;
  dimensions: string;
  collection: string;
  inStock: boolean;
  featured: boolean;
  sizes?: string[];
  defaultSize?: string;
  details: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  engraving?: string;
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  symbol: string;
  rate: number;
  prefix: boolean;
}
