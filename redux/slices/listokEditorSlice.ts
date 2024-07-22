import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListokInterface, ListokStepInterface } from '@typed/listok-types';

export interface ListokEditorStateInterface {
  existingListok: boolean;
  steps: ListokStepInterface[];
  currentStep: number;
  listokData: ListokInterface;
}

const initialState: ListokEditorStateInterface = {
  existingListok: false,
  steps: [
    { stepNumber: 1, errors: false, completed: false },
    { stepNumber: 2, errors: false, completed: false },
    { stepNumber: 3, errors: false, completed: false },
  ],
  currentStep: 1,
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
    updateListokTitle(state, action: PayloadAction<string>) {
      state.listokData.title = action.payload;
    },
    updateListokDesc(state, action: PayloadAction<string>) {
      state.listokData.desc = action.payload;
    },
  },
});

export const {
  resetListokEditor,
  openListokEditor,
  changeListokStep,
  updateListokTitle,
  updateListokDesc,
} = listokEditorSlice.actions;

export default listokEditorSlice.reducer;
