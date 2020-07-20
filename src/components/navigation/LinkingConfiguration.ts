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

export const MainLinking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Intro: 'intro',
          WorkspaceAdd: 'workspace_add',
          Profile: 'profile',
          Workspace: {
            screens: {
              Root: 'workspace',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
