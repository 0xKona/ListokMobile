import { StepType, RecipeType } from '@typed/recipe-types';
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
  },
});

export const { resetRecipeEditor } = recipeEditorSlice.actions;
export default recipeEditorSlice.reducer;
