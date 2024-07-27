import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PublicLibrary = () => {
  return (
    <View style={styles.container}>
      <Icon name="construction" size={100} />
      <Text>Screen undergoing construction!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PublicLibrary;
