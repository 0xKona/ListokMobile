import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface SettingType {
  value: string;
  name: string;
  onPress?: () => void;
}

export type SettingsStackParamList = {
  Settings: undefined;
  'Change Theme': undefined;
};

export type SettingsNavigationProp =
  StackNavigationProp<SettingsStackParamList>;
export type SettingsRouteProp = RouteProp<
  SettingsStackParamList,
  'Change Theme'
>;
