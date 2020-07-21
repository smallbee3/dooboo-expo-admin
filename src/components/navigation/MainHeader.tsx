import { Animated, TouchableOpacity } from 'react-native';
import React, { Fragment, ReactElement, useRef, useState } from 'react';
import {
  SvgAvatar,
  SvgBarChart,
  SvgLogo,
  SvgNotification,
  SvgPackage,
  SvgPhone,
  SvgStar,
  SvgTruck,
  SvgUsers,
} from '../../utils/icons';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';

import { DRAWER_TITLE_HEIGHT } from '../../utils/const';
import Dropdown from '../shared/Dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

interface Props {
  children: ReactElement
}

type Menu = {
  label: string;
  icon?: ReactElement;
  target?: string;
}

type Menus = {
  label: string;
  icon?: ReactElement;
  target?: string;
  subMenus?: Menu[];
};

const Container = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.View`
  width: 100%;
  height: ${DRAWER_TITLE_HEIGHT}px;
  flex-direction: row;
  background-color: ${({ theme }): string => theme.mainHeader};
  border-bottom-color: ${({ theme }): string => theme.drawerItemBorder};
  border-bottom-width: 1px;
`;

const HeaderLeft = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderRight = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const LogoContainer = styled.View`
  width: 250px;
  padding-left: 40px;
`;

const DropdownContainer = styled.View`
  margin-left: 20px;
`;

const UserIcon = styled.View`
  margin-right: 20px;
`;

const CustomDrawer = styled.View`
  width: 250px;
  height: 100%;
  background-color: ${({ theme }): string => theme.mainDrawer};
`;

const CustomDrawerItem = styled.View<{ selected: boolean }>`
  border: 1px solid ${({ selected }): string => selected ? '#E6F2FF' : '#fff'};
  border-left-width: 4px;
  border-left-color: ${({ selected }): string => selected ? '#6DA6FC' : '#fff'};
`;
const CustomDrawerMainItem = styled.TouchableOpacity`
  height: 56px;
  padding-left: 40px;
  flex-direction: row;
  align-items: center;
`;

const CustomDrawerMainItemIcon = styled.View<{ selected: boolean }>`
  margin-right: 8px;
  color: ${({ selected, theme }): string => selected ? '#6DA6FC' : theme.drawerItemLabel};
`;

const CustomDrawerMainItemLabel = styled.Text<{ selected: boolean }>`
  font-weight: bold;
  color: ${({ selected, theme }): string => selected ? '#6DA6FC' : theme.drawerItemLabel};
  align-items: center;
`;

const CustomDrawerSubItems = styled.View`

`;

const CustomDrawerSubItem = styled.TouchableOpacity`
  height: 40px;
  padding-left: 68px;
  flex-direction: row;
  align-items: center;
`;

const CustomDrawerSubItemIcon = styled.View`

`;

const CustomDrawerSubItemLabel = styled.Text`

`;

const ScreenContainer = styled.View`
  flex: auto;
  flex-direction: row;
  background-color: green;
`;

const Screen = styled.View`
  flex: auto;
`;

export default function MainHeader({ children }: Props): React.ReactElement {
  const { theme, changeThemeType } = useThemeContext();
  const navigation = useNavigation();
  const route = useRoute();
  const currentTarget = getFocusedRouteNameFromRoute(route);
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

  const linkTo = (target): void => {
    setToggle(!toggle);
    fadeOut();
    navigation.navigate(target);
  };

  const renderMenu = ({ label, icon, target, subMenus = [] }: Menus): ReactElement => {
    const selected = currentTarget === target || !!subMenus.find((m) => m.target === currentTarget);

    return <CustomDrawerItem selected={selected}>
      <CustomDrawerMainItem onPress={(): void => target ? linkTo(target) : undefined}>
        <CustomDrawerMainItemIcon selected={selected}>{icon}</CustomDrawerMainItemIcon>
        <CustomDrawerMainItemLabel selected={selected}>{label}</CustomDrawerMainItemLabel>
      </CustomDrawerMainItem>

      <CustomDrawerSubItems>
        {
          subMenus.map((subMenu, index) => {
            return (
              <CustomDrawerSubItem key={index} onPress={(): void => target ? linkTo(target) : undefined}>
                {subMenu.icon && <CustomDrawerSubItemIcon>{subMenu.icon}</CustomDrawerSubItemIcon>}
                {subMenu.label && <CustomDrawerSubItemLabel>{subMenu.label}</CustomDrawerSubItemLabel>}
              </CustomDrawerSubItem>
            );
          })
        }
      </CustomDrawerSubItems>
    </CustomDrawerItem>;
  };

  const renderMenus = (): ReactElement => {
    return <Fragment>
      {
        renderMenu({
          label: 'UIBox',
          icon: <SvgStar />,
          target: 'UIBox',
        })
      }
      {
        renderMenu({
          label: 'Intro',
          icon: <SvgPackage />,
          target: 'Intro',
        })
      }
      {
        renderMenu({
          label: 'Users',
          icon: <SvgUsers />,
          target: 'User',
        })
      }
      {
        renderMenu({
          label: 'Workspace',
          icon: <SvgPhone />,
          target: 'Workspace',
        })
      }
      {
        renderMenu({
          label: getString('ORDER_DELIVERY'),
          icon: <SvgTruck />,
          subMenus: [
            {
              label: '판매처',
              target: '/',
            },
            {
              label: '공급처',
              target: 'UserProfile',
            },
            {
              label: '택배사',
              target: '/',
            },
          ],
        })
      }
    </Fragment>;
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderLeft>
          <LogoContainer>
            <TouchableOpacity onPress={changeThemeType}>
              <SvgLogo fill={theme.primary} />
            </TouchableOpacity>
          </LogoContainer>

          <DropdownContainer>
            <Dropdown />
          </DropdownContainer>
        </HeaderLeft>

        <HeaderRight>
          <UserIcon>
            <SvgNotification />
          </UserIcon>
          <UserIcon>
            <SvgAvatar />
          </UserIcon>
        </HeaderRight>
      </HeaderContainer>

      <ScreenContainer>
        <CustomDrawer>
          {renderMenus()}
        </CustomDrawer>

        <Screen>
          {children}
        </Screen>
      </ScreenContainer>
    </Container>
  );
}
