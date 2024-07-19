import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import { recipeManagerApis } from '@app/utils/api-connections/recipe-manager-api';
import { RootState } from '@redux/store';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

interface PropsType {
  data: any;
  refreshRecipes: () => void;
}

const RecipeCard = ({ data, refreshRecipes }: PropsType) => {
  const { token } = useSelector((state: RootState) => state.user.user);
  const componentStyles = useTheme(styles);
  // console.log('Recipe Data: ', data);

  const handleDeleteRecipe = async () => {
    await recipeManagerApis.deleteRecipe(data.id, token);
    refreshRecipes();
  };

  return (
    <View style={componentStyles.container}>
      <Text>{data.title}</Text>
      <Text>{data.desc}</Text>
      <Button title="Delete Recipe" onPress={handleDeleteRecipe} />
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
