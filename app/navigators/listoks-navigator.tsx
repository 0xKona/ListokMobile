import ListokManager from '@app/components/listok-manager';
import ListokEditor from '@app/components/listok-manager/listok-editor/listok-editor';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

const ListoksNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Your Listoks" component={ListokManager} />
      <Stack.Screen name="New Listok" component={ListokEditor} />
      <Stack.Screen name="Listok Editor" component={ListokEditor} />
    </Stack.Navigator>
  );
};

export default ListoksNavigator;
