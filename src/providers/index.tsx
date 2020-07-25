import React, { ReactElement } from 'react';
import { ThemeProvider, ThemeType } from '@dooboo-ui/theme';
import { dark, light } from '../theme';

import { AppProvider } from './AppProvider';
import ErrorBoundary from './ErrorBoundary';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import SuspenseScreen from '../components/screen/Suspense';
import environment from '../relay';
import { useColorScheme } from 'react-native-appearance';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

function RelayEnvironmentWrapper({ children }): ReactElement {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <ErrorBoundary fallback={<SuspenseScreen error />}>
        {children}
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}

const RootProvider = ({
  initialThemeType = ThemeType.LIGHT,
  children,
}: Props): React.ReactElement => {
  const colorScheme = useColorScheme();
  return (
    <RelayEnvironmentWrapper>
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
    </RelayEnvironmentWrapper>
  );
};

export default RootProvider;
