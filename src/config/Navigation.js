import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import SignUpForm from '../screens/SignUpForm';
import DonorForm from '../screens/DonorForm';
import DonorList from '../screens/DonorList';
import { Provider } from 'react-redux';
import store from '../store'


const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUpForm" component={SignUpForm} />
      <Stack.Screen name="DonorList" component={DonorList} />
      <Stack.Screen name="DonorForm" component={DonorForm} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default AppNavigation;