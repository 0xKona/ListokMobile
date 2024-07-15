import { CategoryType, MeasurementType } from '@typed/recipe-types';

export interface ingredientMeasurementOption {
  label: string;
  value: MeasurementType;
}

export interface ingredientCategoryOption {
  label: string;
  value: CategoryType;
}

export const ingredientMeasurementOptions: ingredientMeasurementOption[] = [
  { label: 'Units', value: 'units' },
  { label: 'Kilograms (KG)', value: 'kg' },
  { label: 'Grams (g)', value: 'g' },
  { label: 'Mililitres (ml)', value: 'ml' },
  { label: 'Pints', value: 'pints' },
  { label: 'Tablespoons', value: 'tablespoons' },
  { label: 'Teaspoons', value: 'teaspoons' },
];

export const ingredientCategoryOptions: ingredientCategoryOption[] = [
  { label: 'Fruit', value: 'fruit' },
  { label: 'Vegetable', value: 'vegetable' },
  { label: 'Meat', value: 'meat' },
  { label: 'Fish', value: 'fish' },
  { label: 'Ambient', value: 'ambient' },
  { label: 'Frozen', value: 'frozen' },
  { label: 'Bakery', value: 'bakery' },
  { label: 'Confectionary', value: 'confectionary' },
  { label: 'Other', value: 'other' },
];
