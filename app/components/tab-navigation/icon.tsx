import getUserProfilePicture from '@app/utils/getUserProfilePicture';
import { RootState } from '@redux/store';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NavBarIcon = ({ label, isFocused }: any) => {
  const user = useSelector((state: RootState) => state.user);

  const getIcon = () => {
    switch (label) {
      case 'Recipes':
        return <Icon name="bowl-mix-outline" size={30} />;
      case 'Listoks':
        return <Icon name="book-outline" size={30} />;
      case 'Shopping':
        return <Icon name="shopping-outline" size={30} />;
      case 'Public Library':
        return <Icon name="book-open-page-variant-outline" size={30} />;
      case 'Profile':
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
