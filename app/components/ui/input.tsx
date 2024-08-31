import React from 'react';
import { StyleSheet } from 'react-native';
import useTheme from '../hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import { TextInput } from 'react-native-paper';

/* TODO LIST

    - Make work with theming
    - Proper Types

*/

interface PropsInterface {
  inputName: string;
  value: any;
  onChangeText: any;
  onEndEditing?: any;
  type?: 'text' | 'number';
  multiline?: boolean;
  backgroundColor?: string
}

const ListokInput = ({
  inputName,
  value,
  onChangeText,
  onEndEditing,
  type,
  multiline = false,
  backgroundColor
}: PropsInterface) => {
  const theme = useTheme(styles)

  return (
    <TextInput
      label={inputName}
      style={theme.default}
      value={value}
      onChangeText={onChangeText}
      onEndEditing={onEndEditing}
      mode='outlined'
      theme={{ colors : { primary: theme.outline.color, text: '', placeholder: '', background: backgroundColor}}}
      keyboardType={type === 'number' ? 'numeric' : 'default'}
      multiline={multiline}
    />
  )
};

export const styles = (theme: ThemeType) => StyleSheet.create({
  default: {
    width: '100%',
    maxHeight: 100
  },
  outline: {
    color: theme.buttonPrimaryBackground
  },
});

export default ListokInput;
