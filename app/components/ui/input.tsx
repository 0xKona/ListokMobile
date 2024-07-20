import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

/* TODO LIST

    - Make work with theming
    - Proper Types

*/

interface PropsInterface {
  value: any;
  onChangeText: any;
  onEndEditing?: any;
  type?: 'text' | 'number';
}

const ListokInput = ({
  value,
  onChangeText,
  onEndEditing,
  type,
}: PropsInterface) => {
  return type === 'number' ? (
    <TextInput
      style={ListokInputStyles.default}
      value={value}
      onChangeText={onChangeText}
      onEndEditing={onEndEditing}
      keyboardType="numeric"
    />
  ) : (
    <TextInput
      style={ListokInputStyles.default}
      value={value}
      onChangeText={onChangeText}
      onEndEditing={onEndEditing}
    />
  );
};

export const ListokInputStyles = StyleSheet.create({
  default: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
  },
});

export default ListokInput;
