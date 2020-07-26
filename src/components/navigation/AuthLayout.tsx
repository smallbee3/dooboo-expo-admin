import React, { Fragment, ReactElement, useRef, useState } from 'react';
import { SvgHamburgerMenu, SvgLogo } from '../../utils/icons';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';

import { Animated } from 'react-native';
import { DRAWER_TITLE_HEIGHT } from '../../utils/const';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useMediaQuery } from '../../utils/mediaQuery';
import { useThemeContext } from '@dooboo-ui/theme';

interface Props {
  children: ReactElement
}

const Container = styled(SafeAreaView)`
  z-index: 100;
  width: 100%;
  height: 100%;
`;

const TopHeader = styled.View<{ isIntro: boolean; }>`
  width: 100%;
  height: ${DRAWER_TITLE_HEIGHT}px;
  flex-direction: row;
  background-color: ${({ theme, isIntro }): string => isIntro ? theme.whiteDark2 : theme.whiteDark2};
  border-bottom-color: ${({ theme }): string => theme.border};
  border-bottom-width: 1px;
`;

const LogoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const Logo = styled.TouchableOpacity`
  margin-left: 40px;
`;

const MenuContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const MenuItem = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
`;

const MenuItemLabel = styled.Text<{ isIntro: boolean; }>`
  color: ${({ theme, isIntro }): string => isIntro ? theme.grayText : theme.grayText};
  font-weight: bold;
`;

const MenuIconContainer = styled.TouchableOpacity`
  justify-content: center;
  margin-right: 40px;
`;

const CustomDrawer = styled.View`
  width: 100%;
`;

const CustomDrawerItem = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
  border-bottom-color: ${({ theme }): string => theme.line};
  border-bottom-width: 1px;
`;

const CustomDrawerItemLabel = styled.Text`
  color: ${({ theme }): string => theme.grayText};
  font-weight: bold;
`;

const Screen = styled.View`
  flex: auto;
`;

export default function AuthHeader({ children }: Props): React.ReactElement {
  const { theme, changeThemeType } = useThemeContext();
  const navigation = useNavigation();
  const { isDesktop } = useMediaQuery();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [toggle, setToggle] = useState(false);
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route);
  const isIntro = routeName === 'Intro' || routeName === undefined;

  const fadeIn = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setToggle(!toggle);
  };

  const fadeOut = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setToggle(!toggle);
  };

  const linkTo = (link): void => {
    setToggle(!toggle);
    fadeOut();
    navigation.navigate(link);
  };

  const renderMenu = (target: string, text: string): ReactElement => {
    if (isDesktop) {
      return <MenuItem onPress={(): void => linkTo(target)}>
        <MenuItemLabel isIntro={isIntro}>{text}</MenuItemLabel>
      </MenuItem>;
    }

    return <CustomDrawerItem onPress={(): void => linkTo(target)}>
      <CustomDrawerItemLabel>{text}</CustomDrawerItemLabel>
    </CustomDrawerItem>;
  };

  const renderMenus = (): ReactElement => {
    return <Fragment>
      { renderMenu('Intro', getString('HOME')) }
      { renderMenu('SignUp', getString('SIGN_UP')) }
      { renderMenu('Products', getString('PRODUCTS')) }
      { renderMenu('Help', getString('HELP')) }
    </Fragment>;
  };

  return (
    <Container>
      <TopHeader isIntro={isIntro}>
        <LogoContainer>
          <Logo onPress={changeThemeType}>
            <SvgLogo fill={theme.primary} />
          </Logo>
        </LogoContainer>

        {
          isDesktop ? (
            <MenuContainer>
              {renderMenus()}
            </MenuContainer>
          ) : (
            <MenuIconContainer onPress={toggle ? fadeOut : fadeIn}>
              <SvgHamburgerMenu fill={theme.primary} />
            </MenuIconContainer>
          )
        }
      </TopHeader>

      {
        !isDesktop && (
          <CustomDrawer>
            <Animated.View
              style={[
                {
                  backgroundColor: theme.whiteDark1,
                  opacity: fadeAnim,
                  height: toggle ? 'auto' : 0,
                  width: toggle ? 'auto' : 0,
                  overflow: 'hidden',
                },
              ]}
            >
              {renderMenus()}
            </Animated.View>
          </CustomDrawer>
        )
      }

      <Screen>
        {children}
      </Screen>
    </Container>
  );
}
