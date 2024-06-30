import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChangeTheme = () => {
  return (
    <View style={styles.container}>
      <Text>Theme Selection</Text>
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
