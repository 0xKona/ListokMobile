import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyRecipeList = () => {

  const theme = useTheme(styles)

  return (
    <View style={theme.container}>
      <Text>You have no recipes</Text>
      <Text>(pull down to try refreshing)</Text>
    </View>
  );
};

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    // flexGrow: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.surface
  },
});

export default EmptyRecipeList;
