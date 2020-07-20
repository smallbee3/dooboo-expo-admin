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
  default: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'default'
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const {
    state: { user },
  } = useAppContext();

  return (
    <NavigationContainer linking={user?.verified ? MainLinking : AuthLinking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Root"
          component={user ? MainNavigator : AuthNavigator}
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
