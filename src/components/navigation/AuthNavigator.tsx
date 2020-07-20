import React, { FC } from 'react';
import {
  RootStackNavigationProps,
  RootStackParamList,
} from './RootStackNavigator';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import { CompositeNavigationProp } from '@react-navigation/native';
import ConfirmEmail from '../screen/ConfirmEmail';
import { DRAWER_TITLE_HEIGHT } from '../../utils/const';
import FindPassword from '../screen/FindPassword';
import Help from '../screen/Help';
import Home from '../screen/Home';
import Products from '../screen/Products';
import { RouteProp } from '@react-navigation/core';
import SignUp from '../screen/SignUp';
import TopMenubar from './TopMenubar';
import VerifyEmail from '../screen/VerifyEmail';
import styled from 'styled-components/native';

const NavigatorWrapper = styled.View`
  position: absolute;
  top: 0;
  padding-top: ${DRAWER_TITLE_HEIGHT};
  width: 100%;
  height: 100%;
`;

export type AuthStackParamList = {
  default: undefined;
  Home: undefined;
  SignUp: undefined;
  Products: undefined;
  Help: undefined;
  VerifyEmail: { email: string };
  ConfirmEmail: undefined;
  FindPassword: undefined;
};

type NavigationProps<
  T extends keyof AuthStackParamList = 'default'
> = StackNavigationProp<AuthStackParamList, T>;

export type AuthStackNavigationProps<
  T extends keyof AuthStackParamList = 'default'
> = CompositeNavigationProp<
  NavigationProps<T>,
  RootStackNavigationProps<'Root'>
>;

interface Props {
  navigation: RootStackNavigationProps<'Root'>;
  route: RouteProp<RootStackParamList, 'Root'>;
}

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: FC<Props> = () => {
  return (
    <React.Fragment>
      <TopMenubar />
      <NavigatorWrapper>
        <AuthStack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <AuthStack.Screen name="Home" component={Home} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
          <AuthStack.Screen name="Products" component={Products} />
          <AuthStack.Screen name="Help" component={Help} />
          <AuthStack.Screen name="VerifyEmail" component={VerifyEmail} />
          <AuthStack.Screen name="ConfirmEmail" component={ConfirmEmail} />
          <AuthStack.Screen name="FindPassword" component={FindPassword} />
        </AuthStack.Navigator>
      </NavigatorWrapper>
    </React.Fragment>
  );
};

export default AuthNavigator;
