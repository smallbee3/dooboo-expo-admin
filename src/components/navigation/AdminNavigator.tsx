import React, { ReactElement } from 'react';

import Intro from '../screen/Main/Intro';
import MainHeader from './MainHeader';
// import UserNotification from '../screen/Main/UserNotification';
// import UserProfile from '../screen/Main/UserProfile';
import UIBox from '../screen/Main/UIBox';
import User from '../screen/Main/User';
import Workspace from '../screen/Main/Workspace';
// import WorkspaceForm from '../screen/Main/WorkspaceForm';
import { createStackNavigator } from '@react-navigation/stack';

export type MainStackParamList = {
  Intro: undefined;
  UIBox: undefined;
  User: undefined;
  Workspace: undefined;
  // WorkspaceForm: undefined;
  // UserProfile: undefined;
  // UserNotification: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

export default function AdminNavigator(): ReactElement {
  const user = true;

  return (
    <MainHeader>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Intro" component={Intro} />
        <MainStack.Screen name="UIBox" component={UIBox} />
        <MainStack.Screen name="User" component={User} />
        <MainStack.Screen name="Workspace" component={Workspace} />
        {/* <MainStack.Screen name="UserProfile" component={UserProfile} /> */}
        {/* <MainStack.Screen name="UserNotification" component={UserNotification} /> */}
      </MainStack.Navigator>
    </MainHeader>
  );
}
