import { Animated, Text } from 'react-native';
import React, { ReactElement, useRef, useState } from 'react';
import {
  SvgAvatar,
  SvgBarChart,
  SvgBottomArrow,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

interface Props {
  isEmptyWorkspace: boolean,
  children: ReactElement
}

type Menu = {
  label: string;
  icon?: ReactElement;
  target?: string;
}

type Menus = {
  label: string;
  activeIcon?: ReactElement;
  inactiveIcon?: ReactElement;
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
  background-color: ${({ theme }): string => theme.whiteDark2};
  border-bottom-color: ${({ theme }): string => theme.border};
  border-bottom-width: 1px;
`;

const LogoContainer = styled.View`
  width: 250px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const DropdownContainer = styled.View`
  margin-left: 20px;
  justify-content: center;
  align-items: center;
`;

const UserContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 40px;
  height: 100%;
`;

const CustomDrawer = styled.View`
  width: 250px;
  height: 100%;
  background-color: ${({ theme }): string => theme.whiteDark1};
`;

const CustomDrawerItem = styled.View`

`;
const CustomDrawerMainItem = styled.TouchableOpacity<{ selected: boolean }>`
  height: 56px;
  padding-left: 40px;
  flex-direction: row;
  align-items: center;
  border-top-color:  ${({ theme }): string => theme.lightBlueBackground};
  border-top-width: ${({ selected }): string | number => selected ? '1px' : 0};
  border-bottom-color:  ${({ theme }): string => theme.lightBlueBackground};
  border-bottom-width: ${({ selected }): string | number => selected ? '1px' : 0};
  border-left-color: ${({ theme }): string => theme.btnPrimary};
  border-left-width: ${({ selected }): string | number => selected ? '4px' : 0};
`;

const CustomDrawerMainItemIcon = styled.View`
  margin-right: 8px;
`;

const CustomDrawerMainItemLabel = styled.Text<{ selected: boolean }>`
  font-weight: bold;
  color: ${({ selected, theme }): string => selected ? theme.btnPrimary : theme.text};
  align-items: center;
`;

const CustomDrawerSubItems = styled.View`

`;

const CustomDrawerSubItem = styled.TouchableOpacity<{ selected: boolean }>`
  height: 40px;
  padding-left: 68px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, selected }): string => selected ? theme.lightBlueBackground : theme.whiteDark1};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }): string => theme.line};
`;

const CustomDrawerSubItemIcon = styled.View<{ selected: boolean }>`
  color: ${({ theme, selected }): string => selected ? theme.primary7 : theme.gray};
`;

const CustomDrawerSubItemLabel = styled.Text<{ selected: boolean }>`
  color: ${({ theme, selected }): string => selected ? theme.primary7 : theme.gray};
`;

const ScreenContainer = styled.View`
  flex: auto;
  flex-direction: row;
  background-color: green;
`;

const Screen = styled.View`
  flex: auto;
