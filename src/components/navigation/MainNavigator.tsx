import React, { ReactElement } from 'react';

import Intro from '../screen/Main/Intro';
import MainLayout from './MainLayout';
import UserNotification from '../screen/Main/UserNotification';
import UserProfile from '../screen/Main/UserProfile';
import Workspace from '../screen/Main/Workspace';
import WorkspaceCs from '../screen/Main/WorkspaceCs';
import WorkspaceDelivery from '../screen/Main/WorkspaceDelivery';
import WorkspaceForm from '../screen/Main/WorkspaceForm';
import WorkspaceOrderDelivery from '../screen/Main/WorkspaceOrderDelivery';
import WorkspaceProduct from '../screen/Main/WorkspaceProduct';
import WorkspaceSettings from '../screen/Main/WorkspaceSettings';
import WorkspaceStatistics from '../screen/Main/WorkspaceStatistics';
import WorkspaceStore from '../screen/Main/WorkspaceStore';
import WorkspaceSupply from '../screen/Main/WorkspaceSupply';
import { createStackNavigator } from '@react-navigation/stack';

export type MainStackParamList = {
  Intro: undefined;
  UserProfile: undefined;
  UserNotification: undefined;
  Workspace: undefined;
  WorkspaceForm: undefined;
  WorkspaceSettings: undefined;
  WorkspaceStore: undefined;
  WorkspaceSupply: undefined;
  WorkspaceDelivery: undefined;
  WorkspaceProduct: undefined;
  WorkspaceOrderDelivery: undefined;
  WorkspaceCs: undefined;
  WorkspaceStatistics: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

export default function MainNavigator(): ReactElement {
  const isEmptyWorkspace = false;

  return (
    <MainLayout isEmptyWorkspace={isEmptyWorkspace}>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {
          isEmptyWorkspace
            ? <React.Fragment>
              <MainStack.Screen name="Intro" component={Intro} />
            </React.Fragment>
            : <React.Fragment>
              <MainStack.Screen name="Workspace" component={Workspace} />
              <MainStack.Screen name="WorkspaceCs" component={WorkspaceCs} />
              <MainStack.Screen name="WorkspaceStore" component={WorkspaceStore} />
              <MainStack.Screen name="WorkspaceSupply" component={WorkspaceSupply} />
              <MainStack.Screen name="WorkspaceProduct" component={WorkspaceProduct} />
              <MainStack.Screen name="WorkspaceSettings" component={WorkspaceSettings} />
              <MainStack.Screen name="WorkspaceDelivery" component={WorkspaceDelivery} />
              <MainStack.Screen name="WorkspaceStatistics" component={WorkspaceStatistics} />
              <MainStack.Screen name="WorkspaceOrderDelivery" component={WorkspaceOrderDelivery} />
            </React.Fragment>
        }

        <MainStack.Screen name="WorkspaceForm" component={WorkspaceForm} />
        <MainStack.Screen name="UserProfile" component={UserProfile} />
        <MainStack.Screen name="UserNotification" component={UserNotification} />
      </MainStack.Navigator>
    </MainLayout>
  );
}
