import { recipeTabs } from '@app/constants/recipe-tabs';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RecipeTabs from './recipe-tabs';

const RecipeList = () => {
  const [currentTab, setCurrentTab] = useState(recipeTabs[0].value);

  const handlePressTab = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <View style={styles.container}>
      <RecipeTabs currentTab={currentTab} handlePressTab={handlePressTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
  },
});

export default RecipeList;
