import React, { ReactElement } from 'react';

import Intro from '../screen/Intro';
import Profile from '../screen/Profile';
import UserMenubar from './UserMenubar';
import WorkspaceAdd from '../screen/WorkspaceAdd';
import WorkspaceNavigator from './WorkspaceNavigator';
import { createStackNavigator } from '@react-navigation/stack';

export type MainStackParamList = {
  Intro: undefined;
  WorkspaceAdd: undefined;
  Profile: undefined;
  Workspace: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

function MainNavigator(): ReactElement {
  const user = true;
  return (
    <React.Fragment>
      <UserMenubar />
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {
          !user
            ? (
              <React.Fragment>
                <MainStack.Screen name="Intro" component={Intro} />
                <MainStack.Screen name="WorkspaceAdd" component={WorkspaceAdd} />
              </React.Fragment>
            )
            : (
              <React.Fragment>
                <MainStack.Screen name="Workspace" component={WorkspaceNavigator} />
                <MainStack.Screen name="WorkspaceAdd" component={WorkspaceAdd} />
                <MainStack.Screen name="Profile" component={Profile} />
              </React.Fragment>
            )
        }
      </MainStack.Navigator>
    </React.Fragment>
  );
}
export default MainNavigator;
