import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import { updateRecipeIngredients } from '@redux/slices/recipeEditorSlice';
import { IngredientType } from '@typed/recipe-types';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

interface PropsInterface {
  ingredients: IngredientType[];
}

const IngredientList = ({ ingredients }: PropsInterface) => {
  const theme = useTheme(styles);
  const dispatch = useDispatch();

  const handleDelete = (indexToDelete: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(indexToDelete, 1);
    console.log('New Ingredients: ', newIngredients);
    dispatch(updateRecipeIngredients(newIngredients));
  };

  const renderDelete = (index: number) => (
    <TouchableOpacity onPress={() => handleDelete(index)} style={theme.delete}>
      <Icon name="delete" size={20} />
    </TouchableOpacity>
  );
  return (
    <ScrollView style={theme.container}>
      {ingredients.map((ingredient: IngredientType, index: number) => (
        <Swipeable renderRightActions={() => renderDelete(index)}>
          <View style={theme.listItem} key={ingredient.name}>
            <Text>{ingredient.name}</Text>
          </View>
        </Swipeable>
      ))}
    </ScrollView>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexGrow: 1,
    },
    delete: {
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listItem: {
      // TODO Adjust theming
      backgroundColor: 'lightgrey',
      width: '100%',
      height: 50,
      padding: 10,
      marginBottom: 5,
    },
  });

export default IngredientList;
