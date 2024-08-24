import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '@app/components/settings';
import ChangeTheme from '@app/components/settings/change-theme';
import AccountDetails from '@app/components/settings/account-details/account-details';
import { getLinearGradient } from '@app/utils/theme-utils';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  const { currentTheme } = useSelector((state: RootState) => state.theme);

  return (
    <Stack.Navigator screenOptions={{
      headerBackground: () => getLinearGradient(currentTheme.themeGradient),
      headerTitleStyle: {
        color: currentTheme.themeGradientText, 
      },
      headerTintColor: currentTheme.themeGradientText,
    }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Change Theme" component={ChangeTheme} />
      <Stack.Screen name="Account Details" component={AccountDetails} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
