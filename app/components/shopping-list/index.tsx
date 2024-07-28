import React from 'react';
import { StyleSheet, View } from 'react-native';
import useTheme from '@app/components/hooks/useTheme';
import ListokDropdownSelector from './listok-dropdown-selector';
import ShoppingListComponent from './shopping-list';
import ShoppingOptions from './options';

const ShoppingList = () => {
  const theme = useTheme(styles);

  return (
    <View style={theme.container}>
      <ListokDropdownSelector />
      <ShoppingOptions />
      <ShoppingListComponent />
    </View>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      // backgroundColor: theme.surface,
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'center',
    },
  });

export default ShoppingList;
