import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useTheme from '../hooks/useTheme';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ShoppingListComponent = ({ shoppingIngredients }: any) => {
  const theme = useTheme(styles);

  return (
    <View style={theme.container}>
      <Text>List!</Text>
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.surface,
      flexGrow: 1,
      borderRadius: 5,
      padding: 10,
    },
  });

export default ShoppingListComponent;

//   const categories: CategoryType[] = [
//     'fruit',
//     'vegetable',
//     'meat',
//     'fish',
//     'ambient',
//     'frozen',
//     'bakery',
//     'confectionary',
//     'other',
//   ];
