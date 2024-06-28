import { logout } from '@redux/slices/userSlice';
import { AppDispatch } from '@redux/store';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
      <View>
        <Text>Logout</Text>
      </View>
    </TouchableOpacity>
  );
};

console.log('test push');
const style = StyleSheet.create({
  logoutButton: {
    height: 50,
    width: '100%',
    marginTop: 'auto',
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LogoutButton;
