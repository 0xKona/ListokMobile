import { ThemeType } from "@app/constants/themes";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { loginWithGoogle } from "@redux/slices/userSlice";
import { AppDispatch, RootState } from "@redux/store";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "../hooks/useTheme";
import LoadingSpinner from "../ui/loading-spinner";
import Icon from "react-native-vector-icons/AntDesign";

// TODO : Implement ListokLogin for users that don't want to use Google.

const LoginForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const config = useSelector((state: RootState) => state.config);
    const user = useSelector((state: RootState) => state.user);
    const theme = useTheme(styles)

    const [error, setError] = useState('');

    // Initialize Google sign in with client id's
    useEffect(() => {
        if (config.iosClientId || config.androidClientId) {
          GoogleSignin.configure({
            webClientId: config.webClientId,
            iosClientId: config.iosClientId,
            scopes: ['profile', 'email'],
          });
        }
      }, [config.iosClientId, config.androidClientId, config.webClientId]);

    const handleLoginWithGoogle = async () => {
        setError('')
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
            setError('Cancelled login.')
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Sign in is in progress already');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play services not available or outdated');
            setError('Google play not available.')
          } else {
            console.error('Login failed', error);
            setError('Error logging in. Please try again later')
          }
        }
      };

    return (
        <View style={theme.container}>
            {user.loading ?
              <LoadingSpinner text="Logging in..."/>
            : 
            <>
              <TouchableOpacity onPress={handleLoginWithGoogle} style={theme.login}>
                <Text style={theme.subText}>Login with Google!</Text>
                <Icon name="google" size={50}/>
              </TouchableOpacity>
              {error && <Text style={theme.errorText}>{error}</Text>}
              {user.error && <Text style={theme.errorText}>{user.error}</Text>}
            </>
        
            }
        </View>
    )
}

const styles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    login: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    subText: {
      marginBottom: 10
    },
    errorText: {
      marginTop: 10,
      color: 'red',
      textAlign: 'center'
    }
})

export default LoginForm