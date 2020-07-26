import { ThemeProvider, ThemeType } from '@dooboo-ui/theme';
import { dark, light } from '../theme';

import { AppProvider } from './AppProvider';
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import environment from '../relay';
import { useColorScheme } from 'react-native-appearance';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

// Add providers here
const RootProvider = ({
  initialThemeType = ThemeType.LIGHT,
  children,
}: Props): React.ReactElement => {
  const colorScheme = useColorScheme();
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ThemeProvider
        customTheme={{
          light,
          dark,
        }}
        initialThemeType={
          colorScheme === 'dark'
            ? ThemeType.DARK
            : colorScheme === 'light'
              ? ThemeType.LIGHT
              : initialThemeType
        }
      >
        <AppProvider>{children}</AppProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
};

export default RootProvider;
