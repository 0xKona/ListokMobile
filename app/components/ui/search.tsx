import { ThemeType } from '@app/constants/themes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/useTheme';

const SearchBar = () => {
  const componentStyle = useTheme(styles);
  return (
    <View style={componentStyle.container}>
      <Text style={componentStyle.text}>SearchBar</Text>
    </View>
  );
};

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 10,
      justifyContent: 'center',
      backgroundColor: props.background,
    },
    text: {
      color: props.backgroundText,
    },
  });

export default SearchBar;
