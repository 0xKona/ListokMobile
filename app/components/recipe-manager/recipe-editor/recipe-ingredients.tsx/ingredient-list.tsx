import useTheme from '@app/components/hooks/useTheme';
import { actionSheet } from '@app/components/ui/action-sheet';
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
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

interface PropsInterface {
  ingredients: IngredientType[];
}

const IngredientList = ({ ingredients }: PropsInterface) => {
  const theme = useTheme(styles);
  const dispatch = useDispatch();

  const swipeableRef = React.useRef<any>(null);
  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }

  const handleDelete = (indexToDelete: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(indexToDelete, 1);
    console.log('New Ingredients: ', newIngredients);
    dispatch(updateRecipeIngredients(newIngredients));
  };

  const handlePressDelete = (index: number) => {
    const actions = [{actionName: 'Delete Ingredient', actionFunction: () => {handleDelete(index); closeSwipeable()}}]
    actionSheet(actions, 1, closeSwipeable)
  }

  const renderDelete = (index: number) => (
    <TouchableOpacity onPress={() => handlePressDelete(index)} style={theme.delete}>
      <Icon name="delete" size={20} color={'white'}/>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={theme.container}>
      {ingredients.map((ingredient: IngredientType, index: number) => (
        <Swipeable ref={swipeableRef} renderRightActions={() => renderDelete(index)} overshootRight={false}>
          <View style={[theme.listItem, theme.shadowProp]} key={ingredient.name}>
            <Text>{ingredient.name}</Text>
            <Text>{`${ingredient.amount} ${ingredient.measurement}`}</Text>
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
      backgroundColor: 'red',
      borderRadius: 5
    },
    listItem: {
      // TODO Adjust theming
      backgroundColor: theme.surface,
      shadowRadius: 1,
      width: '100%',
      height: 50,
      padding: 10,
      marginBottom: 5,
      borderColor: theme.buttonPrimaryBackground,
      borderWidth: 1,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
  });

export default IngredientList;
