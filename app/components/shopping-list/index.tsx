import React from 'react';
import { StyleSheet, View } from 'react-native';
import useTheme from '@app/components/hooks/useTheme';
import ListokDropdownSelector from './listok-dropdown-selector';
import ShoppingListComponent from './shopping-list';
import ShoppingOptions from './options';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useNavigation } from '@react-navigation/native';
import RegenButton from './regenerate-list';

const ShoppingList = () => {
  const theme = useTheme(styles);
  const navigation = useNavigation();
  navigation.setOptions({headerRight: () => <RegenButton />});

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
