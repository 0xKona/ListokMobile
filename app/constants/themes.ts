export interface ThemeType {
  themeName: string;
  surface: string;
  surfaceText: string;
  background: string;
  backgroundText: string;
  buttonPrimaryBackground: string;
  buttonPrimaryText: string;
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
    buttonPrimaryBackground: 'black',
    buttonPrimaryText: 'white',
  },
  dark: {
    themeName: 'dark',
    surface: 'darkgrey',
    surfaceText: 'white',
    background: 'black',
    backgroundText: 'white',
    buttonPrimaryBackground: 'white',
    buttonPrimaryText: 'black',
  },
  barbie: {
    themeName: 'barbie',
    surface: 'pink',
    surfaceText: 'white',
    background: 'white',
    backgroundText: 'black',
    buttonPrimaryBackground: 'pink',
    buttonPrimaryText: 'white',
  },
};
