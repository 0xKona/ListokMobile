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

export type LoadingScreenRouteProp = RouteProp<RootStackParamList, 'Loading'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type MainScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
