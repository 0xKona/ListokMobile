import { navBarIconStyle } from '@app/styles/navBarIcon';
import getUserProfilePicture from '@app/utils/getUserProfilePicture';
import { RootState } from '@redux/store';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NavBarIcon = ({ label, isFocused }: any) => {
  const user = useSelector((state: RootState) => state.user);

  const getIcon = () => {
    switch (label) {
      case 'Recipes':
        return <Text style={navBarIconStyle}>Icon</Text>;
      case 'Listoks':
        return <Text style={navBarIconStyle}>Icon</Text>;
      case 'Shopping':
        return <Text style={navBarIconStyle}>Icon</Text>;
      case 'Public Library':
        return <Text style={navBarIconStyle}>Icon</Text>;
      case 'Settings':
        return getUserProfilePicture(user.user?.picture);
      default:
        return null;
    }
  };

  return <View style={style.container}>{getIcon()}</View>;
};

const style = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
});

export default NavBarIcon;
