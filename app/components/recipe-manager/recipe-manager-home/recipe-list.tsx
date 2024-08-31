import useTheme from '@app/components/hooks/useTheme';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RecipeCard from './recipe-card';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { RecipeType } from '@typed/recipe-types';
import EmptyRecipeList from './empty-recipe-list';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PropsType {
  currentTab: string;
  refreshRecipes: () => void;
}

const RecipeList = ({ currentTab, refreshRecipes }: PropsType) => {
  const theme = useTheme(styles);
  const { userRecipes, loading } = useSelector(
    (state: RootState) => state.recipeManager,
  );

  // TODO : Implement favorites
  if (currentTab === 'favorites') {
    return (
      <View style={theme.construction}>
        <Icon name="construction" size={100} />
        <Text style={theme.constructionText} >{"Imma be real dawg, \n I just haven't had time to do this yet"}</Text>
      </View>
    )
  }

  return (
    <FlatList
      refreshing={loading}
      onRefresh={refreshRecipes}
      extraData={loading}
      style={theme.container}
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
    construction: {
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
      backgroundColor: 'white'
    },
    constructionText: {
      textAlign: 'center'
    }
  });

export default RecipeList;
