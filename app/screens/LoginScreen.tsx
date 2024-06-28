import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { loginWithGoogle } from '@redux/slices/userSlice';
import { RootState, AppDispatch } from '@redux/store';

const LoginScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector((state: RootState) => state.config);
  console.log('config State:', config);
  useEffect(() => {
    if (config.iosClientId || config.androidClientId) {
      GoogleSignin.configure({
        webClientId: config.webClientId,
        iosClientId: config.iosClientId,
        scopes: ['profile', 'email'],
      });
    }
  }, [config.iosClientId, config.androidClientId, config.webClientId]);

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = userInfo.idToken;
      if (token) {
        await dispatch(loginWithGoogle(token));
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.error('Login failed', error);
      }
    }
  };

  return (
    <View style={style.container}>
      <>
        <Text style={style.welcome}>Welcome to</Text>
        <Text style={style.textTitle}>Listok!</Text>
      </>

      <View style={style.buttonContainer}>
        <GoogleSigninButton onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginHorizontal: 60,
    marginTop: '30%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  welcome: {
    fontSize: 25,
  },
  textTitle: {
    fontSize: 60,
  },
});
