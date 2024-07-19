import { recipeTabs } from '@app/constants/recipe-tabs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RecipeTabs from './recipe-tabs';
import RecipeList from './recipe-list';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { fetchRecipes } from '@redux/slices/recipeManagerSlice';

const RecipeListContainer = () => {
  const [currentTab, setCurrentTab] = useState(recipeTabs[0].value);

  const dispatch = useDispatch<AppDispatch>();

  const { userRecipes, loading } = useSelector(
    (state: RootState) => state.recipeManager,
  );
  console.log('Redux State of Recipes: ', userRecipes);
  const { userId, token } = useSelector((state: RootState) => state.user.user);

  const handlePressTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const refreshRecipes = () => dispatch(fetchRecipes({ userId, token }));

  useEffect(() => {
    refreshRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId]);

  useEffect(() => {
    console.log('Loading Recipes: ', loading);
  }, [loading]);

  return (
    <View style={styles.container}>
      <RecipeTabs currentTab={currentTab} handlePressTab={handlePressTab} />
      <RecipeList refreshRecipes={refreshRecipes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    flexGrow: 1,
    maxHeight: '90%',
  },
});

export default RecipeListContainer;
