import { shoppingListApis } from '@app/utils/api-connections/shopping-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientType } from '@typed/recipe-types';

interface ShoppingManagerState {
  selectedListok: string | null;
  ingredients: IngredientType[];
  checkedItems: { [key: string]: boolean };
}

const initialState: ShoppingManagerState = {
  selectedListok: null,
  ingredients: [],
  checkedItems: {},
};

export const generateShoppingList = createAsyncThunk(
  'shoppingManager/generateShoppingList',
  async (
    params: { listokId: string | null; token: string },
    { rejectWithValue },
  ) => {
    if (!params.listokId) {
      console.log('generateShoppingList called with no listokId');
      return;
    }
    try {
      const fetchedIngredients = await shoppingListApis.getIngredientsList(
        params.listokId,
        params.token,
      );
      console.log('Async Thunk fetchedIngredients: ', fetchedIngredients);
      return fetchedIngredients;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const shoppingManagerSlice = createSlice({
  name: 'shoppingManager',
  initialState,
  reducers: {
    setSelectedListok(state, action: PayloadAction<string>) {
      return {
        ...state,
        selectedListok: action.payload,
      };
    },
    setIngredients(state, action: PayloadAction<IngredientType[]>) {
      return {
        ...state,
        ingredients: action.payload,
      };
    },
    toggleCheckedItem(state, action: PayloadAction<string>) {
      const itemName = action.payload;
      return {
        ...state,
        checkedItems: {
          ...state.checkedItems,
          [itemName]: !state.checkedItems[itemName],
        },
      };
    },
  },
});

export const { setSelectedListok, setIngredients, toggleCheckedItem } =
  shoppingManagerSlice.actions;
export default shoppingManagerSlice.reducer;
