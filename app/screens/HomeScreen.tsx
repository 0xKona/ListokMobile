/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PublicLibrary from '@app/components/public-library';
import TabNavigation from '@app/components/tab-navigation';
import SettingsNavigator from '@app/navigators/settings-navigator';
import RecipesNavigator from '@app/navigators/recipes-navigator';
import ListoksNavigator from '@app/navigators/listoks-navigator';
import { getLinearGradient } from '@app/utils/theme-utils';
import ShoppingNavigator from '@app/navigators/shopping-navigator';

const MainScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const { currentTheme } = useSelector((state: RootState) => state.theme)
  console.log('Main Screen User:', user);

  const Tab = createBottomTabNavigator();

  return (
    user.user && (
      <Tab.Navigator tabBar={props => <TabNavigation {...props} />} screenOptions={{
        headerBackground: () => getLinearGradient(currentTheme.themeGradient),
        headerTitleStyle: {
          color: currentTheme.themeGradientText, 
        },
        headerTintColor: currentTheme.themeGradientText,
      }}>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Recipes"
          component={RecipesNavigator}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Listoks"
          component={ListoksNavigator}
        />
        <Tab.Screen 
          name="Shopping" 
          component={ShoppingNavigator} 
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Public Library" component={PublicLibrary} />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={SettingsNavigator}
        />
      </Tab.Navigator>
    )
  );
};

export default MainScreen;
