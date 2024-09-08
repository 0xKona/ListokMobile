import { recipeTabs } from '@app/constants/recipe-tabs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RecipeTabs from './recipe-tabs';
import RecipeList from './recipe-list';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { fetchRecipes } from '@redux/slices/recipeManagerSlice';
import { useIsFocused } from '@react-navigation/native';

const RecipeListContainer = () => {
  const isFocused = useIsFocused();
  const [currentTab, setCurrentTab] = useState<string>(recipeTabs[0].value);

  const dispatch = useDispatch<AppDispatch>();
  
  const { user } = useSelector((state: RootState) => state.user);

  const handlePressTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const refreshRecipes = () => {
    console.log('Refresh Recipes Called');
    dispatch(fetchRecipes({ userId: user?.userId, token: user?.token }));
  };

  useEffect(() => {
    refreshRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token, user?.userId, isFocused]);

  return (
    <View style={styles.container}>
      <RecipeTabs currentTab={currentTab} handlePressTab={handlePressTab} />
      <RecipeList currentTab={currentTab} refreshRecipes={refreshRecipes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    flexGrow: 1,
    height: '99%'
  },
});

export default RecipeListContainer;
