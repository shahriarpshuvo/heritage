import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnBoarding } from '@app/navigation';

const AuthenticationStack = createStackNavigator();
export const Authentication = () => (
  <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthenticationStack.Screen name={OnBoarding.name} component={OnBoarding.component} />
  </AuthenticationStack.Navigator>
);

const HomeStack = createStackNavigator();
export const Home = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="home" component={() => <h1>Home</h1>} />
  </HomeStack.Navigator>
);
