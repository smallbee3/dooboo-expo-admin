import React, { FC } from 'react';
import {
  RootStackNavigationProps,
  RootStackParamList,
} from './RootStackNavigator';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AuthLayout from './AuthLayout';
import { CompositeNavigationProp } from '@react-navigation/native';
import ConfirmEmail from '../screen/ConfirmEmail';
import { DRAWER_TITLE_HEIGHT } from '../../utils/const';
import FindPassword from '../screen/FindPassword';
import Help from '../screen/Help';
import Intro from '../screen/Intro';
import Products from '../screen/Products';
import { RouteProp } from '@react-navigation/core';
import SignUp from '../screen/SignUp';
import VerifyEmail from '../screen/VerifyEmail';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const NavigatorWrapper = styled.View`
  position: absolute;
  top: 0;
  padding-top: ${DRAWER_TITLE_HEIGHT};
  width: 100%;
  height: 100%;
`;

export type AuthStackParamList = {
  Intro: undefined;
  SignUp: undefined;
  Products: undefined;
  Help: undefined;
  VerifyEmail: { email: string };
  ConfirmEmail: undefined;
  FindPassword: undefined;
};

type NavigationProps<
  T extends keyof AuthStackParamList = 'Intro'
> = StackNavigationProp<AuthStackParamList, T>;

export type AuthStackNavigationProps<
  T extends keyof AuthStackParamList = 'Intro'
> = CompositeNavigationProp<
  NavigationProps<T>,
  RootStackNavigationProps<'Root'>
>;

export interface Props {
  navigation: RootStackNavigationProps<'Root'>;
  route: RouteProp<RootStackParamList, 'Root'>;
}

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: FC<Props> = () => {
  return (
    <AuthLayout>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Intro" component={Intro} options={{ title: getString('APP_TITLE') }} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
        <AuthStack.Screen name="Products" component={Products} />
        <AuthStack.Screen name="Help" component={Help} />
        <AuthStack.Screen name="VerifyEmail" component={VerifyEmail} />
        <AuthStack.Screen name="ConfirmEmail" component={ConfirmEmail} />
        <AuthStack.Screen name="FindPassword" component={FindPassword} />
      </AuthStack.Navigator>
    </AuthLayout>
  );
};

export default AuthNavigator;
