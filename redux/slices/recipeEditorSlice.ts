import { StepType, RecipeType, IngredientType } from '@typed/recipe-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface RecipeEditorState {
  steps: StepType[];
  currentStep: number;
  recipeData: RecipeType;
}

const initialState: RecipeEditorState = {
  steps: [
    { stepNumber: 1, errors: false, completed: false },
    { stepNumber: 2, errors: false, completed: false },
    { stepNumber: 3, errors: false, completed: false },
    { stepNumber: 4, errors: false, completed: false },
  ],
  currentStep: 1,
  recipeData: {
    id: null,
    title: '',
    desc: '',
    createdBy: { userId: null, name: '' },
    createdOn: '',
    public: false,
    picture: '',
    ingredients: [],
    method: [],
  },
};

const recipeEditorSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    resetRecipeEditor() {
      return initialState;
    },
    openRecipeEditor(state, action: PayloadAction<RecipeType>) {
      state.recipeData = action.payload;
    },
    changeCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    updateRecipeTitle(state, action: PayloadAction<string>) {
      state.recipeData.title = action.payload;
    },
    updateRecipeDesc(state, action: PayloadAction<string>) {
      state.recipeData.desc = action.payload;
    },
    updateRecipeIngredients(state, action: PayloadAction<IngredientType[]>) {
      state.recipeData.ingredients = action.payload;
    },
  },
});

export const {
  resetRecipeEditor,
  changeCurrentStep,
  updateRecipeTitle,
  updateRecipeDesc,
  updateRecipeIngredients,
} = recipeEditorSlice.actions;
export default recipeEditorSlice.reducer;
