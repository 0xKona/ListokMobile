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

export type ErrorKeyType =
  | 'title'
  | 'desc'
  | 'public'
  | 'picture'
  | 'ingredients'
  | 'method';

export type RecipeErrorInterface = {
  [key in ErrorKeyType]: null | string;
};

export type RecipeErrorsType = false | RecipeErrorInterface;

export interface IngredientType {
  name: string;
  amount: number | null;
  measurement: MeasurementType;
  category: CategoryType;
  checked?: boolean;
  id?: string;
}

export interface MethodStepType {
  index: number;
  step: string;
}

export interface RecipeType {
  id: number | null;
  title: string;
  desc: string;
  createdBy: string | null;
  createdByName: string | null;
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
