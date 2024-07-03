import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '@app/components/settings';
import ChangeTheme from '@app/components/settings/change-theme';
import AccountDetails from '@app/components/settings/account-details/account-details';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Change Theme" component={ChangeTheme} />
      <Stack.Screen name="Account Details" component={AccountDetails} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
