/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from '../redux/store';
import { NavigationProvider } from '@app/NavigationContext';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@app/screens/LoginScreen';
import HomeScreen from '@app/screens/HomeScreen';
import { RootStackParamList } from '../typed/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

LogBox.ignoreLogs([
  '[Reanimated] Tried to modify key `velocity` of an object which has been already passed to a worklet.', 
  // Add any other warnings you want to ignore
]);


const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <NavigationProvider>
              <Stack.Navigator initialRouteName="Login" >
                <Stack.Screen 
                  name="Login" 
                  component={LoginScreen} 
                  options={{ headerShown: false}}
                />
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
