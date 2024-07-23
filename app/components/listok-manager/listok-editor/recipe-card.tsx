import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import { DaysOfWeek, pressOnRecipe } from '@redux/slices/listokEditorSlice';
import { RootState } from '@redux/store';
import { RecipeType } from '@typed/recipe-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface PropsInterface {
  recipe: RecipeType;
  day: string;
}

const ListokSelectionRecipeCard = ({ recipe, day }: PropsInterface) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const { listokData } = useSelector((state: RootState) => state.listokEditor);
  const theme = useTheme(styles);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setIsSelected(
      listokData.days[day as DaysOfWeek].includes(String(recipe.id)),
    );
  }, [listokData, day, recipe.id]);

  //   console.log('RecipeName: ', recipe.title, ' is selected: ', isSelected);
  //   console.log('Listok Data: ', listokData);

  const borderStyle = isSelected
    ? { borderWidth: 3, borderColor: 'darkblue' }
    : {};

  const handlePress = () => {
    dispatch(pressOnRecipe({ day: day, recipeId: String(recipe.id) }));
  };

  return (
    <TouchableOpacity
      style={{ ...theme.container, ...borderStyle }}
      onPress={handlePress}>
      <Text>{recipe.title}</Text>
    </TouchableOpacity>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '45%',
      height: 200,
      backgroundColor: 'orange',
      margin: 10,
    },
  });

export default ListokSelectionRecipeCard;
