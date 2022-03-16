import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from './SignInScreen';
import SplashScreen from './SplashScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name="SplashScreen"
      options={{
        headerShown: false,
      }}
      component={SplashScreen}
    />
    <RootStack.Screen
      name="SignInScreen"
      component={SignInScreen}
      options={{
        headerShown: false,
      }}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
