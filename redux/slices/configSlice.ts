import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as config from '@root/config/config.json';

interface ConfigState {
  googleClientId: string | undefined;
  iosClientId: string | undefined;
  androidClientId: string | undefined;
  webClientId: string | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: ConfigState = {
  googleClientId: undefined,
  iosClientId: undefined,
  androidClientId: undefined,
  webClientId: undefined,
  loading: false,
  error: null,
};

export const fetchConfig = createAsyncThunk(
  'config/fetchConfig',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.serverURL}/api/config`);
      console.log('fetchConfig response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('fetchConfig error:', error);
      return rejectWithValue(error.message);
    }
  },
);

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchConfig.pending, state => {
      console.log('fetchConfig.pending');
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchConfig.fulfilled, (state, action) => {
      console.log('fetchConfig.fulfilled', action.payload);
      state.loading = false;
      state.googleClientId = action.payload.googleClientId;
      state.iosClientId = action.payload.iosClientId;
      state.androidClientId = action.payload.androidClientId;
      state.webClientId = action.payload.webClientId;
      state.error = null;
    });
    builder.addCase(fetchConfig.rejected, (state, action) => {
      console.log('fetchConfig.rejected', action.error);
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch config';
    });
  },
});

export default configSlice.reducer;
