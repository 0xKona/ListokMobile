import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getLinearGradient } from '@app/utils/theme-utils';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import ShoppingList from '@app/components/shopping-list';
import AdditionalItems from '@app/components/shopping-list/additionalItems';
import RegenButton from '@app/components/shopping-list/regenerate-list';
import AdditionalOptions from '@app/components/shopping-list/additional-options';

const Stack = createStackNavigator();

const ShoppingNavigator = () => {
  const { currentTheme } = useSelector((state: RootState) => state.theme);

  return (
    <Stack.Navigator screenOptions={{
      headerBackground: () => getLinearGradient(currentTheme.themeGradient),
      headerTitleStyle: {
        color: currentTheme.themeGradientText, 
      },
      headerTintColor: currentTheme.themeGradientText,
    }}>
      <Stack.Screen 
        name="Shopping List" 
        component={ShoppingList} 
        options={{
            headerLeft: () => <RegenButton />,  // Moved from component to screen options
            headerRight: () => <AdditionalOptions />,  // Moved from component to screen options
          }}
      />
      <Stack.Screen name="Additional Items" component={AdditionalItems} />
    </Stack.Navigator>
  );
};



export default ShoppingNavigator;