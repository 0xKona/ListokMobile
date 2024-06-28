import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import NavBarIcon from './icon';

const Tab = ({ props }: any) => {
  const { label, isFocused, options, onPress, onLongPress } = props;
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={style.container}>
      <NavBarIcon label={label} isFocused={isFocused} />
      <Text style={isFocused ? style.textIsFocused : style.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: '20%',
    marginTop: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    color: '#222',
  },
  textIsFocused: {
    fontSize: 10,
    color: '#673ab7',
  },
});

export default Tab;
