/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShoppingList from '@app/components/shopping-list';
import PublicLibrary from '@app/components/public-library';
import TabNavigation from '@app/components/tab-navigation';
import SettingsNavigator from '@app/navigators/settings-navigator';
import RecipesNavigator from '@app/navigators/recipes-navigator';
import ListoksNavigator from '@app/navigators/listoks-navigator';

const MainScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log('Main Screen User:', user);

  const Tab = createBottomTabNavigator();

  return (
    user.user && (
      <Tab.Navigator tabBar={props => <TabNavigation {...props} />}>
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
        <Tab.Screen name="Shopping" component={ShoppingList} />
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
