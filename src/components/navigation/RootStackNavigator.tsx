import { AuthLinking, MainLinking } from './LinkingConfiguration';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import NotFoundScreen from '../screen/NotFound';
import React from 'react';
import { useAppContext } from '../../providers/AppProvider';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'Root'
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const {
    state: { user },
  } = useAppContext();

  const userVerified = !user?.verified;

  return (
    <NavigationContainer linking={userVerified ? MainLinking : AuthLinking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Root"
          component={userVerified ? MainNavigator : AuthNavigator}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: '404 screen!' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
