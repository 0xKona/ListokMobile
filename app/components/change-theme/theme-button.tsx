import { capitaliseWord } from '@app/utils/capitaliseWord';
import {
  setBarbieMode,
  setDarkMode,
  setLightMode,
} from '@redux/slices/themeSlice';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';

interface PropsType {
  theme: string;
}

const ThemeButton = ({ theme }: PropsType) => {
  const dispatch = useDispatch();

  const handlePress = (): void => {
    switch (theme) {
      case 'light':
        dispatch(setLightMode());
        break;
      case 'dark':
        dispatch(setDarkMode());
        break;
      case 'barbie':
        dispatch(setBarbieMode());
        break;
    }
  };

  return (
    <TouchableHighlight style={styles.container} onPress={handlePress}>
      <Text>{capitaliseWord(theme)} Mode</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'lightgrey',
    marginBottom: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ThemeButton;
