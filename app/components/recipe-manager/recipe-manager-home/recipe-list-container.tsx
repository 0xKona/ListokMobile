import { recipeTabs } from '@app/constants/recipe-tabs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RecipeTabs from './recipe-tabs';
import RecipeList from './recipe-list';
import { recipeManagerApis } from '@app/utils/api-connections/recipe-manager';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setUserRecipes } from '@redux/slices/recipeManagerSlice';

const RecipeListContainer = () => {
  const [currentTab, setCurrentTab] = useState(recipeTabs[0].value);
  const { userId, token } = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  const handlePressTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const fetchRecipes = async (setLoadingState?: any) => {
    if (setLoadingState) {
      setLoadingState(true);
    }
    const userRecipes = await recipeManagerApis.getUserRecipes(userId, token);
    dispatch(setUserRecipes(userRecipes));
    if (setLoadingState) {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <RecipeTabs currentTab={currentTab} handlePressTab={handlePressTab} />
      <RecipeList fetchRecipes={fetchRecipes} />
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
