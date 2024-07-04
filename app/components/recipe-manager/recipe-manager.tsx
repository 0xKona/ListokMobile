import React from 'react';
import { StyleSheet, View } from 'react-native';
import RecipeHeader from './recipe-manager-home/recipe-manager-header';
// import { useSelector } from 'react-redux';
// import { RootState } from '@redux/store';
import RecipeList from './recipe-manager-home/recipe-list';

const RecipeManager = () => {
  // const { currentTheme } = useSelector((state: RootState) => state.theme);
  const componentStyle = styles();

  return (
    <View style={componentStyle.container}>
      <RecipeHeader />
      <RecipeList />
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      margin: 10,
      paddingHorizontal: 10,
      flexGrow: 1,
    },
  });

export default RecipeManager;
