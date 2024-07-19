import useTheme from '@app/components/hooks/useTheme';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecipeCard from './recipe-card';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { RecipeType } from '@typed/recipe-types';
import EmptyRecipeList from './empty-recipe-list';

interface PropsType {
  refreshRecipes: () => void;
}

const RecipeList = ({ refreshRecipes }: PropsType) => {
  const componentStyle = useTheme(styles);
  const { userRecipes, loading } = useSelector(
    (state: RootState) => state.recipeManager,
  );

  return (
    <FlatList
      refreshing={loading}
      onRefresh={refreshRecipes}
      extraData={loading}
      style={componentStyle.container}
      data={userRecipes}
      renderItem={({ item }) => (
        <RecipeCard data={item} refreshRecipes={refreshRecipes} />
      )}
      keyExtractor={(recipe: RecipeType) => String(recipe.id)}
      ListEmptyComponent={<EmptyRecipeList />}
    />
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
  });

export default RecipeList;
