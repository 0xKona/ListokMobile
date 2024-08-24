export interface ThemeType {
  themeName: string;
  surface: string;
  surfaceText: string;
  background: string;
  backgroundText: string;
  buttonPrimaryBackground: string;
  buttonPrimaryText: string;
  themeGradient: string[]
}

export interface ThemeColorsType {
  light: ThemeType;
  dark: ThemeType;
  barbie: ThemeType;
}

export const themeGradient = {
  light: [
    'hsl(240, 100%, 89%)',
    'hsl(232, 97%, 87%)',
    'hsl(225, 93%, 84%)',
    'hsl(220, 90%, 81%)',
    'hsl(215, 87%, 79%)',
    'hsl(211, 83%, 75%)',
    'hsl(208, 80%, 72%)',
    'hsl(204, 77%, 69%)',
    'hsl(201, 74%, 65%)',
    'hsl(199, 71%, 62%)',
    'hsl(196, 68%, 58%)',
    'hsl(194, 66%, 54%)',
    'hsl(191, 66%, 49%)',
    'hsl(189, 79%, 44%)',
    'hsl(186, 100%, 38%)',
    'hsl(185, 100%, 36%)',
    'hsl(183, 100%, 34%)',
    'hsl(181, 100%, 32%)',
    'hsl(179, 100%, 31%)',
    'hsl(176, 100%, 31%)',
    'hsl(174, 100%, 30%)',
    'hsl(171, 100%, 29%)',
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
    themeGradient: themeGradient.light
  },
  dark: {
    themeName: 'dark',
    surface: 'darkgrey',
    surfaceText: 'white',
    background: 'black',
    backgroundText: 'white',
    buttonPrimaryBackground: 'white',
    buttonPrimaryText: 'black',
    themeGradient: themeGradient.dark
  },
  barbie: {
    themeName: 'barbie',
    surface: 'pink',
    surfaceText: 'white',
    background: 'white',
    backgroundText: 'black',
    buttonPrimaryBackground: 'pink',
    buttonPrimaryText: 'white',
    themeGradient: themeGradient.barbie
  },
};


