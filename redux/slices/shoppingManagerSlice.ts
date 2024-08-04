import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shoppingListApis } from '@app/utils/api-connections/shopping-api';
import { IngredientType } from '@typed/recipe-types';
import { useUniqueId } from '@app/components/hooks/useUniqueId';

// Define the initial state interface
interface ShoppingManagerState {
  loadingList: boolean;
  selectedListok: string | null;
  ingredients: IngredientType[];
}

// Initialize the state
const initialState: ShoppingManagerState = {
  loadingList: false,
  selectedListok: null,
  ingredients: [],
};

// Define the async thunk to fetch ingredients list
export const generateShoppingList = createAsyncThunk(
  'shoppingManager/generateShoppingList',
  async (
    params: { listokId: string | null; token: string },
    { rejectWithValue },
  ) => {
    // Ensure that the listokId is provided
    if (!params.listokId) {
      console.log('generateShoppingList called with no listokId');
      return rejectWithValue('Listok ID is required'); // Reject with a value for error handling
    }

    try {
      // Call the API to fetch the ingredients list
      const fetchedIngredients = await shoppingListApis.getIngredientsList(
        params.listokId,
        params.token,
      );

      console.log('Async Thunk fetchedIngredients: ', fetchedIngredients);

      // Map the fetched ingredients, adding checked and id properties
      const ingredientsWithChecked = fetchedIngredients.map(
        (ingredient: IngredientType) => ({
          ...ingredient,
          checked: false, // Initialize as not checked
          id: useUniqueId(),
        }),
      );

      console.log('Ingredients With Checked and Id: ', ingredientsWithChecked);

      // Return the mapped ingredients
      return ingredientsWithChecked;
    } catch (error: any) {
      console.error('Error fetching ingredients:', error.message); // Log the error
      return rejectWithValue(error.message); // Reject with the error message
    }
  },
);

// Define the shopping manager slice
const shoppingManagerSlice = createSlice({
  name: 'shoppingManager',
  initialState,
  reducers: {
    // Reducer to set the selected Listok
    setSelectedListok(state, action: PayloadAction<string>) {
      state.selectedListok = action.payload; // Directly set the selected Listok
    },
    // Reducer to set the ingredients list
    setIngredients(state, action: PayloadAction<IngredientType[]>) {
      state.ingredients = action.payload; // Directly set the ingredients list
    },
    // Reducer to toggle the checked status of an ingredient
    toggleCheckedIngredient(state, action: PayloadAction<string>) {
      const ingredientId = action.payload; // Get the ingredient ID from the action payload
      // Map the ingredients, toggling the checked status for the specified ingredient
      state.ingredients = state.ingredients.map(ingredient =>
        ingredient.id === ingredientId
          ? { ...ingredient, checked: !ingredient.checked }
          : ingredient,
      );
    },
  },
  extraReducers: builder => {
    // Handle the pending state of the async thunk
    builder.addCase(generateShoppingList.pending, state => {
      state.loadingList = true; // Set loading state to true
    });
    // Handle the fulfilled state of the async thunk
    builder.addCase(generateShoppingList.fulfilled, (state, action: any) => {
      console.log('State Payload Check: ', action.payload);
      state.ingredients = action.payload; // Update the ingredients state with the fetched data
      state.loadingList = false; // Set loading state to false
    });
    // Handle the rejected state of the async thunk
    builder.addCase(generateShoppingList.rejected, (state, action) => {
      console.error('Error generating shopping list:', action.payload); // Log the error
      state.loadingList = false; // Set loading state to false
    });
  },
});

// Export the action creators and reducer
export const { setSelectedListok, setIngredients, toggleCheckedIngredient } =
  shoppingManagerSlice.actions;
export default shoppingManagerSlice.reducer;
