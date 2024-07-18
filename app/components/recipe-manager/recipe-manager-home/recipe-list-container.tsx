import { recipeTabs } from '@app/constants/recipe-tabs';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RecipeTabs from './recipe-tabs';
import RecipeList from './recipe-list';
import { testRecipes } from '@app/constants/test-data';

const RecipeListContainer = () => {
  const [currentTab, setCurrentTab] = useState(recipeTabs[0].value);

  const handlePressTab = (tab: string) => {
    setCurrentTab(tab);
  };

  // TO DO API-CALL TO GET RECIPE'S

  return (
    <View style={styles.container}>
      <RecipeTabs currentTab={currentTab} handlePressTab={handlePressTab} />
      <RecipeList recipes={testRecipes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    flexGrow: 1,
  },
});

export default RecipeListContainer;
