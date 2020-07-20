import '@expo/match-media';

import React from 'react';
import { useMediaQuery as _useMediaQuery } from 'react-responsive';

type Props = {
  children: React.ReactElement | null
};

export type MediaQueryType = {
  isDesktop: boolean,
  isTablet: boolean,
  isMobile: boolean,
}

const isDesktop = (): boolean => _useMediaQuery({ minWidth: 992 });
const isTablet = (): boolean => _useMediaQuery({ minWidth: 768, maxWidth: 991 });
const isMobile = (): boolean => _useMediaQuery({ maxWidth: 767 });

export const useMediaQuery = (): MediaQueryType => {
  return {
    isDesktop: isDesktop(),
    isTablet: isTablet(),
    isMobile: isMobile(),
  };
};

export const Desktop = ({ children }: Props): React.ReactElement | null => isDesktop() ? children : null;
export const Tablet = ({ children }: Props): React.ReactElement | null => isTablet() ? children : null;
export const Mobile = ({ children }: Props): React.ReactElement | null => isMobile() ? children : null;
