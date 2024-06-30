import { RootState } from '@redux/store';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '@redux/slices/themeSlice';

const ChangeTheme = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  console.log('current theme: ', theme);

  const handleSetDarkMode = () => {
    dispatch(setDarkMode());
  };

  return (
    <View style={styles.container}>
      <Text>Theme Selection</Text>
      <Button title="setDakMode" onPress={handleSetDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
  },
});

export default ChangeTheme;
