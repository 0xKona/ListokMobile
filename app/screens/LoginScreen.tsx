import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { RootState } from '@redux/store';
import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';
import LoginForm from '@app/components/login-form/login-form';
import ConfigSetting from '@app/components/login-form/config-setting';

const LoginScreen = () => {
  const config = useSelector((state: RootState) => state.config);
  const theme = useTheme(styles);

  console.log('[Listok Login Screen]: Config State:', config);

  return (
    <LinearGradient
      colors={[
        'hsl(240, 100%, 89%)',
        'hsl(232, 97%, 87%)',
        'hsl(225, 93%, 84%)',
        'hsl(220, 90%, 81%)',
        'hsl(215, 87%, 79%)',
        'hsl(211, 83%, 75%)',
        'hsl(208, 80%, 72%)',
        'hsl(204, 77%, 69%)',
        'hsl(201, 74%, 65%)',
        'hsl(199, 71%, 62%)',
        'hsl(196, 68%, 58%)',
        'hsl(194, 66%, 54%)',
        'hsl(191, 66%, 49%)',
        'hsl(189, 79%, 44%)',
        'hsl(186, 100%, 38%)',
        'hsl(185, 100%, 36%)',
        'hsl(183, 100%, 34%)',
        'hsl(181, 100%, 32%)',
        'hsl(179, 100%, 31%)',
        'hsl(176, 100%, 31%)',
        'hsl(174, 100%, 30%)',
        'hsl(171, 100%, 29%)',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={theme.gradientContainer}
    >
      <View style={theme.titleContainer}>
        <Text style={theme.welcome}>Welcome to</Text>
        <Text style={theme.textTitle}>Listok!</Text>
      </View>

      {config.googleClientId ? (
        <LoginForm />
      ) : (
        <ConfigSetting />
      )}
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = (theme: ThemeType) => StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    marginTop: 60,
    marginHorizontal: 60,
    height: 300,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 25,
  },
  textTitle: {
    fontSize: 60,
  },
});
