import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { themeColors } from '@app/constants/themes';
import ThemeButton from './theme-button';

const ChangeTheme = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Theme Selection</Text>
      {Object.keys(themeColors).map((theme: string) => (
        <ThemeButton key={theme} theme={theme} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ChangeTheme;
