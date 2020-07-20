import { ThemeProvider, ThemeType } from '@dooboo-ui/theme';
import { dark, light } from '../theme';

import { AppProvider } from './AppProvider';
import React from 'react';
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
  );
};

export default RootProvider;
