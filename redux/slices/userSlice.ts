import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://192.168.1.20:3000/api/auth/login',
        {
          token,
        },
      );
      return response.data;
    } catch (error: any) {
      console.error('loginWithGoogle error:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  // TODO :: Terminate session on backend
  // await axios.post('http://127.0.0.1:3000/api/auth/logout');
  return;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginWithGoogle.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || 'Failed to login';
    });
    builder.addCase(logout.fulfilled, state => {
      state.user = null;
    });
  },
});

export default userSlice.reducer;
