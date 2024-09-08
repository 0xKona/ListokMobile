import React from 'react';
import { StyleSheet, View } from 'react-native';
import RecipeListContainer from './recipe-manager-home/recipe-list-container';
import { ThemeType } from '@app/constants/themes';
import useTheme from '../hooks/useTheme';

const RecipeManager = () => {
  const theme = useTheme(styles)

  return (
    <View style={theme.container}>
      <RecipeListContainer />
    </View>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 10,
      flexGrow: 1,
      backgroundColor: theme.background
    },
  });

export default RecipeManager;
