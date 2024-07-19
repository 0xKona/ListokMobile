import useTheme from '@app/components/hooks/useTheme';
// import { ThemeType } from '@app/constants/themes';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecipeCard from './recipe-card';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { RecipeType } from '@typed/recipe-types';

interface PropsType {
  fetchRecipes: (setLoadingState?: any) => void;
}

const RecipeList = ({ fetchRecipes }: PropsType) => {
  const [reLoading, setReLoading] = React.useState<boolean>(false);

  const componentStyle = useTheme(styles);
  const { userRecipes } = useSelector(
    (state: RootState) => state.recipeManager,
  );

  return (
    <FlatList
      refreshing={reLoading}
      onRefresh={() => fetchRecipes(setReLoading)}
      style={componentStyle.container}
      data={userRecipes}
      renderItem={({ item }) => <RecipeCard data={item} />}
      keyExtractor={(recipe: RecipeType) => String(recipe.id)}
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
