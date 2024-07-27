/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from '../redux/store';
import { NavigationProvider } from '@app/NavigationContext';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from '@app/screens/LoadingScreen';
import LoginScreen from '@app/screens/LoginScreen';
import HomeScreen from '@app/screens/HomeScreen';
import { RootStackParamList } from '../typed/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <NavigationProvider>
              <Stack.Navigator initialRouteName="Loading">
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Home"
                  component={HomeScreen}
                />
              </Stack.Navigator>
            </NavigationProvider>
          </NavigationContainer>
        </PersistGate>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
