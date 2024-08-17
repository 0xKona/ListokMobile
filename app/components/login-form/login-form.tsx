import { ThemeType } from "@app/constants/themes";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import { loginWithGoogle } from "@redux/slices/userSlice";
import { AppDispatch, RootState } from "@redux/store";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "../hooks/useTheme";
import LoadingSpinner from "../ui/loading-spinner";

// TODO : Implement ListokLogin for users that don't want to use Google.

const LoginForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const config = useSelector((state: RootState) => state.config);
    const user = useSelector((state: RootState) => state.user);
    const theme = useTheme(styles)

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
        <View style={theme.buttonContainer}>
            {user.loading ?
              <LoadingSpinner text="Logging in..."/>
            : 
              <View>
                <GoogleSigninButton onPress={handleLoginWithGoogle} color="dark"/>
              </View>
        
            }
        </View>
    )
}

const styles = (theme: ThemeType) => StyleSheet.create({
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
})

export default LoginForm