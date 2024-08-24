import ListokManager from '@app/components/listok-manager/listok-manager';
import ListokEditor from '@app/components/listok-manager/listok-editor/listok-editor';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ListokRecipeSelector from '@app/components/listok-manager/listok-editor/recipe-selector';
import { getLinearGradient } from '@app/utils/theme-utils';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const Stack = createStackNavigator();

const ListoksNavigator = () => {
  const { currentTheme } = useSelector((state: RootState) => state.theme);

  return (
    <Stack.Navigator screenOptions={{
      headerBackground: () => getLinearGradient(currentTheme.themeGradient),
      headerTitleStyle: {
        color: currentTheme.themeGradientText,
      },
      headerTintColor: currentTheme.themeGradientText,
    }}>
      <Stack.Screen name="Your Listoks" component={ListokManager} />
      <Stack.Screen name="New Listok" component={ListokEditor} />
      <Stack.Screen name="Listok Editor" component={ListokEditor} />
      <Stack.Screen name="Select Recipes" component={ListokRecipeSelector} />
    </Stack.Navigator>
  );
};

export default ListoksNavigator;
