import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  currentTheme: string;
}

const initialState: ThemeState = {
  currentTheme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLightMode(state) {
      state.currentTheme = 'light';
    },
    setDarkMode(state) {
      state.currentTheme = 'dark';
    },
  },
});

export default themeSlice.reducer;
