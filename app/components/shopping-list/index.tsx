import React from 'react';
import { StyleSheet, View } from 'react-native';
import useTheme from '@app/components/hooks/useTheme';
import ListokDropdownSelector from './listok-dropdown-selector';
import ShoppingListComponent from './shopping-list';
import ShoppingOptions from './options';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const ShoppingList = () => {
  
  const theme = useTheme(styles);

  const { ingredients } = useSelector(
    (state: RootState) => state.shoppingManager,
  );
  console.log('State Shopping List: ', ingredients);

  return (
    <View style={theme.container}>
      <ListokDropdownSelector />
      <ShoppingOptions />
      <ShoppingListComponent shoppingIngredients={ingredients} />
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: theme.surface,
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'center',
    },
  });

export default ShoppingList;
