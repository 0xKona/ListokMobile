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

export type RecipeStackParamList = {
  'Your Recipes': undefined;
  'New Recipe': undefined;
};
export type RecipeNavigationProp = StackNavigationProp<RecipeStackParamList>;
export type RecipeRouteProp = RouteProp<RecipeStackParamList, 'Your Recipes'>;

export type ListokStackParamList = {
  'Your Listoks': undefined;
  'New Listok': undefined;
  'Listok Editor': undefined;
  'Select Recipes': undefined;
};
export type ListokNavigationProp = StackNavigationProp<ListokStackParamList>;
export type ListokRouteProp = RouteProp<ListokStackParamList, 'Your Listoks'>;

export type ShoppingStackParamList = {
  'Shopping List': undefined;
  'Additional Items': undefined;
};
export type ShoppingNavigationProp = StackNavigationProp<ShoppingStackParamList>;
export type ShoppingRouteProp = RouteProp<ShoppingStackParamList, 'Shopping List'>;

export type LoadingScreenRouteProp = RouteProp<RootStackParamList, 'Loading'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type MainScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
