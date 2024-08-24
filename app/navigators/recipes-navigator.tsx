import RecipeEditor from '@app/components/recipe-manager/recipe-editor/recipe-editor';
import RecipeManager from '@app/components/recipe-manager/recipe-manager';
import { getLinearGradient } from '@app/utils/theme-utils';
import { createStackNavigator } from '@react-navigation/stack';
import { RootState } from '@redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const RecipesNavigator = () => {
  const { currentTheme } = useSelector((state: RootState) => state.theme)

  return (
    <Stack.Navigator  
      screenOptions={{
        headerBackground: () => getLinearGradient(currentTheme.themeGradient),
        headerTitleStyle: {
          color: currentTheme.themeGradientText, 
        },
        headerTintColor: currentTheme.themeGradientText,
      }}
    >
      <Stack.Screen name="Your Recipes" component={RecipeManager} />
      <Stack.Screen name="New Recipe" component={RecipeEditor} />
    </Stack.Navigator>
  );
};

export default RecipesNavigator;
