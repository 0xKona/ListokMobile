import { ThemeType } from '@app/constants/themes';
import { logout } from '@redux/slices/userSlice';
import { AppDispatch, RootState } from '@redux/store';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const LogoutButton = () => {
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <TouchableOpacity
      style={styles(currentTheme).logoutButton}
      onPress={handleLogout}>
      <Text style={styles(currentTheme).text}>Logout</Text>
    </TouchableOpacity>
  );
};

console.log('test push');
const styles = (props: ThemeType) =>
  StyleSheet.create({
    logoutButton: {
      height: 50,
      width: '100%',
      marginTop: 'auto',
      backgroundColor: props.buttonPrimaryBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: props.buttonPrimaryText,
    },
  });

export default LogoutButton;