`;

export default function MainLayout({ isEmptyWorkspace, children }: Props): React.ReactElement {
  const { theme, changeThemeType } = useThemeContext();
  const navigation = useNavigation();
  const route = useRoute();
  const currentTarget = getFocusedRouteNameFromRoute(route);

  const linkTo = (target): void => {
    navigation.navigate(target);
  };

  const renderMenu = ({ label, activeIcon, inactiveIcon, target, subMenus = [] }: Menus): ReactElement => {
    const selected = currentTarget === target || !!subMenus.find((m) => m.target === currentTarget);
    const isSubmenus = subMenus.length > 0;
    const opacityValue = useRef(new Animated.Value(selected && isSubmenus ? 1 : 0)).current;
    const spinValue = useRef(new Animated.Value(selected && isSubmenus ? 1 : 0)).current;
    const [toggle, setToggle] = useState(selected && isSubmenus);

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '0deg'],
    });

    const rotate = (): void => {
      Animated.timing(spinValue, {
        toValue: toggle ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };

    const accordion = (): void => {
      Animated.timing(opacityValue, {
        toValue: toggle ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      rotate();
      setToggle(!toggle);
    };

    const pressMainItem = (): void => {
      if (isSubmenus) {
        accordion();
      }
    };

    return <CustomDrawerItem>
      <CustomDrawerMainItem
        selected={selected}
        onPress={(): void => target ? linkTo(target) : pressMainItem()}
      >
        <CustomDrawerMainItemIcon>{selected ? activeIcon : inactiveIcon}</CustomDrawerMainItemIcon>
        <CustomDrawerMainItemLabel selected={selected}>{label}</CustomDrawerMainItemLabel>
        {
          isSubmenus && (
            <Animated.View
              style={{
                position: 'absolute',
                right: 20,
                transform: [{ rotate: spin }],
              }}
            >
              <SvgBottomArrow />
            </Animated.View>
          )
        }
      </CustomDrawerMainItem>

      <CustomDrawerSubItems>
        <Animated.View
          style={[
            {
              opacity: opacityValue,
              height: toggle ? 'auto' : 0,
              width: toggle ? 'auto' : 0,
              overflow: 'hidden',
            },
          ]}
        >
          {
            subMenus.map((subMenu, index) => {
              const selectedSubMenu = currentTarget === subMenu.target;

              return (
                <CustomDrawerSubItem
                  key={index}
                  selected={selectedSubMenu}
                  onPress={(): void => subMenu.target ? linkTo(subMenu.target) : undefined}
                >
                  {
                    subMenu.icon && <CustomDrawerSubItemIcon selected={selectedSubMenu}>
                      {subMenu.icon}
                    </CustomDrawerSubItemIcon>
                  }
                  {
                    subMenu.label && <CustomDrawerSubItemLabel selected={selectedSubMenu}>
                      {subMenu.label}
                    </CustomDrawerSubItemLabel>
                  }
                </CustomDrawerSubItem>
              );
            })
          }
        </Animated.View>
      </CustomDrawerSubItems>
    </CustomDrawerItem>;
  };

  const renderMenus = (): ReactElement => {
    return <CustomDrawer>
      {
        renderMenu({
          label: getString('WORKSPACE_SETTINGS'),
          activeIcon: <SvgStar stroke={theme.primary} />,
          inactiveIcon: <SvgStar stroke={theme.text} />,
          target: 'WorkspaceSettings',
        })
      }
      {
        renderMenu({
          label: getString('CLIENT'),
          activeIcon: <SvgUsers stroke={theme.primary} />,
          inactiveIcon: <SvgUsers stroke={theme.text} />,
          subMenus: [
            {
              label: getString('STORE'),
              target: 'WorkspaceStore',
            },
            {
              label: getString('SUPPLIER'),
              target: 'WorkspaceSupply',
            },
            {
              label: getString('DELIVERY'),
              target: 'WorkspaceDelivery',
            },
          ],
        })
      }
      {
        renderMenu({
          label: getString('PRODUCT'),
          activeIcon: <SvgPackage stroke={theme.primary} />,
          inactiveIcon: <SvgPackage stroke={theme.text} />,
          target: 'WorkspaceProduct',
        })
      }
      {
        renderMenu({
          label: getString('ORDER_DELIVERY'),
          activeIcon: <SvgTruck stroke={theme.primary} />,
          inactiveIcon: <SvgTruck stroke={theme.text} />,
          target: 'WorkspaceOrderDelivery',
        })
      }
      {
        renderMenu({
          label: getString('CS'),
          activeIcon: <SvgPhone stroke={theme.primary} />,
          inactiveIcon: <SvgPhone stroke={theme.text} />,
          target: 'WorkspaceCs',
        })
      }
      {
        renderMenu({
          label: getString('STATISTICS'),
          activeIcon: <SvgBarChart stroke={theme.primary} />,
          inactiveIcon: <SvgBarChart stroke={theme.text} />,
          target: 'WorkspaceStatistics',
        })
      }
    </CustomDrawer>;
  };

  const renderHeader = (): ReactElement => {
    return <HeaderContainer>
      <LogoContainer>
        <TouchableOpacity onPress={changeThemeType}>
          <SvgLogo fill={theme.primary} />
        </TouchableOpacity>
      </LogoContainer>

      <DropdownContainer>
        <Text>Dropdown</Text>
      </DropdownContainer>

      <UserContainer>
        <TouchableOpacity onPress={(): void => linkTo('UserNotification')}>
          <SvgNotification stroke={theme.notification} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={(): void => linkTo('UserProfile')}>
          <SvgAvatar fill={theme.avator} />
        </TouchableOpacity>
      </UserContainer>
    </HeaderContainer>;
  };

  return (
    <Container>
      {renderHeader()}
      <ScreenContainer>
        {!isEmptyWorkspace && renderMenus()}
        <Screen>
          {children}
        </Screen>
      </ScreenContainer>
    </Container>
  );
}
