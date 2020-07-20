import React, { ReactElement } from 'react';

import Workspace from '../screen/Workspace';
import { createStackNavigator } from '@react-navigation/stack';

export type WorkspaceStackParamList = {
  Root: undefined;
};

const WorkspaceStack = createStackNavigator<WorkspaceStackParamList>();

function WorkspaceNavigator(): ReactElement {
  return (
    <WorkspaceStack.Navigator screenOptions={{ headerShown: false }}>
      <WorkspaceStack.Screen name="Root" component={Workspace} />
    </WorkspaceStack.Navigator>
  );
}

export default WorkspaceNavigator;
