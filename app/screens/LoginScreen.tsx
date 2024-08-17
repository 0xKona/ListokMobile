import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@redux/store';
import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import ListokButton from '@app/components/ui/button';
import LoginForm from '@app/components/login-form/login-form';
import { fetchConfig } from '@redux/slices/configSlice';
import ConfigSetting from '@app/components/login-form/config-setting';
import LoadingSpinner from '@app/components/ui/loading-spinner';

const LoginScreen = () => {

  
  const config = useSelector((state: RootState) => state.config);
  const user = useSelector((state: RootState) => state.user);
  const theme = useTheme(styles)

  console.log('[Listok Login Screen]: Config State:', config);

  
  
  

  return (
    <View style={theme.container}>
      <View style={theme.titleContainer}>
        <Text style={theme.welcome}>Welcome to</Text>
        <Text style={theme.textTitle}>Listok!</Text>
      </View>

      {config.googleClientId ?
        <LoginForm />
      : 
        <ConfigSetting />
      }
    </View> 
  );
};

export default LoginScreen;

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginHorizontal: 60,
    marginVertical: 60,
    // backgroundColor: 'orange'
  },
  titleContainer: {
    height: 300,
    justifyContent: 'center',
    // backgroundColor: 'orange'
  },
  
  welcome: {
    fontSize: 25,
  },
  textTitle: {
    fontSize: 60,
  },
});
