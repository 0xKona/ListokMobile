import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from '../ui/search';
import ListokButton from '../ui/button';
import useTheme from '../hooks/useTheme';

const RecipeHeader = () => {
  const componentStyles = useTheme(styles);

  return (
    <View style={componentStyles.container}>
      <SearchBar />
      <ListokButton
        onPress={() => {}}
        text="New Recipe"
        propStyles={{ width: '30%', height: '100%' }}
      />
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
    },
  });

export default RecipeHeader;
