import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from '../../ui/search';
import ListokButton from '../../ui/button';
import useTheme from '../../hooks/useTheme';
import { ThemeType } from '@app/constants/themes';

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

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      height: 60,
      backgroundColor: props.surface,
      padding: 10,
    },
  });

export default RecipeHeader;
