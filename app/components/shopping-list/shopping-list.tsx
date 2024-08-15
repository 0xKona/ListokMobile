import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import useTheme from '../hooks/useTheme';
import { useDispatch } from 'react-redux';
import { toggleCheckedIngredient } from '@redux/slices/shoppingManagerSlice';
import { IngredientType } from '@typed/recipe-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ShoppingListComponent = ({
  shoppingIngredients,
}: {
  shoppingIngredients: IngredientType[];
}) => {
  const theme = useTheme(styles);
  const dispatch = useDispatch();

  console.log('Ingredients in Shopping List: ', shoppingIngredients);

  // Toggle the checked state of an ingredient using its unique ID
  const handleToggleChecked = (ingredientId: string | undefined) => {
    if (ingredientId) {
      dispatch(toggleCheckedIngredient(ingredientId));
    }
  };

  return (
    <View style={theme.container}>
      <FlatList
        data={shoppingIngredients}
        keyExtractor={item => item.id as string} // Use the unique ID as the key
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleToggleChecked(item.id)}>
            <View style={theme.card}>
              <View style={theme.iconContainer}>
                <MaterialCommunityIcons
                  name={
                    item.checked
                      ? 'checkbox-marked-circle-outline'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={24}
                  // color={
                  //   item.checked
                  //     ? theme.colors.primary
                  //     : theme.colors.textSecondary
                  // }
                />
              </View>
              <View style={theme.textContainer}>
                <Text style={theme.nameText}>{item.name}</Text>
                <Text style={theme.detailsText}>
                  {item.amount} {item.measurement}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
      borderRadius: 8,
      backgroundColor: theme.cardBackground,
      elevation: 2,
    },
    iconContainer: {
      marginRight: 15,
    },
    textContainer: {
      flex: 1,
    },
    nameText: {
      fontSize: 16,
      fontWeight: 'bold',
      // color: theme.colors.textPrimary,
    },
    detailsText: {
      fontSize: 14,
      // color: theme.colors.textSecondary,
    },
  });

export default ShoppingListComponent;
