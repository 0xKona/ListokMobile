import useTheme from '@app/components/hooks/useTheme';
// import { ThemeType } from '@app/constants/themes';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecipeCard from './recipe-card';

interface PropsType {
  recipes: any;
}

const RecipeList = ({ recipes }: PropsType) => {
  const componentStyle = useTheme(styles);

  return (
    <FlatList
      style={componentStyle.container}
      data={recipes}
      renderItem={({ item }) => <RecipeCard data={item} />}
      keyExtractor={recipe => recipe.id}
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
