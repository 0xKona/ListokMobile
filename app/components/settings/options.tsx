import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import OptionCard from './option-card';
import { SettingType } from '@typed/settings';
import { useNavigation } from '@react-navigation/native';
import { SettingsNavigationProp } from '@typed/navigation';

const SettingOptions = () => {
  const navigation = useNavigation<SettingsNavigationProp>();

  const settingsList: SettingType[] = [
    {
      value: 'theme',
      name: 'Change Theme',
      onPress: () => navigation.navigate('Change Theme'),
    },
    {
      value: 'accountDetails',
      name: 'Account Details',
      onPress: () => navigation.navigate('Account Details'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {settingsList.map(setting => (
        <OptionCard key={setting.value} settingObj={setting} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
});

export default SettingOptions;
