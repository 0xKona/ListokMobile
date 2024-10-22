import useTheme from '@app/components/hooks/useTheme';
import GreenCheckbox from '@app/components/ui/checkbox';
import { ThemeType } from '@app/constants/themes';
import { DaysOfWeek, pressOnRecipe } from '@redux/slices/listokEditorSlice';
import { RootState } from '@redux/store';
import { RecipeType } from '@typed/recipe-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      <View style={{ height: '70%'}}>
        {/* @ts-ignore */}
        <Image source={{uri: recipe.picture}} width={'100%'} height={'100%'} style={theme.image}/>
      </View>
      <View style={theme.detailsContainer} >
        <View style={{ height: '100%' , flexGrow: 1}}>
          <Text style={theme.text}>{recipe.title}</Text>
          <Text style={theme.textDesc}>{recipe.desc}</Text>
        </View>
        <View>
          <GreenCheckbox checked={isSelected} onPress={handlePress} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '45%',
      height: 200,
      backgroundColor: theme.surface,
      margin: 10,
      borderRadius: 10
    },
    text: {
      color: theme.surfaceText,
      fontWeight: 'bold'
    },
    textDesc: {
      color: theme.surfaceText,

    },
    image: {
      borderTopLeftRadius: 5, 
      borderTopRightRadius: 5
    },
    detailsContainer: { 
      height: '30%', 
      padding: 5, 
      flexDirection: 'row'
    }
  });

export default ListokSelectionRecipeCard;
