import { Animated, Image } from 'react-native';
import { IC_AVATAR, IC_BELL, SvgLogo } from '../../utils/icons';
import React, { ReactElement, useRef, useState } from 'react';

import { DRAWER_TITLE_HEIGHT } from '../../utils/const';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled(SafeAreaView)`
  z-index: 100;
`;

const TopHeader = styled.View`
  width: 100%;
  height: ${DRAWER_TITLE_HEIGHT}px;
`;

const HeaderWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${({ theme }): string => theme.background};
  box-shadow: 0px 2px 10px ${({ theme }): string => theme.boxShadow};
`;
const LogoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const Logo = styled.TouchableOpacity`
  align-items: center;
`;

const MenuContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: 40px;
`;
const MenuItem = styled.TouchableOpacity``;
export default function UserMenubar(): React.ReactElement {
  const { theme, changeThemeType } = useThemeContext();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [toggle, setToggle] = useState(false);

  const fadeOut = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setToggle(!toggle);
  };

  const linkTo = (link: string): void => {
    setToggle(!toggle);
    fadeOut();
    navigation.navigate(link);
  };

  const renderMenu = (children: ReactElement, target: string): ReactElement => {
    return <MenuItem onPress={(): void => linkTo(target)}>{children}</MenuItem>;
  };

  return (
    <Container>
      <TopHeader>
        <HeaderWrapper>
          <LogoContainer>
            <Logo onPress={changeThemeType}>
              {/* <Image
                style={{ width: 80, height: 22, marginLeft: 20 }}
                source={SvgLogo}
              /> */}
              <SvgLogo fill={theme.primary} style={{ marginLeft: 20 }} />
            </Logo>
          </LogoContainer>
          <MenuContainer>
            {renderMenu(
              <Image
                style={{ width: 24, height: 24, marginLeft: 20 }}
                source={IC_BELL}
              />,
              'Notification',
            )}
            {renderMenu(
              <Image
                style={{ width: 36, height: 36, marginLeft: 20 }}
                source={IC_AVATAR}
              />,
              'Profile',
            )}
          </MenuContainer>
        </HeaderWrapper>
      </TopHeader>
    </Container>
  );
}
