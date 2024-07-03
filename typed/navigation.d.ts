import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Home: undefined;
};

export type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Loading'
>;
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export interface SettingType {
  value: string;
  name: string;
  onPress?: () => void;
}

export type SettingsStackParamList = {
  Settings: undefined;
  'Change Theme': undefined;
  'Account Details': undefined;
};

export type SettingsNavigationProp =
  StackNavigationProp<SettingsStackParamList>;

export type SettingsRouteProp = RouteProp<
  SettingsStackParamList,
  'Change Theme'
>;

export type LoadingScreenRouteProp = RouteProp<RootStackParamList, 'Loading'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type MainScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
