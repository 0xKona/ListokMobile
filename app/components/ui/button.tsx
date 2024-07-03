import { ThemeType } from '@app/constants/themes';
import { RootState } from '@redux/store';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

interface PropType {
  onPress: () => void;
  text: string;
  propStyles?: any;
}

const ListokButton = ({ onPress, text, propStyles }: PropType): JSX.Element => {
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const defaultStyles = styles(currentTheme);
  const style = propStyles ? { ...defaultStyles, propStyles } : defaultStyles;

  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <Text style={styles(currentTheme).text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      height: 50,
      width: '100%',
      backgroundColor: props.buttonPrimaryBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: props.buttonPrimaryText,
    },
  });

export default ListokButton;
