import React from 'react';
import { StyleSheet, View } from 'react-native';
import LogoutButton from '../ui/logout-button';
import ProfileOverview from './profile-overview';
import SettingOptions from './options';

const Settings = () => {
  return (
    <View style={style.container}>
      <ProfileOverview />
      <SettingOptions />
      <LogoutButton />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});

export default Settings;
