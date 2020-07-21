import { AuthLinking, AdminLinking } from './LinkingConfiguration';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AdminNavigator from './AdminNavigator';
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
  let {
    state: { user },
  } = useAppContext();
  user = true;

  return (
    <NavigationContainer linking={user ? AdminLinking : AuthLinking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Root"
          component={ !user ? AuthNavigator : AdminNavigator}
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
