import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import NavBarIcon from './icon';
import { ThemeType } from '@app/constants/themes';
import useTheme from '../hooks/useTheme';

const Tab = ({ props }: any) => {
  const { label, isFocused, options, onPress, onLongPress } = props;
  const theme = useTheme(styles)

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={theme.container}>
      <NavBarIcon label={label} isFocused={isFocused} />
      <Text style={isFocused ? theme.textIsFocused : theme.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    width: '20%',
    marginTop: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    color: theme.surfaceText,
  },
  textIsFocused: {
    fontSize: 10,
    color: theme.surfaceText,
  },
});

export default Tab;
