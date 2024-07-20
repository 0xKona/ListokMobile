import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ListokInterface } from '@typed/listok-types';

export interface ListokManagerStateInterface {
  error: string | null;
  loadingListoks: boolean;
  userListoks: ListokInterface[];
  // for future development
  storeListoks: ListokInterface[];
}

const initialState: ListokManagerStateInterface = {
  error: null,
  loadingListoks: false,
  userListoks: [],
  storeListoks: [],
};

export const fetchListoks = createAsyncThunk(
  'listokManager/fetchListoks',
  async (params: { userId: string; token: string }, { rejectWithValue }) => {
    try {
      // Api Call Here
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const listokManagerSlice = createSlice({
  name: 'listokManager',
  initialState,
  reducers: {
    resetListokManagerState() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchListoks.pending, state => {
      state.loadingListoks = true;
    });
    builder.addCase(fetchListoks.fulfilled, (state, action: any) => {
      state.loadingListoks = false;
      state.userListoks = action.payload;
      state.error = null;
    });
    builder.addCase(fetchListoks.rejected, (state, action: any) => {
      state.loadingListoks = false;
      state.error = action.payload;
    });
  },
});

export const { resetListokManagerState } = listokManagerSlice.actions;

export default listokManagerSlice.reducer;
