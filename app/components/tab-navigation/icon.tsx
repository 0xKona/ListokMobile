import { ThemeType } from '@app/constants/themes';
import getUserProfilePicture from '@app/utils/getUserProfilePicture';
import { RootState } from '@redux/store';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import useTheme from '../hooks/useTheme';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NavBarIcon = ({ label, isFocused }: any) => {
  const user = useSelector((state: RootState) => state.user);
  const theme = useTheme(styles)

  const getIcon = () => {
    switch (label) {
      case 'Recipes':
        return <Icon name="bowl-mix-outline" size={30} color={theme.icon.color}/>;
      case 'Listoks':
        return <Icon name="book-outline" size={30} color={theme.icon.color}/>;
      case 'Shopping':
        return <Icon name="shopping-outline" size={30} color={theme.icon.color}/>;
      case 'Public Library':
        return <Icon name="book-open-page-variant-outline" size={30} color={theme.icon.color}/>;
      case 'Profile':
        return getUserProfilePicture(user.user?.picture);
      default:
        return null;
    }
  };

  return <View style={theme.container}>{getIcon()}</View>;
};

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  icon: {
    color: theme.surfaceText
  }
});

export default NavBarIcon;
