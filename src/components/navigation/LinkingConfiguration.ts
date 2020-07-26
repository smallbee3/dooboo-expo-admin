import * as Linking from 'expo-linking';

export const AuthLinking = {
  prefixes: [Linking.makeUrl()],
  config: {
    screens: {
      Root: {
        screens: {
          Intro: '/',
          Help: '/help',
          SignUp: '/signup',
          Products: '/products',
          FindPassword: '/find-password',
        },
      },
      NotFound: '*',
    },
  },
};

export const MainLinking = {
  prefixes: [Linking.makeUrl()],
  config: {
    screens: {
      Root: {
        screens: {
          Intro: '/',
          Users: '/users',
          UserProfile: '/user/profile',
          UserNotification: '/user/notification',
          Workspace: '/workspaces',
          WorkspaceCs: '/workspaces/cs',
          WorkspaceForm: '/workspaces/create',
          WorkspaceStore: '/workspaces/store',
          WorkspaceSupply: '/workspaces/supply',
          WorkspaceProduct: '/workspaces/product',
          WorkspaceDelivery: '/workspaces/delivery',
          WorkspaceSettings: '/workspaces/settings',
          WorkspaceStatistics: '/workspaces/statistics',
          WorkspaceOrderDelivery: '/workspaces/order-delivery',
        },
      },
      NotFound: '*',
    },
  },
};
