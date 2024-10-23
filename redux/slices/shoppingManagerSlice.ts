import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shoppingListApis } from '@app/utils/api-connections/shopping-api';
import { IngredientType } from '@typed/recipe-types';
import { useUniqueId } from '@app/components/hooks/useUniqueId';
import { RootState } from '@redux/store';

// Define the initial state interface
interface ShoppingManagerState {
  loadingList: boolean;
  selectedListok: string | null;
  additionalItems: IngredientType[];
  ingredients: IngredientType[];
}

// Initialize the state
const initialState: ShoppingManagerState = {
  loadingList: false,
  selectedListok: null,
  additionalItems: [],
  ingredients: [],
};

// Define the async thunk to fetch ingredients list
export const generateShoppingList = createAsyncThunk(
  'shoppingManager/generateShoppingList',
  async (
    listokId: string,
    { rejectWithValue, getState, dispatch },
  ) => {
    // Ensure that the listokId is provided
    if (!listokId) {
      console.log('generateShoppingList called with no listokId');
      return rejectWithValue('Listok ID is required'); // Reject with a value for error handling
    }

    try {

      const state: RootState = getState() as RootState;
      const { token } = state.user.user;

      await dispatch(fetchAdditionalItemsList(null));

      const additionalItems = state.shoppingManager.additionalItems
      // Call the API to fetch the ingredients list
      const fetchedIngredients: IngredientType[] = await shoppingListApis.getIngredientsList(
        listokId,
        token,
      );

      console.log('Async Thunk fetchedIngredients: ', fetchedIngredients);

      // Map the fetched ingredients, adding checked and id properties
      const ingredientsWithChecked = [...fetchedIngredients, ...additionalItems]
        .map((ingredient: IngredientType) => ({
          ...ingredient,
          checked: false, // Initialize as not checked
          id: useUniqueId(),
        }))
        .sort((a, b) => {
          if (a.category < b.category) return -1;
          if (a.category > b.category) return 1;
          return 0; // If categories are equal, they stay in the same order
        });

      console.log('Ingredients With Checked and Id: ', ingredientsWithChecked);

      // Return the mapped ingredients
      return ingredientsWithChecked;
    } catch (error: any) {
      console.error('Error fetching ingredients:', error.message); // Log the error
      return rejectWithValue(error.message); // Reject with the error message
    }
  },
);

export const updateAdditionalItemsList = createAsyncThunk(
  'shoppingManager/updateAdditionalItemsList',
  async (
    newAdditionalItemsList: IngredientType[],
    { rejectWithValue, getState, dispatch }
  ) => {
    const state: RootState = getState() as RootState; // Access the entire state
    const { token } = state.user.user;        // Now retrieve the token from
    console.log('update additional items token: ', token)
    if (!newAdditionalItemsList) {
      console.warn("updateAdditionalItemsList called with no items array!");
      return rejectWithValue("Additional Items Array Required");
    } else {
      // Call the api here

      try {
        await shoppingListApis.updateAdditionalItemsList(newAdditionalItemsList, token);
        await dispatch(fetchAdditionalItemsList(null))
      } catch (error: any) {
        console.warn("Error updating additional items");
        return rejectWithValue(error.message);
      }

    }

  }
);

export const fetchAdditionalItemsList= createAsyncThunk(
  'shoppingManager/fetchAdditionalItemsList',
  async (
    _params: null,
    { rejectWithValue, getState }
  ) => {
    const state: RootState = getState() as RootState;
    const { token } = state.user.user;

    try {
      const additionalItems = await shoppingListApis.fetchAdditionalItemsList(token);
      console.log("Fetch Additional Response: ", additionalItems);
      return additionalItems;
    } catch (error: any) {
      rejectWithValue("failed to fect additional items");
    }
  }
)

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
    builder.addCase(fetchAdditionalItemsList.rejected, (state) => {
      state.loadingList = false;
    });
    builder.addCase(fetchAdditionalItemsList.pending, state => {
      state.loadingList = true;
    });
    builder.addCase(fetchAdditionalItemsList.fulfilled, (state, action) => {
      state.loadingList = false;
      console.log("Additional Items builder: ", action.payload)
      state.additionalItems = [...action.payload];
    })
  },
});

// Export the action creators and reducer
export const { setSelectedListok, setIngredients, toggleCheckedIngredient } =
  shoppingManagerSlice.actions;
export default shoppingManagerSlice.reducer;
