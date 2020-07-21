import * as Linking from 'expo-linking';

export const AuthLinking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: 'home',
          SignUp: 'signup',
          Products: 'products',
          Help: 'help',
          FindPassword: 'find-password',
          ConfirmEmail: 'confirm-email',
          VerifyEmail: 'verify-email',
        },
      },
      NotFound: '*',
    },
  },
};

export const AdminLinking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Intro: 'intro',
          UIBox: 'table',
          User: 'user',
          Workspace: 'workspace',
          // WorkspaceAdd: 'workspace_add',
          // Profile: 'profile',
        },
      },
      NotFound: '*',
    },
  },
};
