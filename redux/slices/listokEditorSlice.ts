import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListokInterface, ListokStepInterface } from '@typed/listok-types';

export interface ListokEditorStateInterface {
  existingListok: boolean;
  steps: ListokStepInterface[];
  currentStep: number;
  selectingRecipesForDay: number;
  listokData: ListokInterface;
}

export interface PressOnRecipeActionInterface {
  day: string;
  recipeId: string;
}

export type DaysOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

const initialState: ListokEditorStateInterface = {
  existingListok: false,
  steps: [
    { stepNumber: 1, errors: false, completed: false },
    { stepNumber: 2, errors: false, completed: false },
    { stepNumber: 3, errors: false, completed: false },
  ],
  currentStep: 1,
  selectingRecipesForDay: 0,
  listokData: {
    id: null,
    title: '',
    desc: '',
    picture: '',
    days: {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    },
    createdBy: null,
    createdByName: null,
    createdOn: null,
  },
};

const listokEditorSlice = createSlice({
  name: 'listok',
  initialState,
  reducers: {
    resetListokEditor() {
      return initialState;
    },
    openListokEditor(state, action: PayloadAction<ListokInterface>) {
      state.listokData = action.payload;
      state.existingListok = true;
    },
    changeListokStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    updateListokTitle(state, action: PayloadAction<string | null>) {
      state.listokData.title = action.payload;
    },
    updateListokDesc(state, action: PayloadAction<string | null>) {
      state.listokData.desc = action.payload;
    },
    setDayToSelectRecipes(state, action: PayloadAction<number>) {
      state.selectingRecipesForDay = action.payload;
    },
    pressOnRecipe(state, action: PayloadAction<PressOnRecipeActionInterface>) {
      const day = action.payload.day;
      const recipeId = action.payload.recipeId;

      if (state.listokData.days[day as DaysOfWeek].includes(recipeId)) {
        state.listokData.days[day as DaysOfWeek] = state.listokData.days[
          day as DaysOfWeek
        ].filter(id => id !== recipeId);
      } else {
        state.listokData.days[day as DaysOfWeek].push(recipeId);
      }
    },
  },
});

export const {
  resetListokEditor,
  openListokEditor,
  changeListokStep,
  updateListokTitle,
  updateListokDesc,
  setDayToSelectRecipes,
  pressOnRecipe,
} = listokEditorSlice.actions;

export default listokEditorSlice.reducer;
