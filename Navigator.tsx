import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { onBoarding } from './navigation';

const AuthenticationStack = createStackNavigator();

export const Authentication = () => (
  <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthenticationStack.Screen name={onBoarding.name} component={onBoarding.component} />
  </AuthenticationStack.Navigator>
);
