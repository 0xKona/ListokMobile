export interface ThemeType {
  themeName: string;
  surface: string;
  surfaceText: string;
  background: string;
  backgroundText: string;
  buttonPrimaryBackground: string;
  buttonPrimaryText: string;
  themeGradient: string[]
  themeGradientText: string;
}

export interface ThemeColorsType {
  light: ThemeType;
  dark: ThemeType;
  barbie: ThemeType;
}

export const themeGradient = {
  light: [
    'hsl(199, 100%, 49%)',  
    'hsl(201, 98%, 65%)',   
    'hsl(199, 100%, 74%)', 
  ],
  dark: [
    'hsl(270, 100%, 7%)',
    'hsl(249, 94%, 15%)',
    'hsl(238, 100%, 19%)',
    'hsl(210, 100%, 17%)',
    'hsl(190, 100%, 14%)',
  ],
  barbie: [
    'hsl(305, 100%, 35%)',
    'hsl(310, 86%, 39%)',
    'hsl(315, 75%, 43%)',
    'hsl(320, 64%, 48%)',
    'hsl(325, 60%, 52%)',
    'hsl(330, 62%, 57%)',
    'hsl(335, 64%, 62%)',
    'hsl(340, 67%, 67%)',
    'hsl(345, 70%, 73%)',
    'hsl(350, 75%, 78%)',
    'hsl(355, 83%, 84%)',
    'hsl(0, 100%, 90%)',
  ]
};

export const themeColors: ThemeColorsType = {
  light: {
    themeName: 'light',
    surface: 'white',
    surfaceText: 'black',
    background: 'darkgrey',
    backgroundText: 'black',
    buttonPrimaryBackground: '#4CA8F4',
    buttonPrimaryText: 'white',
    themeGradient: themeGradient.light,
    themeGradientText: 'white',
  },
  dark: {
    themeName: 'dark',
    surface: 'darkgrey',
    surfaceText: 'white',
    background: 'black',
    backgroundText: 'white',
    buttonPrimaryBackground: 'white',
    buttonPrimaryText: 'black',
    themeGradient: themeGradient.dark,
    themeGradientText: 'white'
  },
  barbie: {
    themeName: 'barbie',
    surface: '#E0218A',
    surfaceText: 'white',
    background: 'white',
    backgroundText: 'black',
    buttonPrimaryBackground: '#E0218A',
    buttonPrimaryText: 'white',
    themeGradient: themeGradient.barbie,
    themeGradientText: 'white'
  },
};


