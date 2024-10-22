import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PropsType {
    checked: boolean;
    onPress?: () => void
}

const GreenCheckbox = ({ checked, onPress }: PropsType) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.checkbox}>
        {checked ? (
          <Icon name="check-circle" size={30} color="green" />
        ) : (
          <Icon name="checkbox-blank-circle-outline" size={30} color="green" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up 100% of the container
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default GreenCheckbox;