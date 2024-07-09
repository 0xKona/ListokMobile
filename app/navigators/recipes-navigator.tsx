import RecipeEditor from '@app/components/recipe-manager/recipe-editor/recipe-editor';
import RecipeManager from '@app/components/recipe-manager/recipe-manager';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

const RecipesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Your Recipes" component={RecipeManager} />
      <Stack.Screen name="New Recipe" component={RecipeEditor} />
    </Stack.Navigator>
  );
};

export default RecipesNavigator;
