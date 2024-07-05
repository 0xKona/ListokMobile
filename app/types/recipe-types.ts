export type MeasurementType =
  | 'kg'
  | 'g'
  | 'ml'
  | 'pints'
  | 'tablespoons'
  | 'teaspoons'
  | 'units';

export type CategoryType =
  | 'fruit'
  | 'vegetable'
  | 'meat'
  | 'fish'
  | 'ambient'
  | 'frozen'
  | 'bakery'
  | 'confectionary'
  | 'other';

export interface IngredientType {
  name: string;
  amount: number | null;
  measurement: MeasurementType;
  category: CategoryType;
}

export interface MethodStepType {
  index: number;
  step: string;
}

export interface RecipeType {
  id: number | null;
  title: string;
  desc: string;
  createdBy: { userId: number | null; name: string };
  createdOn: string;
  public: boolean;
  picture: string;
  ingredients: IngredientType[];
  method: MethodStepType[];
}

export interface StepType {
  stepNumber: number;
  errors: boolean;
  completed: boolean;
}
