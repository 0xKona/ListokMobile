import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '@app/components/settings';
import ChangeTheme from '@app/components/change-theme';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Change Theme" component={ChangeTheme} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
