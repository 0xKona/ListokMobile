import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import ListokButton from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { generateShoppingList } from '@redux/slices/shoppingManagerSlice';

const ShoppingOptions = () => {
  const theme = useTheme(styles);

  const { token } = useSelector((state: RootState) => state.user.user);
  const { selectedListok } = useSelector(
    (state: RootState) => state.shoppingManager,
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log('Selected Listok to re-generate shopping list: ', selectedListok);

  const regenerate = () => {
    dispatch(generateShoppingList({ listokId: selectedListok, token: token }));
  };

  return (
    <View style={theme.container}>
      <Text>Options Here</Text>
      {/* <ListokButton
        text="Additional Items"
        onPress={regenerate}
        // eslint-disable-next-line react-native/no-inline-styles
        propStyles={{ width: 130, height: 40, marginLeft: 'auto' }}
      /> */}
    </View>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      flexDirection: 'row',
    },
  });

export default ShoppingOptions;
