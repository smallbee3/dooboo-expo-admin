import { IC_HAMBURGER_MENU, SvgLogo } from '../../utils/icons';
import React, { Fragment, ReactElement, useRef, useState } from 'react';

import { Animated } from 'react-native';
import { DRAWER_TITLE_HEIGHT } from '../../utils/const';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useMediaQuery } from '../../utils/mediaQuery';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled(SafeAreaView)`
  z-index: 100;
`;

const TopHeader = styled.View`
  width: 100%;
  height: ${DRAWER_TITLE_HEIGHT}px;
  flex-direction: row;
  background-color: ${({ theme }): string => theme.headerBackground};
`;

const LogoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const Logo = styled.TouchableOpacity``;
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

const MenuItemLabel = styled.Text`
  color: white;
  font-weight: bold;
`;

const MenuIconContainer = styled.TouchableOpacity`
  justify-content: center;
`;

const MenuIcon = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 20px;
`;

const CustomDrawer = styled.View`
  width: 100%;
`;

const CustomDrawerItem = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
  border-bottom-color: ${({ theme }): string => theme.drawerItemBorder};
  border-bottom-width: 1px;
`;

const CustomDrawerItemLabel = styled.Text`
  color: ${({ theme }): string => theme.drawerItemLabel};
  font-weight: bold;
`;

export default function TopMenubar(): React.ReactElement {
  const { theme, changeThemeType } = useThemeContext();
  const navigation = useNavigation();
  const { isDesktop } = useMediaQuery();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [toggle, setToggle] = useState(false);

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

  const goLink = (link): void => {
    setToggle(!toggle);
    fadeOut();
    navigation.navigate(link);
  };

  const renderMenu = (target: string, text: string): ReactElement => {
    if (isDesktop) {
      return <MenuItem onPress={(): void => goLink(target)}>
        <MenuItemLabel>{text}</MenuItemLabel>
      </MenuItem>;
    }

    return <CustomDrawerItem onPress={(): void => goLink(target)}>
      <CustomDrawerItemLabel>{text}</CustomDrawerItemLabel>
    </CustomDrawerItem>;
  };

  const renderMenus = (): ReactElement => {
    return <Fragment>
      { renderMenu('Home', getString('HOME')) }
      { renderMenu('SignUp', getString('SIGN_UP')) }
      { renderMenu('Products', getString('PRODUCTS')) }
      { renderMenu('Help', getString('HELP')) }
    </Fragment>;
  };

  return (
    <Container>
      <TopHeader>
        <LogoContainer>
          <Logo onPress={changeThemeType}>
            <SvgLogo fill={theme.primary} style={{ marginLeft: 40 }} />
          </Logo>
        </LogoContainer>

        {
          isDesktop ? (
            <MenuContainer>
              {renderMenus()}
            </MenuContainer>
          ) : (
            <MenuIconContainer onPress={toggle ? fadeOut : fadeIn}>
              <MenuIcon source={IC_HAMBURGER_MENU} />
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
                  backgroundColor: theme.drawerBackground,
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
    </Container>
  );
}
