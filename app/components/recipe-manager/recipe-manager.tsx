import React from 'react';
import { StyleSheet, View } from 'react-native';
import RecipeHeader from './recipe-header-manager';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { ThemeType } from '@app/constants/themes';

const RecipeManager = () => {
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const componentStyle = styles(currentTheme);

  return (
    <View style={componentStyle.container}>
      <RecipeHeader />
    </View>
  );
};

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      paddingHorizontal: 10,
      height: 60,
      backgroundColor: props.surface,
    },
  });

export default RecipeManager;
