/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecipeManager from '@app/components/recipe-manager';
import ListokManager from '@app/components/listok-manager';
import ShoppingList from '@app/components/shopping-list';
import PublicLibrary from '@app/components/public-library';
import Settings from '@app/components/settings';
import TabNavigation from '@app/components/tab-navigation';

const MainScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log('Main Screen User:', user);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator tabBar={props => <TabNavigation {...props} />}>
      <Tab.Screen name="Recipes" component={RecipeManager} />
      <Tab.Screen name="Listoks" component={ListokManager} />
      <Tab.Screen name="Shopping" component={ShoppingList} />
      <Tab.Screen name="Public Library" component={PublicLibrary} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default MainScreen;
