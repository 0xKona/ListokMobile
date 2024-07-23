import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyListokList = () => {
  return (
    <View style={styles.container}>
      <Text>You have no Listoks!</Text>
      <Text>(pull down to try refreshing)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmptyListokList;
