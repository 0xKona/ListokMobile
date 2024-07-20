import { ThemeType } from '@app/constants/themes';

export type StyleType = (theme: ThemeType) => { [key: string]: any };
