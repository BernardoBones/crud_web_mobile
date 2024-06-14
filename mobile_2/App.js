// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import ReadScreen from './screens/ReadScreen';
import UpdateScreen from './screens/UpdateScreen';
import DeleteScreen from './screens/DeleteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen name="Read" component={ReadScreen} />
        <Stack.Screen name="Update" component={UpdateScreen} />
        <Stack.Screen name="Delete" component={DeleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
