import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeType } from '@typed/recipe-types';

export interface RecipeManagerStateInterface {
  userRecipes: RecipeType[];
  storeRecipes: RecipeType[];
}

const initialState: RecipeManagerStateInterface = {
  userRecipes: [],
  storeRecipes: [],
};

const recipeManagerSlice = createSlice({
  name: 'recipeManager',
  initialState,
  reducers: {
    resetRecipeManagerState() {
      return initialState;
    },
    setUserRecipes(
      state: { userRecipes: RecipeType[] },
      action: PayloadAction<RecipeType[]>,
    ) {
      state.userRecipes = action.payload;
    },
    setStoreRecipes(
      state: { storeRecipes: RecipeType[] },
      action: PayloadAction<RecipeType[]>,
    ) {
      state.storeRecipes = action.payload;
    },
  },
});

export const { resetRecipeManagerState, setUserRecipes, setStoreRecipes } =
  recipeManagerSlice.actions;

export default recipeManagerSlice.reducer;
