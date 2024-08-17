import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import { recipeManagerApis } from '@app/utils/api-connections/recipe-manager-api';
import { useNavigation } from '@react-navigation/native';
import { openRecipeEditor } from '@redux/slices/recipeEditorSlice';
import { RootState } from '@redux/store';
import { RecipeNavigationProp } from '@typed/navigation';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface PropsType {
  data: any;
  refreshRecipes: () => void;
}

const RecipeCard = ({ data, refreshRecipes }: PropsType) => {
  const navigation = useNavigation<RecipeNavigationProp>();

  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const componentStyles = useTheme(styles);

  const handleDeleteRecipe = () => {
    recipeManagerApis.deleteRecipe(data.id, user?.token);
    refreshRecipes();
  };

  const openRecipe = () => {
    dispatch(openRecipeEditor(data));
    navigation.navigate('New Recipe');
  };

  return (
    <View style={componentStyles.container}>
      <Text>{data.title}</Text>
      <Text>{data.desc}</Text>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row' }}>
        <Button title="Delete Recipe" onPress={() => handleDeleteRecipe()} />
        <Button title="Open Recipe" onPress={openRecipe} />
      </View>
    </View>
  );
};

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: props.surface,
      marginBottom: 2,
      height: 75,
      padding: 10,
    },
  });

export default RecipeCard;
