import {
  StepType,
  RecipeType,
  IngredientType,
  MethodStepType,
} from '@typed/recipe-types';
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { recipeManagerApis } from '@app/utils/api-connections/recipe-manager-api';
import { RootState } from '@redux/store';

export interface RecipeEditorState {
  existingRecipe: boolean;
  steps: StepType[];
  currentStep: number;
  recipeData: RecipeType;
}

const initialState: RecipeEditorState = {
  existingRecipe: false,
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
    createdBy: null,
    createdByName: '',
    createdOn: '',
    public: false,
    picture: '',
    ingredients: [],
    method: [],
  },
};

// Thunk for submitting the recipe
export const submitRecipe = createAsyncThunk(
  'recipe/submitRecipe',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { recipeData, existingRecipe } = state.recipeEditor;
    const { user } = state.user;
    
    const recipePayload = {
      ...recipeData,
      createdBy: user.userId,
      createdByName: user.name,
    };
    
    if (existingRecipe) {
      await recipeManagerApis.updateExistingRecipe(
        JSON.stringify(recipePayload),
        user.token,
      );
    } else {
      await recipeManagerApis.postNewRecipe(
        JSON.stringify(recipePayload),
        user.token,
      );
    }
  }
);

const recipeEditorSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    resetRecipeEditor() {
      return initialState;
    },
    openRecipeEditor(state, action: PayloadAction<RecipeType>) {
      state.recipeData = action.payload;
      state.existingRecipe = true;
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
    updateRecipePicture(state, action: PayloadAction<string>) {
      state.recipeData.picture = action.payload;
    },
    updateRecipeIngredients(state, action: PayloadAction<IngredientType[]>) {
      state.recipeData.ingredients = action.payload;
    },
    updateRecipeMethod(state, action: PayloadAction<MethodStepType[]>) {
      state.recipeData.method = action.payload;
    },
  },
});

export const {
  resetRecipeEditor,
  openRecipeEditor,
  changeCurrentStep,
  updateRecipeTitle,
  updateRecipeDesc,
  updateRecipePicture,
  updateRecipeIngredients,
  updateRecipeMethod,
} = recipeEditorSlice.actions;

export default recipeEditorSlice.reducer;
