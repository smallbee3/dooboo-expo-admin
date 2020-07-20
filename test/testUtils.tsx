import 'react-native';

import React, { ReactElement } from 'react';
import { RelayMockEnvironment, createMockEnvironment } from 'relay-test-utils';
import { ThemeProvider, ThemeType } from '@dooboo-ui/theme';
import { dark, light } from '../src/theme';

import { AppProvider } from '../src/providers/AppProvider';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

export const environment: RelayMockEnvironment = createMockEnvironment();

export const createTestElement = (
  child: ReactElement,
  themeType: ThemeType = ThemeType.LIGHT,
): ReactElement => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider
        customTheme={{
          light,
          dark,
        }}
        initialThemeType={themeType}
      >
        <AppProvider>{child}</AppProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
};

export const createTestProps = (
  obj: Record<string, unknown> = {},
): Record<string, unknown> | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
    setOptions: jest.fn(),
  },
  ...obj,
});
