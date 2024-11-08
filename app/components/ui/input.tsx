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
  error?: boolean;
  textColor?: string;
}

const ListokInput = ({
  inputName,
  value,
  onChangeText,
  onEndEditing,
  type,
  multiline = false,
  backgroundColor,
  error,
  textColor
}: PropsInterface) => {
  const theme = useTheme(styles)

  return (
    <TextInput
      label={inputName}
      outlineColor={error ? 'red': undefined}
      style={theme.default}
      value={value}
      onChangeText={onChangeText}
      onEndEditing={onEndEditing}
      mode='outlined'
      textColor={textColor}
      theme={{ colors : { primary: error ? theme.outlineError.color : theme.outline.color, background: backgroundColor}}}
      keyboardType={type === 'number' ? 'numeric' : 'default'}
      multiline={multiline}
    />
  )
};

export const styles = (theme: ThemeType) => StyleSheet.create({
  default: {
    width: '100%',
    maxHeight: 100,
  },
  outline: {
    color: theme.highlight
  },
  outlineError: {
    color: 'red'
  }
});

export default ListokInput;
