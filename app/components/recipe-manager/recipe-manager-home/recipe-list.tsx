import useTheme from '@app/components/hooks/useTheme';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RecipeCard from './recipe-card';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { RecipeType } from '@typed/recipe-types';
import EmptyRecipeList from './empty-recipe-list';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeType } from '@app/constants/themes';
import { RefreshControl } from 'react-native-gesture-handler';

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
        <Icon name="construction" size={100} color={theme.constructionText.color}/>
        <Text style={theme.constructionText} >{"Imma be real dawg, \n I just haven't had time to do this yet"}</Text>
      </View>
    )
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl 
          refreshing={loading} 
          onRefresh={refreshRecipes} 
          colors={['white', 'white']} 
          tintColor={theme.constructionText.color}
        />
      }
      extraData={loading}
      contentContainerStyle={{ flexGrow: 1 }}
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

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexGrow: 1,
      // backgroundColor: 'orange'
    },
    construction: {
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
      backgroundColor: theme.surface
    },
    constructionText: {
      textAlign: 'center',
      color: theme.surfaceText
    }
  });

export default RecipeList;
