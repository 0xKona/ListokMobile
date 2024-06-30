import { ThemeType, themeColors } from '@app/constants/themes';
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  currentTheme: ThemeType;
}

const initialState: ThemeState = {
  currentTheme: themeColors.light,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLightMode(state) {
      state.currentTheme = themeColors.light;
    },
    setDarkMode(state) {
      state.currentTheme = themeColors.dark;
    },
    setBarbieMode(state) {
      state.currentTheme = themeColors.barbie;
    },
  },
});

export const { setLightMode, setDarkMode, setBarbieMode } = themeSlice.actions;
export default themeSlice.reducer;
