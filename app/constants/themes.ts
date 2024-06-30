export interface ThemeType {
  themeName: string;
  surface: string;
  surfaceText: string;
  background: string;
  backgroundText: string;
}

export interface ThemeColorsType {
  light: ThemeType;
  dark: ThemeType;
  barbie: ThemeType;
}

export const themeColors: ThemeColorsType = {
  light: {
    themeName: 'light',
    surface: 'white',
    surfaceText: 'black',
    background: 'darkgrey',
    backgroundText: 'black',
  },
  dark: {
    themeName: 'dark',
    surface: 'darkgrey',
    surfaceText: 'white',
    background: 'black',
    backgroundText: 'white',
  },
  barbie: {
    themeName: 'barbie',
    surface: 'pink',
    surfaceText: 'white',
    background: 'white',
    backgroundText: 'black',
  },
};
