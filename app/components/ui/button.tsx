import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

interface PropType {
  onPress: () => void;
  text: string;
}

const ListokButton = ({ onPress, text }: PropType): JSX.Element => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={style.container}>
        <Text>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
  },
});

export default ListokButton;
