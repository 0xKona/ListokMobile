import { SettingType } from '@app/types/settings';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

interface PropsType {
  settingObj: SettingType;
  onPress?: () => void;
}

const OptionCard = ({ settingObj }: PropsType) => {
  return (
    <TouchableHighlight onPress={settingObj.onPress}>
      <View style={styles.container}>
        <Text>{settingObj.name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    marginBottom: 2,
    justifyContent: 'center',
    padding: 10,
  },
});

export default OptionCard;
