import { recipeManagerApis } from '@app/utils/api-connections/recipe-manager-api';
import { store } from '@redux/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeType } from '@typed/recipe-types';

export interface RecipeManagerStateInterface {
  error: string | null;
  loading: boolean;
  userRecipes: RecipeType[];
  storeRecipes: RecipeType[];
}

const initialState: RecipeManagerStateInterface = {
  error: null,
  loading: false,
  userRecipes: [],
  storeRecipes: [],
};

export const fetchRecipes = createAsyncThunk(
  'recipeManager/fetchRecipes',
  async (params: { userId: string; token: string }, { rejectWithValue }) => {
    try {
      const fetchedRecipes = await recipeManagerApis.getUserRecipes(
        params.userId,
        params.token,
      );
      console.log(fetchedRecipes);
      return fetchedRecipes;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const getRecipeByID = (recipeID: string): RecipeType | null => {
  const {recipeManager} = store.getState();
  const findRecipe = recipeManager.userRecipes.find((recipe: RecipeType) => recipe.id === recipeID);
  if (findRecipe) {
    return findRecipe
  } else {
    return null
  }
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
  extraReducers: builder => {
    builder.addCase(fetchRecipes.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action: any) => {
      state.userRecipes = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchRecipes.rejected, state => {
      state.loading = false;
    });
  },
});

export const { resetRecipeManagerState, setUserRecipes, setStoreRecipes } =
  recipeManagerSlice.actions;

export default recipeManagerSlice.reducer;
